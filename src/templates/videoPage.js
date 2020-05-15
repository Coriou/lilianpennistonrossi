import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import VideoWrapper from "../components/videoWrapper"

export default ({ data }) => {
	const { markdownRemark, site } = data
	const { frontmatter, html, excerpt } = markdownRemark

	const videoMeta = frontmatter.meta.split("|").map(meta => meta.split(","))
	videoMeta.push(["Posted", frontmatter.date])

	return (
		<Layout>
			<SEO
				title={`${frontmatter.title} | ${frontmatter.author}`}
				description={excerpt}
				metaImage={
					frontmatter.featuredImage
						? frontmatter.featuredImage.social.fixed
						: false
				}
			/>
			<VideoWrapper
				videoID={frontmatter.id}
				title={frontmatter.title}
				artist={frontmatter.author}
				authorBirthDeath={frontmatter.authorBirthDeath}
				author={frontmatter.textAuthor}
				description={html}
				meta={videoMeta}
				excerpt={excerpt}
				path={frontmatter.path}
				cover={
					frontmatter.featuredImage
						? frontmatter.featuredImage.cover.fluid
						: false
				}
				partition={
					frontmatter.partition
						? `${site.siteMetadata.url}${frontmatter.partition.publicURL}`
						: false
				}
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
				date(formatString: "DD-MM-YYYY HH:MM")
				title
				author
				authorBirthDeath
				textAuthor
				path
				meta
				id
				featuredImage {
					social: childImageSharp {
						fixed(width: 1200, height: 628, quality: 95) {
							...GatsbyImageSharpFixed
						}
					}
					cover: childImageSharp {
						fluid(maxWidth: 3840, quality: 90) {
							...GatsbyImageSharpFluid
						}
					}
				}
				partition {
					publicURL
				}
			}
		}

		site {
			siteMetadata {
				url
			}
		}
	}
`
