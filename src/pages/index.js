import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
	const {
		markdownRemark: { html },
	} = data

	return (
		<Layout>
			<SEO title="Home" />
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</Layout>
	)
}

export default IndexPage

export const pageQuery = graphql`
	query {
		markdownRemark(frontmatter: { path: { eq: "/" } }) {
			html
		}
	}
`
