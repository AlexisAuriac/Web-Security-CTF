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

flag: ```JCVD-approves-this-challenge```
