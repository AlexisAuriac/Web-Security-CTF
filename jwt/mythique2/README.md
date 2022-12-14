# mythique2

## What it is

A website with a button that requires an admin jwt cookie to give the flag.

We know the jwt cookie uses RS256 ([source](https://stackoverflow.com/a/39239395/12864941)).

We can download the public key (see ```serverkey.pub```).

## Solution

(see solve.js)

We can use an algorithm confusion attack ([source](https://debricked.com/blog/json-web-tokens/)).

We create an admin cookie with HS256, using the server's public key as a secret key.

When the server tries to verify the token was signed with its private key, it will use its public key. But since our token is HS256, it will think the secret keys match.

flag: ```BFS{!W0W_muCh_s3cURe_V3rY_jWt!}``` 
