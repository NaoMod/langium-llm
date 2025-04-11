/*export const jsonSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "UrbanTransportation",
  "type": "object",
  "properties": {
    "Model": {
      "type": "object",
      "properties": {
        "defs": {
          "type": "array",
          "items": {
            "oneOf": [
              { "$ref": "#/definitions/Bus" },
              { "$ref": "#/definitions/Route" },
              { "$ref": "#/definitions/Stop" }
            ]
          }
        }
      },
      "required": ["defs"]
    }
  },
  "definitions": {
    "NamedEntity": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "pattern": "^[_a-zA-Z][\\w_]*$"
        },
        "description": {
          "type": "string"
        }
      },
      "required": ["name", "description"]
    },
    "Bus": {
      "type": "object",
      "properties": {
        "$type": { "const": "Bus" },
        "name": { "$ref": "#/definitions/NamedEntity/properties/name" },
        "atStop": { "$ref": "#/definitions/Reference" },
        "batteryLevel": {
          "oneOf": [
            { "type": "number" },
            { "type": "string", "pattern": "^[0-9]+(\\.[0-9]+)?$" }
          ]
        }
      },
      "required": ["$type", "name", "atStop"]
    },
    "Route": {
      "type": "object",
      "properties": {
        "$type": { "const": "Route" },
        "name": { "$ref": "#/definitions/NamedEntity/properties/name" },
        "fromStop": { "$ref": "#/definitions/Reference" },
        "toStop": { "$ref": "#/definitions/Reference" },
        "consumption": {
          "oneOf": [
            { "type": "number" },
            { "type": "string", "pattern": "^[0-9]+(\\.[0-9]+)?$" }
          ]
        }
      },
      "required": ["$type", "name", "fromStop", "toStop"]
    },
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
    "Stop": {
      "type": "object",
      "description": "Abstract type for stops. Must be either SimpleStop or ReloaderStop.",
      "oneOf": [
        { "$ref": "#/definitions/SimpleStop" },
        { "$ref": "#/definitions/ReloaderStop" }
      ]
    },
    "SimpleStop": {
      "type": "object",
      "properties": {
        "$type": { "const": "SimpleStop" },
        "name": { "$ref": "#/definitions/NamedEntity/properties/name" },
        "description": {
          "$ref": "#/definitions/NamedEntity/properties/description"
        }
      },
      "required": ["$type", "name", "description"]
    },
    "ReloaderStop": {
      "type": "object",
      "properties": {
        "$type": { "const": "ReloaderStop" },
        "name": { "$ref": "#/definitions/NamedEntity/properties/name" },
        "description": {
          "$ref": "#/definitions/NamedEntity/properties/description"
        },
        "power": {
          "type": "number"
        }
      },
      "required": ["$type", "name", "description", "power"]
    }
  },
  "required": ["Model"]
}*/

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
        "batteryLevel": {
          "oneOf": [
            { "type": "number" },
            { "type": "string", "pattern": "^[0-9]+(\\.[0-9]+)?$" }
          ]
        }
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
        "consumption": {
          "oneOf": [
            { "type": "number" },
            { "type": "string", "pattern": "^[0-9]+(\\.[0-9]+)?$" }
          ]
        }
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