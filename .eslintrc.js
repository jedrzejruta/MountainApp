{
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
	"settings": {
		"react": {
			"version": "detect"
		}
	},
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error", (process.platform === "win32" ? "windows" : "unix")
        ],
        "quotes": [
            "error",
            "single",
			{
				"allowTemplateLiterals": true
			}
        ],
		"jsx-quotes": [
			"error",
			"prefer-double"
		],
        "semi": [
            "error",
            "always"
        ]
    }
}
