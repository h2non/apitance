Feature: Variables
  As a tester
  I want to define multiple variables from steps

  Scenario: constants
    Given set constant "chuck" with value "norris"
    And set constant "norris" to "chuck"
    And set constants:
      | Name   | Value |
      | jackie | chan  |
    Then assert constant "chuck" to equal "norris"

