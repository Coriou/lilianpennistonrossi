import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const IndexPage = ({ data }) => {
	const {
		mdx: { body },
	} = data

	return (
		<Layout>
			<SEO title="Home" />

			<article className="mt-4">
				<MDXProvider className="mt-4">
					<MDXRenderer>{body}</MDXRenderer>
				</MDXProvider>
			</article>
		</Layout>
	)
}

export default IndexPage

export const pageQuery = graphql`
	query {
		mdx(frontmatter: { path: { eq: "/" } }) {
			body
		}
	}
`
