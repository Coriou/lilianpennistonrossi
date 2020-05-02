module.exports = {
	siteMetadata: {
		title: `Lilian Penniston-Rossi`,
		description: ``,
		author: `@coriou`,
		url: "https://lilian.video",
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
				icon: `static/icon.png`,
				start_url: `https://lilian.video`,
				name: `Lilian Penniston-Rossi`,
				short_name: `Lilian`,
				background_color: `#079992`,
				theme_color: `#079992`,
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
		// {
		// 	resolve: `gatsby-source-youtube-v2`,
		// 	options: {
		// 		channelId: [`UCdyIugDQol4mwsdcIWQUZCg`],
		// 		apiKey: `AIzaSyCDAuRWU9k9TaI2Xnj4SKvJ4oLv6AOsLBs`,
		// 	},
		// },
		`gatsby-plugin-mdx`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}
