

const Input = (
	props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) => {
	return (
		<input
			{ ...props }
		/>
	)
}

export default Input