all:
	jekyll build
sync:
	 rsync --progress --delete -r _site/* root@asteriosk.gr:/var/www/asteriosk.gr/
preview:
	jekyll serve --watch --baseurl ''
