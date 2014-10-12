Feature: Test

  Scenario: basic client testing
    Given a new request to http://httpbin.org/status/200
    And the request method is GET
    When perform the request
    Then status code should be 200

