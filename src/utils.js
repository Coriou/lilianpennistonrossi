// Return a boolean depending if the value is numeric (works with strings)
export function isNumeric(value) {
	if (typeof value === "string") value = value.replace(/[,|-]/, "")

	return !isNaN(parseFloat(value)) && isFinite(value)
}

export function thousandSeparator(value, separator = " ") {
	if (!isNumeric(value)) return value

	if (typeof value === "string") value = value.replace(/,/, "")

	if (parseFloat(value) < 1000) return value.toString()

	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}
