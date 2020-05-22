import React from "react"
import { graphql, Link } from "gatsby"
import { Row, Col } from "reactstrap"
import { Button } from "reactstrap"
import { FiTv } from "react-icons/fi"
import { BsMusicNoteList } from "react-icons/bs"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../templates/layout"
import SEO from "../components/seo"
import HomePhoto from "../components/homePhoto"

const IndexPage = ({ data }) => {
	const {
		mdx: { body },
	} = data

	return (
		<Layout>
			<SEO title="Home" />

			<article className="mt-4">
				<MDXProvider className="mt-4">
					<Row>
						<Col md={3} lg={2}>
							<HomePhoto />
						</Col>

						<Col>
							<MDXRenderer>{body}</MDXRenderer>
						</Col>
					</Row>
				</MDXProvider>
			</article>

			<Row>
				<Col
					xs={12}
					sm={6}
					className="d-flex justify-content-center align-content-center mb-6 mt-4"
				>
					<Button
						color="primary"
						className="btn-iconed w-100 w-md-50 text-white"
						block
						to={"/p/confinement-2020"}
						tag={Link}
					>
						<span className="btn-icon">
							<BsMusicNoteList />
						</span>
						<span className="btn-text">Latest Playlist</span>
					</Button>
				</Col>

				<Col className="d-flex justify-content-center align-content-center mb-6 mt-4">
					<Button
						color="primary"
						className="btn-iconed w-100 w-md-50 text-white"
						block
						to={"/v"}
						tag={Link}
					>
						<span className="btn-icon">
							<FiTv />
						</span>
						<span className="btn-text">All Videos</span>
					</Button>
				</Col>
			</Row>
		</Layout>
	)
}

export default IndexPage

export const pageQuery = graphql`
	query {
		mdx(frontmatter: { path: { eq: "/" } }) {
			body
		}
	}
`
