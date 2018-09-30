import Vue from "vue";
import Vuex from "vuex";
import cart from "./modules/cart";
import product from "./modules/product";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    product,
    cart
  },
  strict: debug
});
