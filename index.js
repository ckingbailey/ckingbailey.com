const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const static = require('metalsmith-static')
const ignore = require('metalsmith-ignore')

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
    .clean(true)
    .use(markdown())
    .use(layouts())
    .use(ignore("**/_dev/*"))
    .build(err => {
        if (err) throw err
    })