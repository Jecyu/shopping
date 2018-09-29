import Vue from "vue";
import Vuex from "vuex";
import product_data from "@/mock/product";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 商品列表数据
    productList: [],
    // 购物车数据
    cartList: []
  },
  mutations: {
    // 添加商品列表
    setProductList(state, data) {
      state.productList = data;
    }
  },
  actions: {
    // 请求商品列表
    getProductList(context) {
      // 真实环境通过 Ajax 获取，这里用异步模拟
      setTimeout(() => {
        context.commit("setProductList", product_data);
      }, 500);
    }
  }
});
