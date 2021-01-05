// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./../../dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("./../../../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-index-tsx": () => import("./../../../src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-pages-new-lolly-tsx": () => import("./../../../src/pages/newLolly.tsx" /* webpackChunkName: "component---src-pages-new-lolly-tsx" */),
  "component---src-templates-template-tsx": () => import("./../../../src/templates/template.tsx" /* webpackChunkName: "component---src-templates-template-tsx" */)
}

