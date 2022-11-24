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
