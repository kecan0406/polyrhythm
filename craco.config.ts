import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

type WebpackConfig = { webpackConfig: { resolve: { plugins: TsconfigPathsPlugin[] } } }
export default {
  babel: {
    plugins: [
      [
        '@emotion',
        {
          autoLabel: 'dev-only',
          labelFormat: '[local]',
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }: WebpackConfig) => {
          webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}))
          return webpackConfig
        },
      },
    },
  ],
}
