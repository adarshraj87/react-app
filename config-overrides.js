const { override, fixBabelImports, addLessLoader, addBabelPlugins } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A'
        },
    }),
    addBabelPlugins(
        [
            "module-resolver",
            {
                "root": [
                    "./src"
                ],
                "alias": {
                    "auth": "./src/modules/auth/index.js",
                    "utils": "./src/utils/index.js"
                }
            }
        ]
    )
);