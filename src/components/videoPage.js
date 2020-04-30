import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import VideoWrapper from "../components/videoWrapper"

export default ({ data }) => {
	const { markdownRemark } = data
	const { frontmatter, html, excerpt } = markdownRemark

	const videoMeta = frontmatter.meta.split("|").map(meta => meta.split(","))
	videoMeta.push(["Posted", frontmatter.date])

	return (
		<Layout>
			<SEO
				title={`${frontmatter.title} | ${frontmatter.author}`}
				description={excerpt}
			/>
			<VideoWrapper
				videoID={frontmatter.id}
				title={frontmatter.title}
				artist={frontmatter.author}
				author={frontmatter.textAuthor}
				description={html}
				meta={videoMeta}
				excerpt={excerpt}
				path={frontmatter.path}
			/>
		</Layout>
	)
}

export const pageQuery = graphql`
	query($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			excerpt
			frontmatter {
				date(formatString: "DD-MM-YYYY")
				title
				author
				textAuthor
				path
				meta
				id
			}
		}
	}
`