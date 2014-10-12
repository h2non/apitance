Feature: Test

  Scenario: basic client testing
    Given a new request to http://httpbin.org/status/200
    And the request method is GET
    When perform the request
    Then status code should be 200

  Scenario: request headers
    Given a new request to http://localhost:8882/headers
    And the request method is GET
    And the following request headers:
      | header | value |
      | Accept | text/xml |
      | Content-Type | application/json |
      | X-Version | 1.0.0 |
    When perform the request
    Then status code should be 200
