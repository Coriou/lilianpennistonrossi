const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions
	const videoPage = path.resolve(`src/components/videoPage.js`)
	const result = await graphql(`
		{
			allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___date] }
				limit: 1000
				filter: { frontmatter: { isSpecial: { ne: true } } }
			) {
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

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.path,
			component: videoPage,
			context: {},
		})
	})
}
