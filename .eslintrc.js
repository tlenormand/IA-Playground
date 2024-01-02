module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "es6": true,
    },
    "parser": "babel-eslint",
    // "extends": [
    //     "eslint:recommended",
    //     "plugin:react/recommended"
    // ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
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
            "always"
        ],
        "no-unused-vars": [
            "error",
            {
                "vars": "all",
                "args": "after-used",
                "ignoreRestSiblings": false
            }
        ],
        // "no-console": [
        //     "error",
        //     {
        //         "allow": [
        //             "warn",
        //             "error",
        //             "info",
        //             "log"
        //         ]
        //     }
        // ],

    }
}
