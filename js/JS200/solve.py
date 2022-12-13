#!/bin/env python3

flag = bytearray("K@UC,bswslubr.wohp.dibokdmdb", "utf-8")

for i in range(0, len(flag), 4):
	flag[i] ^= 1
	flag[i + 1] ^= 3
	flag[i + 2] ^= 3
	flag[i + 3] ^= 7

print(f"flag: {flag.decode()}")
