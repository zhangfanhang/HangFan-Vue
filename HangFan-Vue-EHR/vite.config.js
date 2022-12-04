import {defineConfig} from "vite"
import {createHtmlPlugin} from "vite-plugin-html"
import vue from "@vitejs/plugin-vue"
import {title} from "./src/config/projectConfig.js"
import path from "path"
import {fileURLToPath} from "url"

const __newDirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__newDirname, "src"),
        }
    },
    plugins: [
        vue({reactivityTransform: true}),
        createHtmlPlugin({
            // 压缩Html
            minify: true,
            // 注入index.html
            inject: {
                data: {
                    title
                }
            }
        })
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:6667/",
                changeOrigin: true
            },
        },
    }
})
