const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    {
        lolly {
            listVlolly {
              message
              id
              bottom
              middle
              receiver
              sender
              top
            }
          }
    }
  `)

  data.lolly.listVlolly.forEach(node => {
    createPage({
      path: `${node.id}`,
      component: path.resolve("./src/templates/template.tsx"),
      context: {
        top: node.top,
        middle: node.middle,
        bottom: node.bottom,
        id: node.id,
        message: node.message,
        sender: node.sender,
        receiver: node.receiver,
      },
    })
  })
}