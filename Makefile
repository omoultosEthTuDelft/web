all:
	jekyll build
sync:
	 rsync --progress --delete -r _site/* asteriosk@sshgate.tu-berlin.de:public_html/
preview:
	jekyll serve --watch --baseurl ''
