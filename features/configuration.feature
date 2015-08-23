Feature: Configuration
  As a tester I want to define global
  and local configurations in order to
  reuse them in multiple test scenarios

  Background:
    Given the global HTTP configuration:
      | Name    | Value |
      | URL     | http://localhost:8882 |
      | Method  | POST |
      | Path    | /config |
      | Body    | {"hello": "world"} |
      | Authorization | Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ== |
      | Headers | {"Version": "0.1.0"} |
      | Content-Type | application/json |
      | Query | key=value&another=value |
    Then define the environment variable "DEBUG" to "apitance"

  @valid
  Scenario: simple configuration request
    When I send the request
    Then response status code should be 202
    And response header "Content-Type" should be equal "application/json"
    And response body should be equal:
      """
      {"config": true}
      """
    And flush global configuration
