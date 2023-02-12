import type { GatsbyConfig } from "gatsby";

const prodPlugins =
  process.env.NODE_ENV === "production" ? [`gatsby-plugin-preact`] : [];

const config: GatsbyConfig = {
  siteMetadata: {
    title: `my-lead-generator`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    // ...prodPlugins,
  ],
};

export default config;
