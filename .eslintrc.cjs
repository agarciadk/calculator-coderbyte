module.exports = {
	parserOptions: {
		project: './tsconfig.json'
	},
	extends: [
		'standard-with-typescript'
	],
	plugins: [
		'react-hooks'
	],
	rules: {
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: 'off',
		'@typescript-eslint/indent': ['error', 'tab']
	}
}
