// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'simple-import-sort'],
	rules: {
		'simple-import-sort/imports': [
			'error',
			{
				groups: [['^react'], ['^antd'], ['^@?\\w'], ['@/(.*)'], ['^[./]']],
			},
		],
	},
};
