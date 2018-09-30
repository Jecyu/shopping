<template>
  <div v-show="list.length">
    <div class="list-control">
      <div class="list-control-order">
        <span>排序：</span>
        <span class="list-control-order-item" :class="{on: order === ''}" @click="handleOrderDefault">默认</span>
        <span class="list-control-order-item" :class="{on: order === 'sales'}" @click="handleOrderSales">销量
          <template v-if="order === 'sales'">⬇</template>
        </span>
        
        <span class="list-control-order-item" :class="{on: order.indexOf('cost') > -1}" @click="handleOrderCost">价格
          <template v-if="order === 'cost-asc'">⬆</template>
          <template v-if="order === 'cost-desc'">⬇</template>
        </span>
      </div>

      <div class="list-control-filter">
        <span>品牌：</span>
        <span v-for="item in brands" :key="item" class="list-control-filter-item" :class="{on: item === filterBrand}" @click="handleFilterBrand(item)">{{ item }}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色：</span>
        <span v-for="item in colors" :key="item.id" class="list-control-filter-item" :class="{on: item === filterColor}" @click="handleFilterColor(item)">{{ item }}</span>
      </div>
    </div>
    <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
    <div class="product-not-found"  v-show="!filteredAndOrderedList.length">暂无相关产品</div>
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
      order: "",
      filterBrand: "",
      filterColor: ""
    };
  },
  methods: {
    handleOrderDefault() {
      this.order = "";
    },
    handleOrderSales() {
      this.order = "sales";
    },
    handleOrderCost() {
      this.order = this.order === "cost-desc" ? "cost-asc" : "cost-desc";
    },
    /**
     * handleFilterBrand() 筛选品牌
     * @param {String} brand 品牌名称
     */
    handleFilterBrand(brand) {
      this.filterBrand === brand
        ? (this.filterBrand = "")
        : (this.filterBrand = brand);
    },
    /*
     * handleFilterColor() 筛选品牌
     * @param {String} color 品牌名称
     */
    handleFilterColor(color) {
      this.filterColor === color
        ? (this.filterColor = "")
        : (this.filterColor = color);
    }
  },
  computed: {
    list() {
      return this.$store.state.product.productList;
    },
    brands() {
      // todo 使用 mapState 来处理多个状态
      return this.$store.getters["product/brands"];
    },
    colors() {
      return this.$store.getters["product/colors"];
    },
    filteredAndOrderedList() {
      // 复制原始数据
      let list = [...this.list];
      // 按品牌过滤
      this.filterBrand !== ""
        ? (list = list.filter(item => item.brand === this.filterBrand))
        : null;

      // 按颜色过滤
      this.filterColor !== ""
        ? (list = list.filter(item => item.color === this.filterColor))
        : null;

      // 排序
      const sortStrategies = {
        sales: () => {
          list = list.sort((a, b) => b.sales - a.sales);
        },
        "cost-desc": () => {
          list = list.sort((a, b) => b.cost - a.cost);
        },
        "cost-asc": () => {
          list = list.sort((a, b) => a.cost - b.cost);
        }
      };
      const sort = () => sortStrategies[this.order]();

      this.order !== "" ? sort() : null;
      return list;
    }
  },
  mounted() {
    // 初始化时，通过 Vuex 的 action 请求数据
    this.$store.dispatch("product/getProductList");
  }
};
</script>
<style lang="scss" scoped>
.product-not-found {
  text-align: center;
  padding: 32px;
}

.list-control {
  margin: 16px;
  padding: 16px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 1px rgba($color: #000000, $alpha: 0.2);

  &-filter {
    margin-bottom: 16px;
  }

  &-filter-item,
  &-order-item {
    display: inline-block;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
    cursor: pointer;

    &.on {
      border: 1px solid #f2352e;
      background: hsl(2, 88%, 56%);
      color: hsl(0, 0%, 100%);
    }
  }
}
</style>
