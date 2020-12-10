export default function graphql() {
  return (context, util) => {
    return util.addLoader(
      Object.assign(
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'graphql-tag/loader',
            },
          ],
        },
        context.match,
      )
    )
  }
}
