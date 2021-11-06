all:
	jekyll build
preview:
	jekyll serve --watch --baseurl ''
install:
	sudo gem install github-pages
