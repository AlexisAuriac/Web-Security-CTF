#!/bin/bash

# Could use a command to get all files but this way we can order them and exclude some
chall=(
	auth/auth50/README.md
	auth/auth100/README.md
	auth/auth200/README.md
	js/b64js/README.md
	js/JS200/README.md
	lfi/lfi1/README.md
	lfi/lfi2/README.md
	lfi/lfi3/README.md
	lfi/lfi4/README.md
	obfuscation/OBF100/README.md
	sqli/potionseller/README.md
	jwt/mythique1/README.md
	jwt/mythique2/README.md
	ssti/ssti1/README.md
	ssti/ssti2/README.md
	ssti/ssti3/README.md
	ssti/ssti4/README.md
	xss/whatsup/README.md
	xss/whatsup2/README.md
	xxe/xxe1/README.md
	graphql/confessions/README.md
)

md=$(cat <<-END
# Web Security

CTF made for Epitech by Alexis AURIAC, Victor THOMAS
END
)

md=$md$'\n'$'\n'

for i in "${chall[@]}"; do
	chall_name=$(basename $(dirname $i))
	md=$md"- [$chall_name](#$chall_name)"$'\n'
done

md=$md$'\n'

for i in "${chall[@]}"; do
	md=$md"$(cat $i)"
	md=$md$'\n'$'\n'
done

echo "$md" > README.md

# https://wkhtmltopdf.org/
# wkhtmltopdf report.html report.pdf
