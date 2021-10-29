require('dotenv').config({
	path: '.env',
})

module.exports = {
	siteMetadata: {
		title: 'Tope Daramola',
		description: 'Dallas based software engineer with a passion for Javascript.',
		author: '@_toped',
		siteUrl: 'https://topedaramola.com',
		keywords: ['tope', 'toped', 'tope daramola', 'software', 'engineer', 'facebook', 'apple', 'amazon', 'netflix', 'google'],
		shareImage: `${__dirname}/src/assets/img/share-image.png`
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				// The property ID; the tracking code won't be generated without it
				trackingId: 'UA-136779217-1',
				// Defines where to place the tracking script - `true` in the head and `false` in the body
				head: true
			},
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/assets/img`,
			},
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /\.inline\.svg$/
				}
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'toped',
				short_name: 'toped',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'src/assets/img/logo/logo.svg', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-offline',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-postcss'
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}
