#!/bin/sh

unzip -p AU\ ZOO.docx word/document.xml > auzoo.xml

for f in *.jpg;do
	convert $f -auto-orient $f;
done

