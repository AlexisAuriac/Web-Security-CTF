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
