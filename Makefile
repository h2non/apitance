CUCUMBER = ./node_modules/.bin/cucumber
MOCHA = ./node_modules/.bin/mocha
TRACEUR = ./node_modules/.bin/traceur

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
	mkdir lib

clean:
	rm -rf lib

copy:
	cp ./node_modules/traceur/bin/traceur-runtime.js lib/traceur-runtime.js

mocha:
	$(MOCHA) --harmony --timeout 2000 --reporter spec --ui tdd --compilers js:mocha-traceur

compile: clean mkdir copy
	$(TRACEUR) --modules=commonjs --require=true --module=src/index.js --out lib/index.js

release:
	@$(call release,patch)

release-minor:
	@$(call release,minor)

publish: test release
	git push --tags origin HEAD:master
	npm publish

loc:
	wc -l lib/*
