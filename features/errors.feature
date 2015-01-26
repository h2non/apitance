Feature: Errors
  As a tester
  I want to verify different testing errors behaviors

  @valid
  Scenario: cannot resolve host
    Given a server url http://invalid.host:8888
    When perform the request
    Then should fail due to "not found" error

  @valid
  Scenario: connection refused
    Given a server url http://localhost:8888
    When perform the request
    Then should fail due to "refuse" error

  @valid
  Scenario: request error
    Given a server url http://localhost:8888
    When perform the request
    Then should fail due to an error
