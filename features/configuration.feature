Feature: Configuration
  As a tester I want to define global
  and local configurations in order to
  reuse them in multiple test scenarios

  Background:
    Given the following global HTTP client configuration:
      | Name    | Value |
      | URL     | http://localhost:8882 |
      | Method  | POST |
      | Path    | /config |
      | Body    | {"hello": "world"} |
      | Authentication | Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ== |
      | Headers | {"Content-Type": "application/json"} |

  Scenario: simple configuration request
    When I send the request
    Then the status code should be 204
    And response body header "Content-Type" should be equal "application/json"
