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
	mkdir src
	mkdir src/support
	mkdir src/steps

clean:
	rm -rf src

copy:
	cp ./node_modules/traceur/bin/traceur-runtime.js src/traceur-runtime.js

mocha:
	$(MOCHA) --harmony --timeout 2000 --reporter spec --ui tdd --compilers js:mocha-traceur

compile: clean mkdir copy
	$(TRACEUR) --modules=commonjs --require=true --module=lib/index.js --out src/index.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/client.js --out src/client.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/cli.js --out src/cli.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/apitance.js --out src/apitance.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/request.js --out src/steps/request.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/expect.js --out src/steps/expect.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/support/world.js --out src/support/world.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/support/hooks.js --out src/support/hooks.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/steps.js --out src/steps/steps.js

release:
	@$(call release,patch)

release-minor:
	@$(call release,minor)

publish: test release
	git push --tags origin HEAD:master
	npm publish

loc:
	wc -l src/*
