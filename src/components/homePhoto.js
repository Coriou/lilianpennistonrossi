import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
	const {
		allFile: { edges },
	} = useStaticQuery(
		graphql`
			query {
				allFile(filter: { name: { eq: "cropped-piano" } }) {
					edges {
						node {
							photo: childImageSharp {
								fluid(maxWidth: 874, quality: 100) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
					}
				}
			}
		`
	)

	return (
		<Img
			fluid={edges[0].node.photo.fluid}
			className="home-picture mb-4 mb-md-0"
			alt="Lilian Penniston-Rossi"
		/>
	)
}
