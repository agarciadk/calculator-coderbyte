import { useState } from 'react'
import { evaluate } from 'mathjs'

const rows = [
	['7', '8', '9'],
	['4', '5', '6'],
	['1', '2', '3'],
	['0']
]

export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const operations = ['+', '-', '*', '/']
export const equalSign = '='
export const clearSign = 'C'
export const commaSign = '.'
export const parenthesis = ['(', ')']
const INITIAL_STATE = ''
export const Calculator = (): JSX.Element => {
	const [value, setValue] = useState(INITIAL_STATE)

	const createHandleClick = (op: string) => () => setValue(value.concat(op))

	const evalInputs = (): void => {
		if (value.length === 0) return
		if (!validateInputs()) return reset()

		try {
			setValue(evaluate(value).toString())
		} catch (e: any) {
			setValue(e.message)
		}
	}

	const validateInputs = (): boolean => {
		if (value.search(/[0-9]/) === -1) return false
		return true
	}

	const reset = (): void => setValue(INITIAL_STATE)

	return (
		<div>
			<h1>Calculator</h1>
			<input value={value} readOnly />
			<div role='grid'>
				{rows.map((row, idx) => (
					<div key={idx} role='row'>
						{row.map(number => <button onClick={createHandleClick(number)} key={number}>{number}</button>)}
					</div>
				))}
				<button onClick={createHandleClick(commaSign)}>{commaSign}</button>
				{
					operations.map(operation => (
						<button onClick={createHandleClick(operation)} key={operation}>{operation}</button>
					))
				}
				{
					parenthesis.map(parenthesisItem => (
						<button onClick={createHandleClick(parenthesisItem)} key={parenthesisItem}>{parenthesisItem}</button>
					))
				}
			</div>

			<button onClick={evalInputs}>{equalSign}</button>
			<button onClick={reset}>{clearSign}</button>
		</div>
	)
}
