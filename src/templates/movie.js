  
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/movieStyles"

const ArtistTemplate = ({
    data: {
      wpcontent: {
        movie: {
          movie,
          genres: { edges: genres },
        },
      },
    },
  }) => {
    
  
    return (
      <Layout>
        <SEO title="Artist" />
        <Wrapper>
          <div className="artist-container">
            <div className="artist-image">
              <Image
                fluid={movie.cover.imageFile.childImageSharp.fluid}
                alt={movie.cover.altText}
              />
              <div className="roles">
                {genres.map(({ node: genre }) => (
                  <div key={genre.name} className="role">
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="artist-info">
              <h2>
                {movie.title}
              </h2>
              <p className="description">{movie.description}</p>

            </div>
          </div>
        </Wrapper>
      </Layout>
    )
  }
  
  export default ArtistTemplate




export const pageQuery = graphql`
query ($id: ID!) {
    wpcontent {
      movie(id: $id, idType: ID) {
        movie {
          description
          directorS
          releaseDate
          runningTime
          title
          cover {
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
        }
        genres {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }`