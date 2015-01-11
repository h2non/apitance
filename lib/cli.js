const Apitance = require('./')
const args = process.argv

const cmd = args[2] || ''

switch (true) {
  case !~~cmd.indexOf('version') || cmd === '-v':
    displayVersion()
    break
  case !~~cmd.indexOf('help') || cmd === '-h':
    displayHelp()
    break
  default:
    Apitance(args)
    break
}

function displayVersion() {
  return process.stdout.write(
    `Apitance ${Apitance.VERSION}\n` +
    `Cucumber ${Apitance.Cucumber.VERSION}\n`
  )
}

function displayHelp() {
  process.stdout.write("Usage: apitance [options] [[FILE|DIR][:LINE]]+\n\
\n\
-r, --require LIBRARY|DIR     Require files before executing the features. If\n\
                              this option is not specified, all *.js and\n\
                              *.coffee files that are siblings or below the\n\
                              features will be loaded automatically. Automatic\n\
                              loading is disabled when this option is specified,\n\
                              and all loading becomes explicit.\n\
\n\
                              Files under directories named \"support\" are\n\
                              always loaded first.\n\
\n\
-t, --tags TAG_EXPRESSION     Only execute the features or scenarios with tags\n\
                              matching TAG_EXPRESSION. Scenarios inherit tags\n\
                              declared on the Feature level. The simplest\n\
                              TAG_EXPRESSION is simply a tag. Example:\n\
                                --tags @dev\n\
\n\
                              When a tag in a tag expression starts with a ~,\n\
                              this represents boolean NOT. Example:\n\
                                --tags ~@dev\n\
\n\
                              A tag expression can have several tags separated\n\
                              by a comma, which represents logical OR. Example:\n\
                                --tags @dev,@wip\n\
\n\
                              The --tags option can be specified several times,\n\
                              and this represents logical AND. Example:\n\
                                --tags @foo,~@bar --tags @zap.\n\
\n\
                              This represents the following boolean expression:\n\
                              (@foo || !@bar) && @zap.\n\
\n\
                              Beware that if you want to use several negative\n\
                              tags to exclude several tags you have to use\n\
                              logical AND: --tags ~@fixme --tags ~@buggy.\n\
\n\
-f, --format FORMAT           How to format features (default: progress).\n\
                              Available formats:\n\
                                pretty  : prints the feature as is\n\
                                progress: prints one character per scenario\n\
                                json    : prints the feature as JSON\n\
                                summary : prints a summary only, after all\n\
                                          scenarios were executed\n\
\n\
-i, --no-snippets             Don't print snippets for pending steps.\n\
\n\
-S, --strict                  Fail if there are any undefined or pending steps.\n\
\n\
--coffee                      Display step definition snippets in CoffeeScript.\n\
\n\
-v, --version                 Display Apitance's version.\n\
\n\
-h, --help                    You're looking at it.\n\
")
}
