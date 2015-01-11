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
    #When I send the request
    #Then response status code should be 200
    #And response header "Content-Type" should be equal "application/json"
    #And response body should be equal:
    #  """
    #  {"config": true}
    #  """
