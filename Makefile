all:
	eval "$$(rbenv init -)" && bundle exec jekyll build
preview:
	eval "$$(rbenv init -)" && bundle exec jekyll serve --watch --baseurl ''
install:
	sudo gem install github-pages faraday
