module.exports = {
    configureWebpack:{
        module:{
            rules:[
            {
              test:/\.(woff2?|eot|ttf|otf)(\?.*)$/,
              loader:'url-loader',
              options:{
                limit: 10000,
                name: utils.assetsPath('fonrs/[name].[hash:7].[ext]')
              }
            }
          ]
        }, 
    }
}