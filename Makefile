STUBBY = ./node_modules/.bin/stubby
CUCUMBER = ./node_modules/.bin/cucumber
MOCHA = ./node_modules/.bin/mocha
TRACEUR = ./node_modules/.bin/traceur
NAR = ./node_modules/.bin/nar
APITANCE = ./bin/apitance

define concat-mocks
	node -e "\
	var concat = require('concat-files'); \
 	concat([ \
		'test/mocks/json_schema.yaml', \
		'test/mocks/misc.yaml', \
	], 'test/mocks/all.yaml')"
endef

default: all
all: test
test: mocha test-acceptance
test-unit: mocha
test-acceptance: mock-server-stop concat mock-server apitance mock-server-stop

concat:
	@$(call concat-mocks)

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

apitance:
	$(APITANCE) -r features/step_definitions --tags ~@fail

apitance-all: apitance
	@-$(APITANCE) -r features/step_definitions --tags @fail

compile: clean mkdir copy
	$(TRACEUR) --modules=commonjs --require=true --module=lib/index.js --out src/index.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/client.js --out src/client.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/cli.js --out src/cli.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/apitance.js --out src/apitance.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/template.js --out src/template.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/store.js --out src/store.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/request.js --out src/steps/request.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/expectations.js --out src/steps/expectations.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/templating.js --out src/steps/templating.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/definitions.js --out src/steps/definitions.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/configuration.js --out src/steps/configuration.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/helpers.js --out src/steps/helpers.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/steps/steps.js --out src/steps/steps.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/support/world.js --out src/support/world.js
	$(TRACEUR) --modules=commonjs --require=true --module=lib/support/hooks.js --out src/support/hooks.js

mock-server:
	$(STUBBY) -d ./test/mocks/all.yaml > /dev/null & echo $$! > .server.pid

mock-server-stop:
	[ -f .server.pid ] && kill -9 `cat .server.pid | head -n 1` && rm -f .server.pid || exit 0

release:
	@$(call release,patch)

release-minor:
	@$(call release,minor)

nar:
	$(NAR) create -e --os linux
	$(NAR) create -e --os darwin

push-doc:
	relish push h2non/apitance

publish: test
	git push --tags origin HEAD:master
	npm publish

loc:
	wc -l lib/*
