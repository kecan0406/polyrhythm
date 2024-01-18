const CracoAlias = require('craco-alias')

module.exports = {
  babel: {
    plugins: [
      [
        '@emotion',
        {
          autoLabel: 'dev-only',
          labelFormat: 'emotion-[local]',
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
}
