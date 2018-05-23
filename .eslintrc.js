module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": 0,
        "eqeqeq": "error",
  "no-trailing-spaces": "error",
  "object-curly-spacing": [
      "error", "always"
  ],
  "arrow-spacing": [
      "error", { "before": true, "after": true }
  ]
    }
};
