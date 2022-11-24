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
