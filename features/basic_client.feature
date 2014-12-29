Feature: Basic client
  As a tester
  I want to verify basic HTTP features
  using the built-in Apitance steps

  Background:
    Given a server url http://httpbin.org/status/200

  Scenario: basic request
    Given the request method is GET
    When perform the request
    Then status code should be 200

  Scenario: request with custom headers
    Given the request method is GET
    And the following request headers:
      | Header       | Value    |
      | Accept       | text/xml |
      | Content-Type | application/json |
      | X-Version    | 1.0.0 |
    When perform the request
    Then status code should be 200

  Scenario: custom timeout
    Given a server url http://httpbin.org/delay/3
    And request timeout is 1 second
    When perform the request
    Then should fail due to timeout error
