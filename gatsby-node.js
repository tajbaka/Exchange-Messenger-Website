const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    return new Promise(( resolve, reject ) => {
        const pageTemplate = path.resolve('src/other-pages/page/page.tsx');
        resolve(
            graphql(`
                {
                    allContentfulPages(limit: 100){
                        edges {
                            node {
                                id
                                slug
                            }
                        }
                    }
                }
            `).then((result) => {
                if(result.errors){
                    reject(result.errors);
                }
                result.data.allContentfulPages.edges.forEach((edge) => {
                    createPage({
                        path: edge.node.slug,
                        component: pageTemplate,
                        context: {
                            slug: edge.node.slug,
                            type: edge.node.type
                        }
                    })
                })
                return
            })
        )
    });
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === 'build-html') {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /mapbox-gl/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }