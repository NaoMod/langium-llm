export const jsonSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "UrbanTransportation",
  "type": "object",
  "properties": {
    "$type": { "const": "Model" },
    "defs": {
      "type": "array",
      "items": {
        "oneOf": [
          { "$ref": "#/definitions/Bus" },
          { "$ref": "#/definitions/Route" },
          { "$ref": "#/definitions/SimpleStop" },
          { "$ref": "#/definitions/ReloaderStop" }
        ]
      }
    }
  },
  "required": ["$type", "defs"],
  "definitions": {
    "Reference": {
      "type": "object",
      "properties": {
        "$ref": {
          "type": "string",
          "pattern": "^#/defs@[0-9]+$"
        }
      },
      "required": ["$ref"]
    },
    "Bus": {
      "type": "object",
      "properties": {
        "$type": { "const": "Bus" },
        "name": { "type": "string", "pattern": "^[_a-zA-Z][\\w_]*$" },
        "atStop": { "$ref": "#/definitions/Reference" },
        "batteryLevel": { "type": "number" }
      },
      "required": ["$type", "name", "atStop", "batteryLevel"]
    },
    "Route": {
      "type": "object",
      "properties": {
        "$type": { "const": "Route" },
        "name": { "type": "string", "pattern": "^[_a-zA-Z][\\w_]*$" },
        "fromStop": { "$ref": "#/definitions/Reference" },
        "toStop": { "$ref": "#/definitions/Reference" },
        "consumption": { "type": "number" }
      },
      "required": ["$type", "name", "fromStop", "toStop", "consumption"]
    },
    "SimpleStop": {
      "type": "object",
      "properties": {
        "$type": { "const": "SimpleStop" },
        "name": { "type": "string", "pattern": "^[_a-zA-Z][\\w_]*$" },
        "description": { "type": "string" }
      },
      "required": ["$type", "name", "description"]
    },
    "ReloaderStop": {
      "type": "object",
      "properties": {
        "$type": { "const": "ReloaderStop" },
        "name": { "type": "string", "pattern": "^[_a-zA-Z][\\w_]*$" },
        "description": { "type": "string" },
        "power": { "type": "number" }
      },
      "required": ["$type", "name", "description", "power"]
    }
  }
};