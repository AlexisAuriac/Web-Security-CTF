from flask import Flask, request, render_template_string, config
import os
import signal

app = Flask(__name__)

app.config["FLAG"] = "Hehehe the flag is not here this time"

time_addr = hex(id(__builtins__.__import__('time')))
print('Time addr : ' + time_addr)
sleep_addr = hex(id(__builtins__.__import__('time').sleep(0.1)))
print('Sleep addr : ' + sleep_addr)

def handler(signum, frame):
   raise Exception("End of time")

signal.signal(signal.SIGALRM, handler)

def check_useragent(request):
        useragent = request.headers.get('User-Agent')
        if 'tplmap' in useragent.lower():
            raise Exception("Shitty auto scanner detected")


#{{request.environ.get('HTTP_X_REAL_IP', request.remote_addr) }}
@app.route("/")
def index():
    name = request.args.get("username", "guest")

    try:
        check_useragent(request)
        signal.alarm(3)
        template = open("./index.html").read().format(name)
        res = render_template_string(template)
        signal.alarm(0)
        return res

    except Exception as e:
        print(str(e))
        if str(e) == "End of time":
            return "TIMEOUT"

def main():
    try :
        app.run(host="0.0.0.0", port=8000, debug=False)
    except Exception as e :
        print(e)
        if str(e) != "[Errno 98] Address already in use":
            main()

if __name__ == "__main__":
    main()