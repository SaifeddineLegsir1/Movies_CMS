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
} from "../PageStyles/pageStyles"
import { COLORS } from "../constants"


const MoviesPage = () => {
    const {
      wpcontent: {
        page: {
            moviesMeta: { kleineBeschrijving, bannerFoto },
        },
        movies: { edges: movies },
      },
    } = useStaticQuery(graphql`
 query MyQuery {
  wpcontent {
    page(id: "movies", idType: URI) {
      moviesMeta { 
        kleineBeschrijving
        bannerFoto {
          imageFile {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          altText
          sourceUrl
        }
      }
    }
    movies {
        edges {
          node {
            slug
            movie {
              directorS
              releaseDate
              runningTime
              title
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
    `)

return (
    <Layout>
      <SEO title="Movies" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={bannerFoto.imageFile.childImageSharp.fluid}
            alt={bannerFoto.altText}  
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <p>{kleineBeschrijving}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="artists">
          <h2>Our Movies</h2> 
          <div className="artist-items">
            {movies.map(({ node: { movie, slug } }) => (
              <Artist to={`/${slug}`} key={slug}>
                <Image
                  fluid={movie.cover.imageFile.childImageSharp.fluid}
                  alt={movie.cover.altText}
                />
                <div className="artist-info">
                  <p>
                    {movie.title} 
                  </p>
                </div>
              </Artist>
            ))}
          </div>
        </div>
      </Wrapper> 
    </Layout>
  )
}

export default MoviesPage