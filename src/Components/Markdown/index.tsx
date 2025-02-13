import React from 'react'
import SimpleMarkdown from 'simple-markdown'

// ignore ts
// @ts-ignore

function CustomSpoiler(props: { children: any }) {
	const [visible, setVisible] = React.useState(false)
	return (
		<div
			style={{
				backgroundColor: '#000',
				color: '#000',
				border: '1px solid #000',
				borderRadius: '5px',
				padding: '5px',
				margin: '5px',
				cursor: 'pointer',
			}}
			onClick={() => setVisible(!visible)}
		>
			{visible ? props.children : 'Click to reveal'}
		</div>
	)
}
export default function Markdown(props: { content: string }) {
	const rules = {
		...SimpleMarkdown.defaultRules,
		underline: {
			order: SimpleMarkdown.defaultRules.em.order - 0.5,
			match: function (source: string) {
				return /^__([\s\S]+?)__(?!_)/.exec(source)
			},
			parse: function (capture: any, parse: any, state: any) {
				return {
					content: parse(capture[1], state),
				}
			},
			react: function (node: any, output: any) {
				return React.createElement('u', null, output(node.content))
			},
		},
		strong: {
			match: function (source: any, state: any, lookbehind: any) {
				return /^\*\*([\s\S]+?)\*\*(?!\*)/.exec(source)
			},
			parse: function (capture: any, recurseParse: any, state: any) {
				return {
					content: recurseParse(capture[1], state),
				}
			},
			react: function (node: any, recurseOutput: any) {
				return React.createElement('strong', null, recurseOutput(node.content))
			},
		},
		spoiler: {
			match: function (source: any) {
				return /^\|\|([\s\S]+?)\|\|(?!\|)/.exec(source)
			},
			parse: function (capture: any, parse: any, state: any) {
				return { content: parse(capture[1], state) }
			},
			react: function (node: any, output: any, state: any) {
				return <CustomSpoiler key={state.key}>{output(node.content, state)}</CustomSpoiler>
			},
		},
	}

	const rawBuiltParser = SimpleMarkdown.parserFor(rules)
	const parse = function (source: string) {
		var blockSorce = source + '\n\n'
		return rawBuiltParser(blockSorce, { inline: false })
	}
	var reactOutput = SimpleMarkdown.outputFor(rules, 'react')

	var syntaxTree = parse(props.content)

	return reactOutput(syntaxTree)
}
