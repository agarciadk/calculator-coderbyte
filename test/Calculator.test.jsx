import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import {
// eslint-disable-next-line no-unused-vars
	Calculator,
	numbers,
	operations,
	equalSign,
	clearSign,
	commaSign,
	parenthesis
} from '../src/Calculator'

describe('Calculator', () => {
	afterEach(cleanup)

	// Test skipped
	it.skip('Calculator should render', () => {
		render(<Calculator />)
	})

	it('should render title correctly', () => {
		render(<Calculator />)

		screen.getByText('Calculator')
	})

	it('should render numbers', () => {
		render(<Calculator />)
		numbers.forEach(number => screen.getByText(number))
	})

	it('should render four rows of numbers', () => {
		render(<Calculator />)

		const rows = screen.getAllByRole('row')
		expect(rows).toHaveLength(4)
	})

	it('should render operations', () => {
		render(<Calculator />)

		operations.forEach(operation => {
			screen.getByText(operation.sign)
		})
	})

	it('should render equal sign', () => {
		render(<Calculator />)

		screen.getByText(equalSign)
	})

	it('should render an input', () => {
		render(<Calculator />)

		screen.getByRole('textbox')
	})

	it('should render a clear button', () => {
		render(<Calculator />)

		screen.getByText('C')
	})

	it('should user input after clicking a number', () => {
		render(<Calculator />)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('1')
	})

	it('should user input after clicking several numbers', () => {
		render(<Calculator />)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const two = screen.getByText('2')
		fireEvent.click(two)

		const three = screen.getByText('3')
		fireEvent.click(three)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('123')
	})

	it('should show user input after clicking numbers and operations', () => {
		render(<Calculator />)

		const one = screen.getByText('1')
		fireEvent.click(one)
		const plus = screen.getByText('+')
		fireEvent.click(plus)
		fireEvent.click(one)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('1+1')
	})

	it('should calculate based on user input and show the calculation', () => {
		render(<Calculator />)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const plus = screen.getByText('+')
		fireEvent.click(plus)
		fireEvent.click(one)

		const equal = screen.getByText(equalSign)
		fireEvent.click(equal)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('2')
	})

	it('should show user input after clicking equalSign', () => {
		render(<Calculator />)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const equal = screen.getByText(equalSign)
		fireEvent.click(equal)

		const plus = screen.getByText('+')
		fireEvent.click(plus)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('1+')
	})

	it('should reset value to empty string when user clicks on Clear sign', () => {
		render(<Calculator />)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('1')

		const clear = screen.getByText(clearSign)
		fireEvent.click(clear)

		expect(input.value).toBe('')
	})

	it('should return empty string when user click directly on equalSign', () => {
		render(<Calculator />)

		const equal = screen.getByText(equalSign)
		fireEvent.click(equal)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('')
	})

	it('should render an comma sign', () => {
		render(<Calculator />)
		screen.getByText(commaSign)
	})

	it('should show user input after clicking comma sign', () => {
		render(<Calculator />)

		const comma = screen.getByText(commaSign)
		fireEvent.click(comma)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe(commaSign)
	})

	it('should return empty string when user click commaSign and equalSign', () => {
		render(<Calculator />)

		const comma = screen.getByText(commaSign)
		fireEvent.click(comma)

		const equal = screen.getByText(equalSign)
		fireEvent.click(equal)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('')
	})

	it('should render parenthesis', () => {
		render(<Calculator />)

		parenthesis.map(parenthesisItem => screen.getByText(parenthesisItem))
	})

	it('should show user input after clicking parenthesis', () => {
		render(<Calculator />)

		const openParenthesis = screen.getByText(parenthesis[0])
		fireEvent.click(openParenthesis)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe(parenthesis[0])
	})

	it('should return empty strign when user click on parenthesis and equalSign', () => {
		render(<Calculator />)

		const openParenthesis = screen.getByText(parenthesis[0])
		fireEvent.click(openParenthesis)

		const equal = screen.getByText(equalSign)
		fireEvent.click(equal)

		const input = screen.getByRole('textbox')
		expect(input.value).toBe('')
	})

	it('should show an error message when the user write a wrong expression', () => {
		render(<Calculator />)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const openParenthesis = screen.getByText(parenthesis[0])
		fireEvent.click(openParenthesis)

		const equal = screen.getByText(equalSign)
		fireEvent.click(equal)

		const input = screen.getByRole('textbox')
		const errorMessage = 'Unexpected end of expression (char 3)'
		expect(input.value).toBe(errorMessage)
	})

	it('should be able to perfom another operation after an error', () => {
		render(<Calculator />)

		const one = screen.getByText('1')
		fireEvent.click(one)

		const openParenthesis = screen.getByText(parenthesis[0])
		fireEvent.click(openParenthesis)

		const equal = screen.getByText(equalSign)
		fireEvent.click(equal)

		const input = screen.getByRole('textbox')
		const errorMessage = 'Unexpected end of expression (char 3)'
		expect(input.value).toBe(errorMessage)

		fireEvent.click(one)
		expect(input.value).toBe('1')
	})
})
