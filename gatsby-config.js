const isDev = process.env.NODE_ENV !== "production"

module.exports = {
	siteMetadata: {
		title: `Lilian Penniston-Rossi`,
		description: `A place to share my love for piano`,
		author: `@coriou`,
		url: isDev ? "http://localhost:8000" : "https://lilian.video",
		isDev,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
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
				name: `images`,
				path: `${__dirname}/content/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `videos`,
				path: `${__dirname}/content/videos`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `partitions`,
				path: `${__dirname}/content/partitions`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: `${__dirname}/content/pages`,
			},
		},
		`gatsby-transformer-remark`,
		{
			resolve: `gatsby-plugin-netlify`,
			options: {
				enableIdentityWidget: false,
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
		`gatsby-plugin-webpack-bundle-analyser-v2`,
		`gatsby-plugin-netlify-cms`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}
