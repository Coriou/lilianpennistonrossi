import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useWindowSize } from "../utils"
// import LogoLong from "../images/lilian-logo-long-holly.svg"
// import LogoSmall from "../images/lilian-logo-small-holly.svg"

export default () => {
	const {
		allFile: { edges },
	} = useStaticQuery(
		graphql`
			query {
				allFile(
					filter: {
						name: { eq: "lilian-logo-long-holly" }
						extension: { eq: "png" }
					}
				) {
					edges {
						node {
							long: childImageSharp {
								fixed(width: 572, height: 52, quality: 100) {
									...GatsbyImageSharpFixed
								}
							}
							small: childImageSharp {
								fixed(width: 200, height: 52, quality: 100) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
				}
			}
		`
	)

	const { width } = useWindowSize()

	if (width <= 768)
		return (
			<img src={edges[0].node.small.fixed.src} className="logo" alt="Logo" />
		)

	return <img src={edges[0].node.long.fixed.src} className="logo" alt="Logo" />
}
