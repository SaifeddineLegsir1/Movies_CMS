import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Artist,
} from "./pageStyles/pageStyles"
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          title,
          kleineBeschrijving,
          bannerFoto,
          featuredMovies
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homeMeta {
            title
            kleineBeschrijving
            bannerFoto {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
     
        featuredMovies {
          ... on WPGraphql_Movie {
            slug
            movie {
              title
              runningTime
              directorS
              cover {
                altText
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(quality: 100, grayscale: true){
                    ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`
  )


  return(
    <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image
          fluid={bannerFoto.imageFile.childImageSharp.fluid}
          alt={bannerFoto.altText}
        />
        <div className="inner-div">
          <p className="header-title">{title}</p>
          <p className="header-description">{kleineBeschrijving}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK} />
      </div>
      <div className="description">
        <p>{kleineBeschrijving}</p>
        <BottomEdgeUp color={COLORS.PRIMARY} />
      </div>
      <div className="artists">
        <h2>Featured Movies</h2>
        <div className="artist-items">
          {featuredMovies.map(({ movie, slug }) => (
            <Artist key={slug} to={`/${slug}`}>
              <Image
                fluid={movie.cover.imageFile.childImageSharp.fluid}
                alt={movie.cover.altText}
              />
              <div className="artist-info">
                <p>
                  {movie.title}
                </p>
                <p>{movie.directorS}</p>
                <p>{movie.runningTime} min.</p>
              </div>
            </Artist>
          ))}
        </div>
      </div>
    </Wrapper>
  </Layout>
  )
}

export default IndexPage
 