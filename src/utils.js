// Return a boolean depending if the value is numeric (works with strings)
export const isNumeric = value => {
	if (typeof value === "string") value = value.replace(/[,|-]/, "")

	return !isNaN(parseFloat(value)) && isFinite(value)
}

export const thousandSeparator = (value, separator = " ") => {
	if (!isNumeric(value)) return value

	if (typeof value === "string") value = value.replace(/,/, "")

	if (parseFloat(value) < 1000) return value.toString()

	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export const parseDuration = duration => {
	try {
		duration = String(duration)
		// Mostly based on https://stackoverflow.com/a/32045167/10298824
		const durationRegex = /P(?:.*?)?(?:T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)/i

		let [, , minutes, seconds] = duration
			.match(durationRegex)
			.map(m => String(parseInt(m)).padStart(2, 0))

		return `${minutes}:${seconds}`
	} catch (err) {
		console.error(err)
		return false
	}
}
