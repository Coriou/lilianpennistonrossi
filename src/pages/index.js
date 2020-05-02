import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const IndexPage = ({ data }) => {
	const {
		mdx: { body, frontmatter },
	} = data

	return (
		<Layout>
			<SEO
				title="Home"
				description="A website to share my piano playing videos"
				metaImage={
					frontmatter.featuredImage
						? {
								height: frontmatter.featuredImage.social.fixed.height,
								width: frontmatter.featuredImage.social.fixed.width,
								url: frontmatter.featuredImage.social.fixed.src,
						  }
						: false
				}
			/>

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
			frontmatter {
				featuredImage {
					social: childImageSharp {
						fixed(width: 1200, height: 628, quality: 95) {
							...GatsbyImageSharpFixed
						}
					}
				}
			}
		}
	}
`
