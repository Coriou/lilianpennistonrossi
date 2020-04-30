import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import VideoWrapper from "../components/videoWrapper"

const VideosPages = ({ data }) => {
	const {
		allMarkdownRemark: { edges },
	} = data

	const videos = edges.map(e => e.node)

	const Videos = () => {
		return videos.map((v, i) => {
			const { frontmatter, html, excerpt } = v

			const videoMeta = frontmatter.meta.split("|").map(meta => meta.split(","))
			videoMeta.push(["Posted", frontmatter.date])

			return (
				<VideoWrapper
					small
					key={i}
					path={frontmatter.path}
					videoID={frontmatter.id}
					title={frontmatter.title}
					artist={frontmatter.author}
					author={frontmatter.textAuthor}
					description={html}
					meta={videoMeta}
					excerpt={excerpt}
				/>
			)
		})
	}

	return (
		<Layout>
			<SEO title="Videos" />
			<Videos />
		</Layout>
	)
}

export default VideosPages

export const pageQuery = graphql`
	query {
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					html
					frontmatter {
						author
						date(formatString: "DD-MM-YYYY")
						id
						meta
						path
						title
					}
					excerpt(truncate: true, pruneLength: 255)
				}
			}
			totalCount
		}
	}
`
