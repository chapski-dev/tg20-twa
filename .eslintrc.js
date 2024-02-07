module.exports =  {
  "extends": [
    "react-app",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": [
    "react",
    "react-hooks",
    "import",
    "sort-keys-fix",
    "@typescript-eslint"
  ],
  "rules": {
    "import/no-named-as-default": "off",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        "reservedFirst": true
      }
    ],

    "@typescript-eslint/no-var-requires": 1,
    "@typescript-eslint/no-namespace": "off",
    "react/display-name": 0,
    "react/prop-types": 0,
    "prettier/prettier": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-shadow": "error",
    "sort-keys-fix/sort-keys-fix": "warn",
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-children-prop": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-fragments": 1,
    "@typescript-eslint/no-require-imports": "warn",
    "react-native/no-inline-styles": 0, // TODO: switch on later
    "eslint-comments/no-unlimited-disable": "off",
    "no-prototype-builtins": "warn",
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "quotes": ["error", "single"],
    "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
    "@typescript-eslint/semi": ["warn"],
    "@typescript-eslint/member-delimiter-style": ["warn"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/ban-ts-comment": "off",
    "no-unused-vars": ["error"],
    "no-useless-rename": "error",
    "no-duplicate-imports": "error",
    "prefer-arrow-callback": "warn",
    "arrow-parens": ["error", "always"],
    "curly": "error",
    "padded-blocks": ["warn", "never"],
    "no-multiple-empty-lines": ["warn", { "max": 1 }],
    "dot-notation": "error",
    "eqeqeq": "error",
    "no-empty-function": "error",
    "no-empty-pattern": "error",
    "no-multi-spaces": "warn",
    "no-shadow": "off",
    "array-bracket-newline": ["warn", "consistent"],
    "block-spacing": "warn",
    "comma-dangle": ["warn", "always-multiline"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "object-curly-spacing": ["warn", "always"],
    "eol-last": ["warn", "always"],
    "func-call-spacing": ["error", "never"],
    "jsx-quotes": ["error", "prefer-double"],
    "space-infix-ops": ["warn"],
    "key-spacing": ["warn", { "beforeColon": false, "afterColon": true, "mode": "strict" }],
    "object-property-newline": ["warn", { "allowMultiplePropertiesPerLine": true }],
    "no-unneeded-ternary": "error",
    "react/jsx-wrap-multilines": [
      "warn",
      {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "parens-new-line"
      }
    ],
    "react/jsx-tag-spacing": [
      "warn",
      {
        "closingSlash": "never",
        "beforeSelfClosing": "always",
        "afterOpening": "never",
        "beforeClosing": "never"
      }
    ],
    "arrow-body-style": ["error", "as-needed"],
    "react/jsx-curly-brace-presence": ["warn", "never"],
    "react/jsx-curly-newline": [
      "warn",
      {
        "multiline": "forbid",
        "singleline": "forbid"
      }
    ],
    "react/jsx-closing-bracket-location": ["warn"],
    "react/jsx-max-props-per-line": ["warn", { "when": "multiline" }],
    "react/jsx-first-prop-new-line": ["warn", "multiline"],
    "space-before-blocks": "warn",
    "brace-style": ["warn", "1tbs"],
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": ["error"],
    "keyword-spacing": "warn"
  
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
        "moduleDirectory": ["node_modules", "src/"]
      },
      "typescript": {
        "alwaysTryTypes": true
      }
    },
    "react": {
      "version": "detect"
    }
  },
  "overrides": [
    {
      "files": ["**/*.stories.*"],
      "rules": {
        "import/no-anonymous-default-export": "off"
      }
    }
  ]
}
