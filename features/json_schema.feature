Feature: JSON Schema
  As a tester
  I want to assert multiple JSON responses validating
  it with a proper JSON Schema interface

  Background:
    Given a server base url: http://localhost:8882

  @valid
  Scenario: validate JSON Schema from a file
    Given a server url /json-schema/simple
    When perform the request
    Then status code should be 200
    And body should implement the JSON schema file:
      """
      features/fixtures/simple_schema.json
      """

  @valid
  Scenario: validate JSON Schema in-line
    Given a server url /json-schema/simple
    When perform the request
    Then status code should be 200
    And body should implement the JSON schema:
      """
      {
        "type": "object",
        "$schema": "http://json-schema.org/draft-03/schema",
        "id": "http://jsonschema.net",
        "required": true,
        "properties": {
          "address": {
            "type": "object",
            "id": "http://jsonschema.net/address",
            "required": true,
            "properties": {
              "city": {
                "type": "string",
                "id": "http://jsonschema.net/address/city",
                "required": true
              },
              "streetAddress": {
                "type": "string",
                "id": "http://jsonschema.net/address/streetAddress",
                "required": true
              }
            }
          }
        }
      }
      """

  @valid
  Scenario: invalid JSON Schema
    Given a server url /json-schema/invalid
    When perform the request
    Then status code should be 200
    And body should not implement the JSON schema file:
      """
      features/fixtures/simple_schema.json
      """

  @valid
  Scenario: nested JSON validation
    Given a server url /json-schema/invalid
    When perform the request
    Then status code should be 200
    And body should not implement the JSON schema file:
      """
      features/fixtures/simple_schema.json
      """

  @fail
  Scenario: invalid file file
    Given a server url /ping
    When perform the request
    Then status code should be 200
    And body should implement the JSON schema file:
      """
      features/fixtures/invalid.json
      """
