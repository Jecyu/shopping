import product_data from "@/mock/product";

// 数组去重
const unique = array => {
  return Array.from(new Set(array));
};

const state = {
  // 商品列表数据
  productList: []
};

const getters = {
  brands: state => {
    const brands = state.productList.map(item => item.brand);
    return unique(brands);
  },
  colors: state => {
    const colors = state.productList.map(item => item.color);
    return unique(colors);
  }
};

const mutations = {
  // 添加商品列表
  setProductList(state, data) {
    state.productList = data;
  }
};
const actions = {
  // 请求商品列表
  getProductList(context) {
    // 真实环境通过 Ajax 获取，这里用异步模拟
    setTimeout(() => {
      context.commit("setProductList", product_data);
    }, 500);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
