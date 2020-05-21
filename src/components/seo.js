import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, metaImage = false, videoID }) {
	const {
		site,
		allFile: { edges },
	} = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						url
					}
				}

				allFile(
					filter: { name: { eq: "mainCover" }, extension: { eq: "jpg" } }
				) {
					edges {
						node {
							social: childImageSharp {
								fixed(width: 1200, height: 628, quality: 100) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
				}
			}
		`
	)

	const metaDescription = description || site.siteMetadata.description

	try {
		if (!metaImage) {
			metaImage = edges[0].node.social.fixed
		}
	} catch (err) {
		console.error(err)
	}

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={`%s | ${site.siteMetadata.title}`}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			]
				.concat(
					metaImage
						? [
								{
									property: "og:image",
									content: `${site.siteMetadata.url}${metaImage.src}`,
								},
								{
									property: "og:image:width",
									content: metaImage.width,
								},
								{
									property: "og:image:height",
									content: metaImage.height,
								},
								{
									name: "twitter:card",
									content: "summary_large_image",
								},
						  ]
						: []
				)
				.concat(
					videoID
						? [
								{
									property: "og:video",
									content: `https://youtu.be/${videoID}`,
								},
						  ]
						: []
				)
				.concat(meta)}
		/>
	)
}

SEO.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
}

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
}

export default SEO
