LS = ./node_modules/.bin/lsc
LS_MODULE = ./node_modules/LiveScript/
MOCHA = ./node_modules/.bin/mocha
WISP = ./node_modules/.bin/wisp

define release
	VERSION=`node -pe "require('./package.json').version"` && \
	NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
	node -e "\
		var j = require('./package.json');\
		j.version = \"$$NEXT_VERSION\";\
		var s = JSON.stringify(j, null, 2);\
		require('fs').writeFileSync('./package.json', s);" && \
	git commit -m "release $$NEXT_VERSION" -- package.json && \
	git tag "$$NEXT_VERSION" -m "Version $$NEXT_VERSION"
endef

default: all
all: test
test: compile mocha

mkdir:
	mkdir -p lib/commands

clean:
	#	rm -rf lib

compile: clean mkdir
	cat src/cli.wisp | $(WISP) -c --no-map > ./lib/cli.js
	#cat src/commands/common.ls | $(LS) -c -s -b > ./lib/commands/common.js

mocha:
	cat test/lib/helper.ls | $(LS) -c > ./test/lib/helper.js
	$(MOCHA) --timeout 25000 --reporter spec --ui tdd --compilers ls:$(LS_MODULE)

release:
	@$(call release,patch)

release-minor:
	@$(call release,minor)

publish: test release
	git push --tags origin HEAD:master
	npm publish

loc:
	wc -l src/*
