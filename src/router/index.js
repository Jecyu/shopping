import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/list",
      name: "商品列表",
      component: () =>
        import(/* webpackChunkName: "list" */ "../views/List.vue")
    },
    {
      path: "/product/:id",
      name: "商品详情",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Product.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  console.log(to);
  next();
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router;
