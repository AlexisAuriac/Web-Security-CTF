# b64js

## What it is

It is a website that asks for a password.

The password goes through this:
```js
window.btoa(unescape(encodeURIComponent(input)))
```

```unescape``` and ```encodeURIComponent``` sanitize the input.

```window.btoa``` transforms the input into base64.

It then compares the result to ```RXZlckhlYXJkT2ZCYXNlNjQ/```.

## Solution

Decode ```RXZlckhlYXJkT2ZCYXNlNjQ/``` from base64:
```bash
$ echo "RXZlckhlYXJkT2ZCYXNlNjQ/" | base64 -d
EverHeardOfBase64?
```
flag: ```BFS{EverHeardOfBase64?}```
