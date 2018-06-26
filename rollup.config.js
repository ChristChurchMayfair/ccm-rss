// rollup.config.js
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "cjs",
    },
    name: "MyModule",
    plugins: [babel({ exclude: "node_modules/**" }), resolve(), commonjs()],
}
