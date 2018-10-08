import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "list",
      meta: {
        title: "商品列表"
      },
      component: () =>
        import(/* webpackChunkName: "list" */ "../views/List.vue")
    },
    {
      path: "/list",
      name: "list",
      meta: {
        title: "商品列表"
      },
      component: () =>
        import(/* webpackChunkName: "list" */ "../views/List.vue")
    },
    {
      path: "/product/:id",
      name: "product",
      meta: {
        title: "商品详情"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Product.vue")
    },
    {
      path: "/cart",
      name: "cart",
      meta: {
        title: "购物车"
      },
      component: () =>
        import(/* webpackChunkName: "cart" */ "../views/Cart.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  console.log(to);
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
