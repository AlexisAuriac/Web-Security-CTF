#!/bin/env python3

enc_pwd = '3c09431700451c00232d19531900026c1e2a09431f7e38075d527e1052'
key = b'Th1s_1s_@_x0r_k3y_l0l!'

pwd = bytearray.fromhex(enc_pwd)
for i in range(len(pwd)):
	pwd[i] ^= key[i % len(key)]

print(pwd.decode())
