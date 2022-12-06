#!/bin/env node

import fs from 'fs/promises'

import axios from 'axios'

import { runCmd } from './utilities.js'

async function main() {
	const ports = (await fs.readFile('most_used_ports.txt')).toString().split(',')

	// for (let i = 1; i < 70000; i++) {
	for (let i of ports) {
		const res = await runCmd(`timeout 1 bash -c '</dev/tcp/toto8042/${i}' && echo -n open || echo -n closed`)

		if (res === 'closed')
			continue
		console.log(`port ${i} is open`)
	}
}

main()
