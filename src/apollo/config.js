export default {
	production: `${process.env.GATSBY_URL}`,
	development: `${process.env.GATSBY_DEV_URL}`,
	ws: {
		production: `${process.env.GATSBY_URL_WS}`,
		development: `${process.env.GATSBY_DEV_URL_WS}`
	}
}