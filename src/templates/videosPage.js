import React from "react"
import { graphql, Link } from "gatsby"
import {
	Row,
	Col,
	Pagination,
	PaginationItem,
	PaginationLink,
} from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import VideoWrapper from "../components/videoWrapper"

const VideoPages = ({ data, pageContext }) => {
	const {
		allMarkdownRemark: { edges },
	} = data

	const { numPages, currentPage } = pageContext

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
				<Col md={12} lg={6} key={i} className="d-flex flex-column flex-grow-1">
					<VideoWrapper
						preview
						path={frontmatter.path}
						videoID={frontmatter.id}
						title={frontmatter.title}
						artist={frontmatter.author}
						author={frontmatter.textAuthor}
						authorBirthDeath={frontmatter.authorBirthDeath}
						description={html}
						meta={videoMeta}
						excerpt={excerpt}
						cover={cover}
					/>
				</Col>
			)
		})
	}

	const PaginationList = () => {
		const actualCurrent = currentPage - 1
		const actualNum = numPages - 1

		const first = "/v"
		const last = `/v/${actualNum}`

		const previous = actualCurrent <= 1 ? first : `/v/${actualCurrent - 1}`
		const next = actualCurrent >= actualNum ? last : `/v/${actualCurrent + 1}`

		const previousDisabled = currentPage === 1
		const nextDisabled = currentPage === numPages

		// TO-DO: Add actual numbered pagination
		const NumberedPagination = () => {
			return null
		}

		return (
			<Row className="mb-4">
				<Col
					xs={4}
					className="d-flex justify-items-start align-items-center text-muted"
				>
					Page {currentPage} / {numPages}
				</Col>
				<Col xs={8} className="d-flex justify-content-end align-content-center">
					<Pagination>
						<PaginationItem disabled={previousDisabled}>
							<PaginationLink first to={first} tag={Link} />
						</PaginationItem>
						<PaginationItem disabled={previousDisabled}>
							<PaginationLink previous to={previous} tag={Link} />
						</PaginationItem>

						<NumberedPagination />

						<PaginationItem disabled={nextDisabled}>
							<PaginationLink next to={next} tag={Link} />
						</PaginationItem>
						<PaginationItem disabled={nextDisabled}>
							<PaginationLink last to={last} tag={Link} />
						</PaginationItem>
					</Pagination>
				</Col>
			</Row>
		)
	}

	return (
		<Layout>
			<SEO title="Videos" description="Some videos of me playing the piano" />
			<Row>
				<Videos />
			</Row>
			<PaginationList />
		</Layout>
	)
}

export default VideoPages

export const pageQuery = graphql`
	query($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					html
					frontmatter {
						author
						authorBirthDeath
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
	}
`
