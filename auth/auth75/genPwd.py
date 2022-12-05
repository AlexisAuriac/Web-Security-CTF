#!/bin/env python3

import sys

def main(username):
	password = 0
	for c in username:
		password += ord(c)
	print(password)

if __name__ == '__main__':
	main(sys.argv[1])
