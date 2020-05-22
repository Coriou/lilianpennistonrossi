const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions

	/** VIDEOS */

	const videoPage = path.resolve(`src/templates/videoPage.js`)
	const videosPage = path.resolve(`src/templates/videosPage.js`)
	const videos = await graphql(`
		{
			allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___date] }
				filter: { fileAbsolutePath: { regex: "/^(?!.*playlists).*$/i" } }
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

	if (videos.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`)
		return
	}

	// Create single video page
	videos.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
		createPage({
			path: node.frontmatter.path,
			component: videoPage,
			context: {},
		})
	})

	// Create listed pagination
	const posts = videos.data.allMarkdownRemark.edges
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

	/** PLAYLISTS */
	const playlistsPage = path.resolve(`src/templates/playlistsPage.js`)
	const playlistPage = path.resolve(`src/templates/playlistPage.js`)

	const playlists = await graphql(`
		{
			allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___date] }
				filter: { fileAbsolutePath: { regex: "/content/playlists/" } }
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

	// Create playlist pages
	const playlistPosts = playlists.data.allMarkdownRemark.edges
	const playlistsPerPage = 6
	const numPlaylistsPages = Math.ceil(playlistPosts.length / playlistsPerPage)

	Array.from({ length: numPlaylistsPages }).forEach((_, i) => {
		createPage({
			path: i === 0 ? `/p` : `/p/${i}`,
			component: playlistsPage,
			context: {
				limit: playlistsPerPage,
				skip: i * playlistsPerPage,
				numPlaylistsPages,
				currentPage: i + 1,
			},
		})
	})

	// Create single playlist page
	playlists.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
		createPage({
			path: node.frontmatter.path,
			component: playlistPage,
			context: {
				path: node.frontmatter.path,
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
