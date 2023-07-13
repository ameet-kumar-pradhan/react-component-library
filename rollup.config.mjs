import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import packageJson from "./package.json" assert { type: "json" };

export default [
    {
        input: "src/index.ts",
        output: {
            file: packageJson.module,
            format: "esm",
            sourcemap: true,
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            babel({
                babelHelpers: "bundled",
                exclude: "node_modules/**",
            }),
            typescript({ tsconfig: "./tsconfig.json", sourceMap: false }),
            terser(), //Minify the output file

        ],
        external: ["react"],
    },
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.d.ts",
                format: "es",
            },
        ],
        plugins: [dts()],
    },
];
