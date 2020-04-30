import React from "react"
export default ({ toggleTheme, theme }) => {
	return (
		<svg
			viewBox="0 0 32 32"
			title="Change Theme"
			width="32px"
			height="32px"
			className="theme-icon"
			onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
		>
			<circle cx="16" cy="16" r="10" />
			<circle cx="22" cy="10" r="10" className="animatable" />
		</svg>
	)
}
