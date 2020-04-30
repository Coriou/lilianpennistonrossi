import { useEffect, useState, useCallback } from "react"

export default () => {
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
