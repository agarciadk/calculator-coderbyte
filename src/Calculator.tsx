import { useState } from 'react'
import { evaluate } from 'mathjs'

const rows = [
	['7', '8', '9'],
	['4', '5', '6'],
	['1', '2', '3'],
	['0']
]
export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const operations = [
	{
		label: 'plus',
		sign: '+'
	},
	{
		label: 'minus',
		sign: '-'
	},
	{
		label: 'multiplication',
		sign: '*'
	},
	{
		label: 'division',
		sign: '/'
	}
]
export const equalSign = '='
export const clearSign = 'C'
export const commaSign = '.'
export const parenthesis = ['(', ')']
const INITIAL_STATE = ''

export const Calculator = (): JSX.Element => {
	const [value, setValue] = useState(INITIAL_STATE)
	const [error, setError] = useState(false)

	const createHandleClick = (op: string) => () => {
		if (error) {
			setValue(op)
			setError(false)
		} else {
			setValue(value.concat(op))
		}
	}

	const evalInputs = (): void => {
		if (value.length === 0) return
		if (!validateInputs()) return reset()

		try {
			setValue(evaluate(value).toString())
		} catch (e: any) {
			setValue(e.message)
			setError(true)
		}
	}

	const validateInputs = (): boolean => {
		if (value.search(/[0-9]/) === -1) return false
		return true
	}

	const reset = (): void => setValue(INITIAL_STATE)

	return (
		<>
			<h1>Calculator</h1>
			<div className='calculator-wrapper'>
				<input className='input' style={ error ? { color: 'red', fontSize: '0.75rem' } : {}} value={value} readOnly />
				{
					parenthesis.map((parenthesisItem, idx) => (
						<button
							className={idx === 0 ? 'openParenthesis' : 'closedParenthesis'}
							onClick={createHandleClick(parenthesisItem)}
							key={parenthesisItem}
						>
							{parenthesisItem}
						</button>
					))
				}
				{
					rows.map((row, idx) => (
						<div className='dContents' key={idx} role='row'>
							{row.map(number => (
								<button
									className={`number-${number}`}
									onClick={createHandleClick(number)}
									key={number}
								>
									{number}
								</button>
							))}
						</div>
					))
				}
				{operations.map((operation) => (
					<button
						className={`operation-${operation.label}`}
						onClick={createHandleClick(operation.sign)}
						key={operation.label}
					>
						{operation.sign}
					</button>
				))}
				<button className='commaSign' onClick={createHandleClick(commaSign)}>{commaSign}</button>
				<button className='equalSign' onClick={evalInputs}>{equalSign}</button>
				<button className='clearSign' onClick={reset}>{clearSign}</button>
			</div>
		</>
	)
}
