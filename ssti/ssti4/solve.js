#!/bin/env node

import axios from 'axios'

import { runCmd, runPython } from './utilities.js'

async function main() { 
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
