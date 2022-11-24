#!/bin/bash

curl 'https://confessions.secu-web.blackfoot.dev/graphql?query=\{requestsLog\{name,args,timestamp\}\}' > logs.json
