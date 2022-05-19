import React from 'react'
import { useStaticQuery, graphql } from 'gatsby' // to query for image data
import  Link from 'gatsby-link'

import { FullPageDiv } from './styled-components/FullPageDiv'
import { Typography, Button } from './primitives'
import SEO from './seo'

const Lost = () => {
  
	const { lostImage } = useStaticQuery(graphql`
		query {
      lostImage: file(name: {eq: "you-lost"}) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
		}
	`)
  
	return (
		<>
			<SEO title="Lost?" />
			<FullPageDiv>
				<div className="flex flex-col items-center p-4"></div>
				<Typography variant="h3" weight="medium" className="my-4">You seem to have lost your way</Typography>
				<img src={lostImage.childImageSharp.fluid.src} className="w-full md:w-1/3" alt="" />
				<Link to="/">
					<Button className="my-4" outline>Take me Home</Button>
				</Link>
			</FullPageDiv>
		</>
	)
}

export default Lost