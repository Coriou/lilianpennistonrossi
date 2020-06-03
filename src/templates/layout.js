import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Container } from "reactstrap"

import Header from "../components/header"
import Footer from "../components/footer"

import "../styles/index.scss"

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	return (
		<div id="app-wrapper">
			<Header siteTitle={data.site.siteMetadata.title} />
			<Container id="main-content">
				<main>{children}</main>
			</Container>
			<Footer />
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
