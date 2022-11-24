const cipher_flag = "K@UC,bswslubr.wohp.dibokdmdb";

let i = 0
let flag = ""
for (let i = 0; i < 28; i += 4) {
	flag += String.fromCharCode(cipher_flag.charCodeAt(i) ^ 1);
	flag += String.fromCharCode(cipher_flag.charCodeAt(i + 1) ^ 3);
	flag += String.fromCharCode(cipher_flag.charCodeAt(i + 2) ^ 3);
	flag += String.fromCharCode(cipher_flag.charCodeAt(i + 3) ^ 7);
}

console.log(`flag: ${flag}`)
