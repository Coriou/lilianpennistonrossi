import PropTypes from "prop-types"
import React, { useState } from "react"
import { Link } from "gatsby"
import {
	Container,
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import ThemeToggle from "./themeToggle"
import Logo from "./logo"

const Header = ({ siteTitle }) => {
	const [isNavOpen, setIsNavOpen] = useState(false)
	const toggleNav = () => setIsNavOpen(!isNavOpen)

	return (
		<ThemeToggler>
			{({ theme, toggleTheme }) => {
				if (!theme) return null
				return (
					<header>
						<Navbar
							color={theme}
							light={theme !== "dark"}
							dark={theme === "dark"}
							expand="md"
						>
							<Container>
								<NavbarBrand
									to="/"
									tag={Link}
									title={siteTitle}
									className="d-flex justify-content-center"
								>
									<Logo />
								</NavbarBrand>
								<NavbarToggler onClick={toggleNav} />
								<Collapse
									isOpen={isNavOpen}
									navbar
									className="justify-content-end"
								>
									<Nav navbar>
										<NavItem>
											<NavLink to="/v" tag={Link}>
												Videos
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink to="/" tag={Link}>
												About
											</NavLink>
										</NavItem>
										<NavItem className="d-flex align-self-md-center align-self-start">
											<ThemeToggle toggleTheme={toggleTheme} theme={theme} />
										</NavItem>
									</Nav>
								</Collapse>
							</Container>
						</Navbar>
					</header>
				)
			}}
		</ThemeToggler>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header
