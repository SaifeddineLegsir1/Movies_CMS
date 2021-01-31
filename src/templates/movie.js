  
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
        <SEO title="Movie" />
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
              <p className="details"> Director: {movie.directorS}</p>
              <p className="details">Releasedate: {movie.releaseDate}</p>
              <p className="details">Duration: {movie.runningTime} min</p>

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
                fluid(quality: 40) {
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