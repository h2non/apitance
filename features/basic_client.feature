Feature: Basic client
  As a tester
  I want to verify basic HTTP features
  using the built-in Apitance steps

  Background:
    Given a server url http://localhost:8882/status/200
    And mock GET request to "/status/200"
    And mock should reply with status 200

  @valid
  Scenario: basic request
    Given the request method is GET
    When perform the request
    Then status code should be 200

  @valid
  Scenario: request with custom headers
    Given the request method is GET
    And the following request headers:
      | Header       | Value    |
      | Accept       | text/xml |
      | Content-Type | application/json |
      | X-Version    | 1.0.0 |
    When perform the request
    Then status code should be 200

  @valid
  Scenario: authentication credentials
    Given the username "chuck" and password "n0rr1s"
    When perform the request
    Then status code should be 200

  @valid
  Scenario: authorization
    Given the authorization value "chuck"
    When perform the request
    Then status code should be 200

  @valid
  Scenario: custom timeout
    Given a server url http://httpbin.org/delay/3
    And request timeout is 1 second
    When perform the request
    Then should fail due to timeout error

  @valid
  Scenario: wait timeout
    Given a server url http://httpbin.org/delay/3
    And request timeout is 1 second
    And should wait 1 second before send the request
    When perform the request
    Then should fail due to timeout error

  @valid
  Scenario: body payload
    Given a server url http://localhost:8882/post
    And mock POST request to "/post"
    And mock should reply with status 200 and body:
      """
      {"hello":"world"}
      """
    And the following request body data:
      """
      {"hello":"world"}
      """
    When perform the request
    Then status code should be 200

  @valid
  Scenario: body payload file path
    Given a server url http://httpbin.org/post
    And the following request body data from file:
      """
      test/fixtures/sample.json
      """
    When perform the request
    Then status code should be 200
