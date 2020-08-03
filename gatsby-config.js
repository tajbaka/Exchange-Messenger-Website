const dotenv = require('dotenv');

if(process.env.NODE_ENV !== 'production'){
  dotenv.config();
}

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.exchangemessenger.com`,
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `transparent`,
        theme_color: `transparent`,
        display: `minimal-ui`,
        icon: 'src/images/icon-white.png'
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'w6mtslgh21b3',
        accessToken: 'FQxrrP-TqWyzCVAAXp0EVQ5IhuAZI2E5JiTzvCum6eo'
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
          trackingId: "UA-163870647-1"
      }
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: "1772094",
        sv:  "6"
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '2382313485393647'
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.exchangemessenger.com',
        sitemap: 'https://www.exchangemessenger.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    }
  ]
}
