#!/bin/bash
read -p "Que lenguaje quieres?:" len
if [$len = "flask"]; then
	echo"flask"

elif [$len = "express" ]; then
	echo "express"
else echo "lenguaje invalido"
fi
