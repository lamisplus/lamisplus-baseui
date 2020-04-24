export const data =
{
    "display": "",
    "components": [
      {
        "label": "Columns",
        "columns": [
          {
            "components": [
              {
                "label": "Enrolled into OVC?",
                "description": "",
                "tooltip": "",
                "shortcut": "",
                "inputType": "checkbox",
                "customClass": "",
                "tabindex": "",
                "hidden": false,
                "hideLabel": false,
                "autofocus": false,
                "disabled": false,
                "tableView": false,
                "modalEdit": false,
                "defaultValue": false,
                "persistent": true,
                "protected": false,
                "dbIndex": false,
                "encrypted": false,
                "redrawOn": "",
                "clearOnHide": true,
                "customDefaultValue": "",
                "calculateValue": "",
                "allowCalculateOverride": false,
                "validate": {
                  "required": false,
                  "customMessage": "",
                  "custom": "",
                  "customPrivate": false,
                  "json": "",
                  "unique": false,
                  "multiple": false,
                  "strictDateValidation": false
                },
                "errorLabel": "",
                "key": "ovc_enrolled",
                "tags": [],
                "properties": {
                  "ovc_enrolled": "true"
                },
                "conditional": {
                  "show": null,
                  "when": null,
                  "eq": "",
                  "json": ""
                },
                "customConditional": "",
                "logic": [
                  {
                    "name": "onchange",
                    "trigger": {
                      "type": "event",
                      "javascript": "document.getElementById(‘ovc_number’).disabled = !this.checked;",
                      "event": "onchange"
                    },
                    "actions": [
                      {
                        "name": "onchange",
                        "type": "value",
                        "value": "document.getElementById(‘ovc_enrolled’).onchange = function() {\n    document.getElementById(‘ovc_number’).disabled = !this.checked;\n};"
                      }
                    ]
                  }
                ],
                "attributes": {},
                "overlay": {
                  "style": "",
                  "page": "",
                  "left": "",
                  "top": "",
                  "width": "",
                  "height": ""
                },
                "type": "checkbox",
                "input": true,
                "hideOnChildrenHidden": false,
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "unique": false,
                "refreshOn": "",
                "labelPosition": "right",
                "widget": null,
                "validateOn": "change",
                "showCharCount": false,
                "showWordCount": false,
                "allowMultipleMasks": false,
                "dataGridLabel": true,
                "value": "",
                "name": "",
                "id": "ewv4wr2"
              }
            ],
            "width": 6,
            "offset": 0,
            "push": 0,
            "pull": 0
          },
          {
            "components": [],
            "width": 6,
            "offset": 0,
            "push": 0,
            "pull": 0
          }
        ],
        "autoAdjust": false,
        "hideOnChildrenHidden": false,
        "customClass": "",
        "hidden": false,
        "hideLabel": false,
        "tableView": false,
        "modalEdit": false,
        "key": "columns",
        "tags": [],
        "properties": {},
        "conditional": {
          "show": null,
          "when": null,
          "eq": "",
          "json": ""
        },
        "customConditional": "",
        "logic": [],
        "attributes": {},
        "overlay": {
          "style": "",
          "page": "",
          "left": "",
          "top": "",
          "width": "",
          "height": ""
        },
        "type": "columns",
        "input": false,
        "placeholder": "",
        "prefix": "",
        "suffix": "",
        "multiple": false,
        "defaultValue": null,
        "protected": false,
        "unique": false,
        "persistent": false,
        "clearOnHide": false,
        "refreshOn": "",
        "redrawOn": "",
        "labelPosition": "top",
        "description": "",
        "errorLabel": "",
        "tooltip": "",
        "tabindex": "",
        "disabled": false,
        "autofocus": false,
        "dbIndex": false,
        "customDefaultValue": "",
        "calculateValue": "",
        "widget": null,
        "validateOn": "change",
        "validate": {
          "required": false,
          "custom": "",
          "customPrivate": false,
          "strictDateValidation": false
        },
        "allowCalculateOverride": false,
        "encrypted": false,
        "showCharCount": false,
        "showWordCount": false,
        "allowMultipleMasks": false,
        "tree": false,
        "id": "erwvgp9",
        "path": "columns"
      },
      {
        "label": "Columns",
        "columns": [
          {
            "components": [
              {
                "title": "ovc number",
                "theme": "default",
                "tooltip": "",
                "customClass": "",
                "collapsible": false,
                "hidden": false,
                "disabled": false,
                "tableView": false,
                "modalEdit": false,
                "key": "ovcNumber",
                "tags": [],
                "properties": {},
                "customConditional": "",
                "conditional": {
                  "json": "",
                  "show": null,
                  "when": null,
                  "eq": ""
                },
                "logic": [],
                "attributes": {},
                "overlay": {
                  "style": "",
                  "page": "",
                  "left": "",
                  "top": "",
                  "width": "",
                  "height": ""
                },
                "type": "panel",
                "label": "o",
                "breadcrumb": "default",
                "input": false,
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": null,
                "protected": false,
                "unique": false,
                "persistent": false,
                "clearOnHide": false,
                "refreshOn": "",
                "redrawOn": "",
                "labelPosition": "top",
                "description": "",
                "errorLabel": "",
                "hideLabel": false,
                "tabindex": "",
                "autofocus": false,
                "dbIndex": false,
                "customDefaultValue": "",
                "calculateValue": "",
                "widget": null,
                "validateOn": "change",
                "validate": {
                  "required": false,
                  "custom": "",
                  "customPrivate": false,
                  "strictDateValidation": false
                },
                "allowCalculateOverride": false,
                "encrypted": false,
                "showCharCount": false,
                "showWordCount": false,
                "allowMultipleMasks": false,
                "tree": false,
                "components": [
                  {
                    "label": "OVC NUMBER",
                    "labelPosition": "top",
                    "placeholder": "",
                    "description": "",
                    "tooltip": "",
                    "prefix": "",
                    "suffix": "",
                    "widget": {
                      "type": "input"
                    },
                    "inputMask": "",
                    "allowMultipleMasks": false,
                    "customClass": "",
                    "tabindex": "",
                    "hidden": false,
                    "hideLabel": false,
                    "showWordCount": false,
                    "showCharCount": false,
                    "mask": false,
                    "autofocus": false,
                    "spellcheck": true,
                    "disabled": false,
                    "tableView": true,
                    "modalEdit": false,
                    "multiple": false,
                    "persistent": true,
                    "inputFormat": "plain",
                    "protected": false,
                    "dbIndex": false,
                    "case": "",
                    "encrypted": false,
                    "redrawOn": "",
                    "clearOnHide": true,
                    "customDefaultValue": "",
                    "calculateValue": "",
                    "allowCalculateOverride": false,
                    "validateOn": "change",
                    "validate": {
                      "required": false,
                      "pattern": "",
                      "customMessage": "",
                      "custom": "",
                      "customPrivate": false,
                      "json": "",
                      "minLength": "",
                      "maxLength": "",
                      "strictDateValidation": false,
                      "unique": false,
                      "multiple": false
                    },
                    "unique": false,
                    "errorLabel": "",
                    "key": "ovc_number",
                    "tags": [],
                    "properties": {},
                    "conditional": {
                      "show": true,
                      "when": "ovc_enrolled",
                      "eq": "true",
                      "json": ""
                    },
                    "customConditional": "",
                    "logic": [],
                    "attributes": {},
                    "overlay": {
                      "style": "",
                      "page": "",
                      "left": "",
                      "top": "",
                      "width": "",
                      "height": ""
                    },
                    "type": "textfield",
                    "input": true,
                    "refreshOn": "",
                    "inputType": "text",
                    "id": "ey91sxr",
                    "defaultValue": ""
                  }
                ],
                "id": "e77e0fs",
                "hideOnChildrenHidden": false,
                "path": "ovcNumber"
              }
            ],
            "width": 6,
            "offset": 0,
            "push": 0,
            "pull": 0
          },
          {
            "components": [],
            "width": 6,
            "offset": 0,
            "push": 0,
            "pull": 0
          }
        ],
        "autoAdjust": false,
        "hideOnChildrenHidden": false,
        "customClass": "",
        "hidden": false,
        "hideLabel": false,
        "tableView": false,
        "modalEdit": false,
        "key": "columns1",
        "tags": [],
        "properties": {},
        "conditional": {
          "show": null,
          "when": null,
          "eq": "",
          "json": ""
        },
        "customConditional": "",
        "logic": [],
        "attributes": {},
        "overlay": {
          "style": "",
          "page": "",
          "left": "",
          "top": "",
          "width": "",
          "height": ""
        },
        "type": "columns",
        "input": false,
        "placeholder": "",
        "prefix": "",
        "suffix": "",
        "multiple": false,
        "defaultValue": null,
        "protected": false,
        "unique": false,
        "persistent": false,
        "clearOnHide": false,
        "refreshOn": "",
        "redrawOn": "",
        "labelPosition": "top",
        "description": "",
        "errorLabel": "",
        "tooltip": "",
        "tabindex": "",
        "disabled": false,
        "autofocus": false,
        "dbIndex": false,
        "customDefaultValue": "",
        "calculateValue": "",
        "widget": null,
        "validateOn": "change",
        "validate": {
          "required": false,
          "custom": "",
          "customPrivate": false,
          "strictDateValidation": false
        },
        "allowCalculateOverride": false,
        "encrypted": false,
        "showCharCount": false,
        "showWordCount": false,
        "allowMultipleMasks": false,
        "tree": false,
        "id": "e9qvf1",
        "path": "columns1"
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "size": "md",
        "block": false,
        "action": "submit",
        "disableOnInvalid": true,
        "theme": "primary",
        "input": true,
        "placeholder": "",
        "prefix": "",
        "customClass": "",
        "suffix": "",
        "multiple": false,
        "defaultValue": null,
        "protected": false,
        "unique": false,
        "persistent": false,
        "hidden": false,
        "clearOnHide": true,
        "refreshOn": "",
        "redrawOn": "",
        "tableView": false,
        "modalEdit": false,
        "labelPosition": "top",
        "description": "",
        "errorLabel": "",
        "tooltip": "",
        "hideLabel": false,
        "tabindex": "",
        "disabled": false,
        "autofocus": false,
        "dbIndex": false,
        "customDefaultValue": "",
        "calculateValue": "",
        "widget": {
          "type": "input"
        },
        "attributes": {},
        "validateOn": "change",
        "validate": {
          "required": false,
          "custom": "",
          "customPrivate": false,
          "strictDateValidation": false,
          "unique": false,
          "multiple": false
        },
        "conditional": {
          "show": null,
          "when": null,
          "eq": ""
        },
        "overlay": {
          "style": "",
          "left": "",
          "top": "",
          "width": "",
          "height": ""
        },
        "allowCalculateOverride": false,
        "encrypted": false,
        "showCharCount": false,
        "showWordCount": false,
        "properties": {},
        "allowMultipleMasks": false,
        "leftIcon": "",
        "rightIcon": "",
        "dataGridLabel": true,
        "id": "er196z"
      }
    ]
  }