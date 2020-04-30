module.exports = {
	siteMetadata: {
		title: `Lilian Penniston-Rossi`,
		description: ``,
		author: `@coriou`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sass`,
		`gatsby-plugin-dark-mode`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-react-svg`,
			options: {
				rule: {
					include: /images/,
				},
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Lilian-Penniston-Rossi`,
				short_name: `Lilian Piano`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `video-pages`,
				path: `${__dirname}/src/md-video-pages`,
			},
		},
		`gatsby-transformer-remark`,
		{
			resolve: `gatsby-plugin-netlify`,
			options: {},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `mdx-pages`,
				path: `${__dirname}/src/mdx-pages`,
			},
		},
		`gatsby-plugin-mdx`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}
