/* eslint-env node */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    let mode = "production";
    if (argv && argv.mode) {
        mode = argv.mode;
    }

    console.log(`Building ${mode}...`);

    return {
        mode,
        entry: path.resolve(__dirname, "js/ruffle.js"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "ruffle.js",
            publicPath: "",
            chunkFilename: "core.ruffle.[contenthash].js",
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.wasm$/i,
                    use: ["file-loader"],
                },
            ],
        },
        devtool: "source-map",
        plugins: [
            new CopyPlugin({
                patterns: [{ from: "LICENSE*" }, { from: "README.md" }],
            }),
        ],
    };
};
