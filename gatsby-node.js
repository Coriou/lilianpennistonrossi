const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions
	const videoPage = path.resolve(`src/templates/videoPage.js`)
	const videosPage = path.resolve(`src/templates/videosPage.js`)
	const result = await graphql(`
		{
			allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
				edges {
					node {
						frontmatter {
							path
						}
					}
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`)
		return
	}

	// Create single video page
	result.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
		createPage({
			path: node.frontmatter.path,
			component: videoPage,
			context: {},
		})
	})

	// Create listed pagination
	const posts = result.data.allMarkdownRemark.edges
	const postsPerPage = 6
	const numPages = Math.ceil(posts.length / postsPerPage)

	Array.from({ length: numPages }).forEach((_, i) => {
		createPage({
			path: i === 0 ? `/v` : `/v/${i}`,
			component: videosPage,
			context: {
				limit: postsPerPage,
				skip: i * postsPerPage,
				numPages,
				currentPage: i + 1,
			},
		})
	})
}

// https://www.gatsbyjs.org/packages/gatsby-plugin-netlify-cms/#disable-widget-on-site
const webpack = require(`webpack`)

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		plugins: [
			new webpack.IgnorePlugin({
				resourceRegExp: /^netlify-identity-widget$/,
			}),
		],
	})
}
