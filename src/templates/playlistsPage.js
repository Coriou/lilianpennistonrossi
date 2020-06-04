import React from "react"
import { graphql, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import {
	Row,
	Col,
	Pagination,
	PaginationItem,
	PaginationLink,
} from "reactstrap"

import Layout from "../templates/layout"
import SEO from "../components/seo"

const PlaylistsPage = ({ data, pageContext }) => {
	let {
		playlists: { edges: playlists },
		videos: { edges: videos },
	} = data

	const { numPlaylistsPages, currentPage } = pageContext

	playlists = playlists.map(e => e.node)

	const Playlists = () => {
		return playlists.map((playlist, i) => {
			const { frontmatter, excerpt } = playlist
			const cover = frontmatter.featuredImage
				? frontmatter.featuredImage.cover.fluid
				: false

			const { path, title } = frontmatter

			videos = videos
				.map(e => e.node)
				.filter(v => v.frontmatter.playlist === path)

			const featuredAuthors = Array.from([
				...new Set(videos.map((v, i) => v.frontmatter.author)),
			])
			const featuredAuthorsToDisplay = 3

			const videoCount = videos.length

			const Cover = () => {
				if (cover)
					return (
						<div
							className={[
								!cover ? "embed-responsive" : "",
								!cover ? "embed-responsive-16by9" : "",
								"video-thumbnail",
							].join(" ")}
							onClick={() => navigate(path)}
						>
							<Img
								fluid={cover}
								alt={title}
								className="embed-responsive-item"
							/>
						</div>
					)

				return null
			}

			return (
				<Row key={i} className="mt-4">
					<Col
						xs={12}
						lg={12}
						key={i}
						className="d-flex flex-column flex-grow-1"
					>
						<Cover />
						<Row className="d-flex">
							<Col>
								<Link to={path}>
									<h3 className="mb-0 mt-2 text-primary text-capitalize">
										{title}
									</h3>
								</Link>
							</Col>
						</Row>
						<Row className="d-flex">
							<Col>
								<p className="mt-2">{excerpt}</p>
							</Col>
						</Row>
					</Col>
					<Col>
						<p>
							{videoCount} tracks featuring pieces by{" "}
							{featuredAuthors.slice(0, featuredAuthorsToDisplay).map(a => (
								<>
									<b>
										<i>{a}</i>
									</b>
									,{" "}
								</>
							))}{" "}
							{featuredAuthors.length - featuredAuthorsToDisplay > 0 && (
								<span>
									and {featuredAuthors.length - featuredAuthorsToDisplay} more
								</span>
							)}
						</p>
					</Col>
				</Row>
			)
		})
	}

	const PaginationList = () => {
		if (numPlaylistsPages === 1) return null

		const actualCurrent = currentPage - 1
		const actualNum = numPlaylistsPages - 1

		const first = "/p"
		const last = `/p/${actualNum}`

		const previous = actualCurrent <= 1 ? first : `/p/${actualCurrent - 1}`
		const next = actualCurrent >= actualNum ? last : `/p/${actualCurrent + 1}`

		const previousDisabled = currentPage === 1
		const nextDisabled = currentPage === numPlaylistsPages

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
					Page {currentPage} / {numPlaylistsPages}
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
			<SEO title="Playlists" description="Some piano playlists" />
			<Playlists />
			<PaginationList />
		</Layout>
	)
}

export default PlaylistsPage

export const pageQuery = graphql`
	query($skip: Int!, $limit: Int!) {
		playlists: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			limit: $limit
			skip: $skip
			filter: { fileAbsolutePath: { regex: "/content/playlists/" } }
		) {
			edges {
				node {
					html
					excerpt(truncate: true, pruneLength: 255)
					frontmatter {
						path
						title
						featuredImage {
							cover: childImageSharp {
								fluid(maxWidth: 3840, quality: 90) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
					}
				}
			}
			totalCount
		}

		videos: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { fileAbsolutePath: { regex: "/^(?!.*playlists).*$/i" } }
		) {
			edges {
				node {
					frontmatter {
						author
						title
						playlist
					}
				}
			}
			totalCount
		}
	}
`
