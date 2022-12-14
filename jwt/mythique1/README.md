# mythique1

## What it is

It's a website that requires an admin cookie to get the flag.

We can see in the code of the page (see index.js) that it splits the cookie at every ```.```, it then decodes the second part of the cookie for base64 and parses it as a JSON object.

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

Create an admin cookie:
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

Encode it to base64 and insert it into the second part of the original cookie.

Note: the name used matters in this case, names with non-ascii characters need more steps to work, but since we can put in any name it doesn't really matters.

flag: ```BFS{JwT_m0r3_l1k3_jwP33_xd}```
