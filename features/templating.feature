Feature: Templating
  As a tester I want to use common
  template features in steps definitions

  Scenario: environment variables
    When set an environment variable "APITANCE" to "Hello"
    Then environment variable "APITANCE" is equal "Hello"