module.exports = {
	extends: [
		'stylelint-config-standard-scss',
		'stylelint-config-html/svelte',
		'stylelint-config-recess-order'
	],
	overrides: [
		{
			files: ['*.svelte', '**/*.svelte'],
			customSyntax: 'postcss-html'
		}
	],
	rules: {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global']
			}
		],
		'comment-empty-line-before': null,
		'custom-property-empty-line-before': null,
		'scss/at-rule-no-unknown': true,
		'no-invalid-position-declaration': null,
		'no-empty-source': null,
		'declaration-block-no-redundant-longhand-properties': [
			true,
			{
				ignoreLonghands: ['grid-template-areas', 'grid-template-rows', 'grid-template-columns']
			}
		]
	}
};
