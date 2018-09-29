<template>
  <div v-show="list.length">
    <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
    <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关产品</div>
  </div>
</template>

<script>
// @ is an alias to /src
// 导入商品简介组件
import Product from "@/components/Product.vue";

export default {
  name: "home",
  components: {
    Product
  },
  data() {
    return {
      // 排序依据，可选值为：
      // sales (销量)
      // cost-desc (价格降序)
      // cost-asc (价格升序)
      order: ""
    };
  },
  computed: {
    list() {
      return this.$store.state.productList;
    },
    filteredAndOrderedList() {
      // 复制原始数据
      let list = [...this.list];
      // todo
      return list;
    }
  },
  mounted() {
    // 初始化时，通过 Vuex 的 action 请求数据
    this.$store.dispatch("getProductList");
  }
};
</script>
