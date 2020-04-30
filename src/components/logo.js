import React from "react"
import useWindowSize from "../useWindowSize"
import LogoLong from "../images/lilian-logo-long-holly.svg"
import LogoSmall from "../images/lilian-logo-small-holly.svg"

export default () => {
	const { width } = useWindowSize()

	if (width <= 768)
		return (
			<LogoSmall height="25.6px" width="100px" className="logo" alt="Logo" />
		)

	return <LogoLong height="25.6px" width="286px" className="logo" alt="Logo" />
}
