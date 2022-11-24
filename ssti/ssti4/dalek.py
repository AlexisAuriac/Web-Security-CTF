from subprocess import Popen
import os
import time
import psutil
import requests

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

p = Popen(['python', 'app.py'])
current_process = psutil.Process()
backdoor = None

def look_subprocess(proc):
    print(bcolors.BOLD)
    print('{} : {} : {} '.format(proc.pid, proc.name(), proc.cmdline()))
    children = proc.children(recursive=False)
    for child in children:
            print('---> {} : {} : {}'.format(child.pid, child.name(), child.cmdline()))
            if child.cmdline() == []:
                if not test_http_service(backdoor):
                    child.kill()
                    p = Popen(['python', 'app.py'])

            childrenof = child.children(recursive=True)
            for childof in childrenof:
                print('{}  \\---> {} : {} :{}'.format(bcolors.WARNING, childof.pid, childof.name(), childof.cmdline()))
                print(bcolors.ENDC)
                return childof
    print(bcolors.ENDC)

def test_http_service(backdoor):
    try :
        requests.get('http://0.0.0.0:8000', timeout=1)
        return True
    except Exception as e :
        if backdoor is not None :
            backdoor.kill()
            print(f'{bcolors.WARNING} {bcolors.UNDERLINE} Kill all human ! {bcolors.ENDC} \n\n')
            print(e)
        return False

if __name__ == "__main__":
    time.sleep(3)
    while True :
        try:
            print()
            backdoor = look_subprocess(current_process)
            test_http_service(backdoor) # kill backdoor if unavailable

        except Exception as e:
            print(e)
            #p.kill()

        time.sleep(10)

    p.terminate()