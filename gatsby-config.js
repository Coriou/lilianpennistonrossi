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
				name: `markdown-pages`,
				path: `${__dirname}/src/md-pages`,
			},
		},
		`gatsby-transformer-remark`,
		{
			resolve: `gatsby-plugin-netlify`,
			options: {},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}
