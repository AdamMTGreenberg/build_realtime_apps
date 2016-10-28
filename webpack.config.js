module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                ttest: /\.jsx?$/,         // Match both .js and .jsx files
                loader: "babel",
                exclude: /node_modules/,
                query:
                  {
                    presets:['react']
                  }
            }
        ]
    }
}