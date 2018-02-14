const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const static = require("koa-static");
const views = require("koa-views");

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
    ctx.state = {};
    return ctx.render("../public/index");
});

app.use(
    views(path.resolve(__dirname, "../public"), {
        map: {
            html: "underscore"
        }
    })
);

app.use(static(path.resolve(__dirname, "../public")));

app.use(router.routes()).use(router.allowedMethods());

app.listen(9001);

console.log("server listening on port 9001");
