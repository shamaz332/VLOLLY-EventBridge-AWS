const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/home/shamaz/web root/2020 bootcamp/projects after 13/13C/client/src/pages/404.js"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/home/shamaz/web root/2020 bootcamp/projects after 13/13C/client/src/pages/index.tsx"))),
  "component---src-pages-new-lolly-tsx": hot(preferDefault(require("/home/shamaz/web root/2020 bootcamp/projects after 13/13C/client/src/pages/newLolly.tsx"))),
  "component---src-templates-template-tsx": hot(preferDefault(require("/home/shamaz/web root/2020 bootcamp/projects after 13/13C/client/src/templates/template.tsx")))
}

