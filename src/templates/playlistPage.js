import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Layout from "../templates/layout"
import SEO from "../components/seo"
import VideoWrapper from "../components/videoWrapper"

export default ({ data }) => {
	const [currentVideo, setCurrentVideo] = useState(0)
	const hasPlayed = useRef(false)

	useEffect(() => {
		if (currentVideo === 0) hasPlayed.current = false
	}, [currentVideo])

	let {
		playlist: { edges: playlist },
		videos: { edges: videos },
		site,
	} = data

	videos = videos.map(e => e.node)
	playlist = playlist.map(e => e.node)[0]

	const video = !videos
		? false
		: !videos[currentVideo]
		? videos[0]
		: videos[currentVideo]

	const handlePlayerEvents = (type, data, player) => {
		// Compute next video
		const nextVideo = currentVideo >= videos.length - 1 ? 0 : currentVideo + 1

		if (type === "state") {
			// Video start
			if (data === 1) hasPlayed.current = true
			// Video ended
			if (data === 0) {
				if (nextVideo !== 0) setCurrentVideo(nextVideo)
				else {
					hasPlayed.current = false
					setCurrentVideo(0)
				}
			}
		}

		if (type === "ready") {
			// A video is ready and we were already playing so we start it as soon as we can
			// disabled for the first video (otherwise we'd just loop over the playlist forever)
			if (hasPlayed.current === true && currentVideo !== 0) {
				player.playVideo()
				player.seekTo(5)
			}
		}
	}

	const Wrapper = ({ children }) => {
		const {
			html,
			excerpt,
			frontmatter: { title, featuredImage },
		} = playlist

		return (
			<Layout>
				<SEO
					title={`${title} | Playlist`}
					description={excerpt}
					metaImage={featuredImage ? featuredImage.social.fixed : false}
				/>

				<Row>
					<Col lg={8}>
						<h3 className="mt-4 mb-0 text-primary text-capitalize">{title}</h3>
						<div
							className="playlist-description"
							dangerouslySetInnerHTML={{ __html: html }}
						/>

						<VideoWrapper
							videoID={video.frontmatter.id}
							title={video.frontmatter.title}
							artist={video.frontmatter.author}
							authorBirthDeath={video.frontmatter.authorBirthDeath}
							author={video.frontmatter.textAuthor}
							description={video.html}
							meta={video.frontmatter.videoMeta}
							excerpt={video.excerpt}
							path={video.frontmatter.path}
							cover={
								video.frontmatter.featuredImage
									? video.frontmatter.featuredImage.cover.fluid
									: false
							}
							playlistComponent={Videos}
							partition={
								video.frontmatter.partition
									? `${site.siteMetadata.url}${video.frontmatter.partition.publicURL}`
									: false
							}
							wrapperClassname="pt-2"
							events={handlePlayerEvents}
						/>
					</Col>
					<Col lg={4} className="mt-4">
						{children}
					</Col>
				</Row>
			</Layout>
		)
	}

	const Videos = () => {
		const VideosList = () => {
			return (
				<ol className="playlist-selector">
					{videos.map((v, i) => {
						const { frontmatter } = v
						const { title, author } = frontmatter

						const isActive =
							video.frontmatter.id && v.frontmatter.id
								? video.frontmatter.id === v.frontmatter.id
								: false

						return (
							<li
								key={i}
								onClick={() => setCurrentVideo(i)}
								className={[
									"cursor-pointer",
									isActive ? "text-primary" : "",
								].join(" ")}
							>
								<b className={isActive ? "text-primary" : ""}>{title}</b>{" "}
								<span
									className={[
										"cursor-pointer",
										"d-block",
										isActive ? "text-primary" : "text-muted",
									].join(" ")}
								>
									{author}
								</span>
							</li>
						)
					})}
				</ol>
			)
		}

		return (
			<>
				<h6 className="mb-3">Pieces in this playlist:</h6>
				<VideosList />
			</>
		)
	}

	return (
		<Wrapper>
			<Videos />
		</Wrapper>
	)
}

export const pageQuery = graphql`
	query($playlistPath: String!) {
		videos: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { playlist: { eq: $playlistPath } } }
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
						partition {
							publicURL
						}
						featuredImage {
							cover: childImageSharp {
								fluid(maxWidth: 3840, quality: 90) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
					}
					excerpt(truncate: true, pruneLength: 255)
				}
			}
			totalCount
		}

		playlist: allMarkdownRemark(
			filter: { frontmatter: { path: { eq: $playlistPath } } }
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
							social: childImageSharp {
								fixed(width: 1200, height: 628, quality: 100) {
									...GatsbyImageSharpFixed_withWebp
								}
							}
						}
					}
				}
			}
			totalCount
		}

		site {
			siteMetadata {
				url
			}
		}
	}
`
