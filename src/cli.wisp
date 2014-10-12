(ns apitance.src.cli
  (:require [yargs] [apitance.src.apitance :as apitance]))

(def ^:private cli (.usage yargs "Apitance.\nUsage: $0"))

(.example cli "$0 -r support/world -r support/hooks" "")
(.describe cli "version" "Show the current version")
(.alias cli "version" "v")
(.describe cli "require" "Require files before executing the features. If\n
                          this option is not specified, all *.js and\n
                          *.coffee files that are siblings or below the\n
                          features will be loaded automatically. Automatic\n
                          loading is disabled when this option is specified,\n
                          and all loading becomes explicit.")
(.alias cli "require" "r")
(.describe cli "tags" "Only execute the features or scenarios with tags\n
                      matching TAG_EXPRESSION. Scenarios inherit tags\n
                      declared on the Feature level. The simplest\n
                      TAG_EXPRESSION is simply a tag. Example:\n
                          --tags @dev\n")
(.alias cli "tags" "r")

(def ^:private argv (.-argv cli))

(defn ^:private echo
  [& args]
  (apply (.-write (.-stdout process)) args))

(if (.-help argv)
  (.help yargs)
  (if (.-version argv)
    (echo (.-VERSION apitance))
    (apitance argv)))

(.log console argv)
