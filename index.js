const metalsmith = require('metalsmith')
const msIf = require('metalsmith-if')
const ignore = require('metalsmith-ignore')
const inplace = require('metalsmith-in-place')
const markdown = require('metalsmith-markdown')
const watch = require('metalsmith-watch')

const args = process.argv.slice(2)

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
    .use(inplace())
    .use(ignore("**/_dev/*"))
    .use(msIf(
        args[0] === "watch",
        watch({
            paths: {
                "${source}/**/*": "**/*",
                "layouts/**/*": "**/*"
            },
            livereload: args[0] === "watch"
        })
    ))
    .build(err => {
        if (err) throw err
    })