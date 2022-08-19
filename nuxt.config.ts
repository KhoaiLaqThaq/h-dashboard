export default {
  ssr: false,
  head: {
    title: "H-Dashboard",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "http://fonts.googleapis.com/css?family=Roboto",
      },
    ],
    script: [],
  },
  css: ["@/assets/scss/custom.scss"],
  plugins: [{ src: "~/plugins/editor-vue.js" }],
  components: true,
  buildModules: [],
  modules: [],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
