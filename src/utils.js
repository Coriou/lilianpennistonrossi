import store from "store2"
import { useEffect, useState, useCallback } from "react"

export const useWindowSize = () => {
	const isClient = window && typeof window === "object"
	const getSize = useCallback(() => {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined,
		}
	}, [isClient])

	const [windowSize, setWindowSize] = useState(getSize())

	useEffect(() => {
		if (!isClient) return { height: false, width: false }

		function handleResize() {
			setWindowSize(getSize())
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [isClient, getSize])

	return windowSize
}

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

export const setCache = (key, value) => {
	return store(key, { data: value, updated: Date.now() })
}

export const getCache = (key, ttl = false) => {
	const v = store(key)
	if (!v || !v.data) return false

	if (!ttl) return v.data

	if (v.updated && Date.now() - parseInt(v.updated) >= ttl) return false

	return v.data
}
