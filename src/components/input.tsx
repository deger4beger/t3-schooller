

const Input = (
	props: Omit<
		React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		"classname" // ## TODO: not working
	>
) => {
	return (
		<input
			className="border-b-2 border-zinc-600 text-zinc-900 px-2 text-base mb-4 w-full bg-zinc-200"
			{ ...props }
		/>
	)
}

export default Input