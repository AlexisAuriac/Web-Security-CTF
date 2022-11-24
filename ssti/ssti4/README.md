# ssti4

## What it is

Same as sst3.

https://stackoverflow.com/a/12341532/12864941
The eviltree.py file is weird it contains html, it can be displayed on the website with:
```py
{{request.application.__globals__.__builtins__.__import__('os').popen('cat eviltree.py').read()|safe}}
```
It shows some github code from (eviltree)[https://github.com/t3l3machus/eviltree]\
Not sure if it is part of the challenge.

There is a docker-compose (see docker-compose.yml) that talks about a service that should be down but isn't.\
Hacen't found a way to access it yet.
