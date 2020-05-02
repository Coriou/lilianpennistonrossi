import React from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import VideoWrapper from "../components/videoWrapper"

const VideoPages = ({ data }) => {
	console.log(data)

	const {
		allMarkdownRemark: { edges },
		mdx: { featuredImage },
	} = data

	const videos = edges.map(e => e.node)

	const Videos = () => {
		return videos.map((v, i) => {
			const { frontmatter, html, excerpt } = v
			const cover = frontmatter.featuredImage
				? frontmatter.featuredImage.cover.fluid
				: false

			const videoMeta = frontmatter.meta.split("|").map(meta => meta.split(","))
			videoMeta.push(["Posted", frontmatter.date])

			return (
				<Col md={12} lg={6} key={i}>
					<VideoWrapper
						small
						path={frontmatter.path}
						videoID={frontmatter.id}
						title={frontmatter.title}
						artist={frontmatter.author}
						author={frontmatter.textAuthor}
						description={html}
						meta={videoMeta}
						excerpt={excerpt}
						cover={cover}
					/>
				</Col>
			)
		})
	}

	return (
		<Layout>
			<SEO
				title="Videos"
				description="Some videos of me playing the piano"
				metaImage={
					featuredImage
						? {
								height: featuredImage.social.fixed.height,
								width: featuredImage.social.fixed.width,
								url: featuredImage.social.fixed.src,
						  }
						: false
				}
			/>
			<Row>
				<Videos />
			</Row>
		</Layout>
	)
}

export default VideoPages

export const pageQuery = graphql`
	query {
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					html
					frontmatter {
						author
						date(formatString: "DD-MM-YYYY HH:MM")
						id
						meta
						path
						title
						featuredImage {
							cover: childImageSharp {
								fluid(maxWidth: 3840, quality: 90) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
					excerpt(truncate: true, pruneLength: 255)
				}
			}
			totalCount
		}

		mdx(frontmatter: { path: { eq: "/" } }) {
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
