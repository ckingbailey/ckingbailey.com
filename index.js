const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')

metalsmith(__dirname)
    .metadata({
        title: "ckb - front-end super genius",
        siteUrl: "http://ckingbailey.com",
        author: "Colin King-Bailey",
        description: "Colin King-Bailey's portfolio and resume",
        keywords: "ckb web-developer portfolio resume javascript css html react expressjs nodejs mern-stack php mysql lamp-stack",
        generatorname: "Metalsmith",
        generatorurl: "http://metalsmith.io/"
    })
    .source('./src')
    .destination('./public')
    .clean(false)
    .use(markdown())
    .use(layouts())
    .build(err => {
        if (err) throw err
    })