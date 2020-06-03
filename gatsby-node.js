const fs = require(`fs`)
const path = require(`path`)

const videosQuery = `
{
	allMarkdownRemark(
		sort: { order: DESC, fields: [frontmatter___date] }
		filter: { fileAbsolutePath: { regex: "/^(?!.*playlists).*$/i" } }
	) {
		edges {
			node {
				frontmatter {
					path
          			title
					author
					featuredImage {
						thumbnail: childImageSharp {
							fluid(maxWidth: 500, quality: 90, cropFocus: WEST) {
								base64
								aspectRatio
								src
								srcSet
								srcWebp
								srcSetWebp
								sizes
							}
						}
					}  
				}
				excerpt
			}
		}
	}
}
`

const playlistsQuery = `
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
`

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions

	/** VIDEOS */

	const videoPage = path.resolve(`src/templates/videoPage.js`)
	const videosPage = path.resolve(`src/templates/videosPage.js`)
	const videos = await graphql(videosQuery)

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

	const playlists = await graphql(playlistsQuery)

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
				playlistPath: node.frontmatter.path,
			},
		})
	})
}

// Generating a JSON file to power the search feature client-side
exports.onPostBuild = async ({ graphql }) => {
	const videos = await graphql(videosQuery)

	const dataToWrite = {
		videos: [],
		playlists: [],
	}

	videos.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
		const fm = node.frontmatter

		dataToWrite.videos.push({
			title: fm.title,
			author: fm.author,
			path: fm.path,
			excerpt: node.excerpt,
			thumbnail: fm.featuredImage.thumbnail.fluid,
		})
	})

	fs.writeFileSync(
		path.resolve(path.join("./", "public", "content.json")),
		JSON.stringify(dataToWrite)
	)
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
