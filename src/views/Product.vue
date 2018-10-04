<template>
  <div v-if="product">
    <div class="product">
      <div class="product-image">
        <img :src="product.image" :alt="product.name">
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <div class="product-cost">¥ {{ product.cost }}</div>
        <div class="product-add-cart" @click="handleAddToCart">加入购物车</div>
      </div>
    </div>
    <div class="product-desc">
      <h2>产品介绍</h2>
      <img v-for="n in 10" :key="n" :src="'http://ordfm6aah.bkt.clouddn.com/shop/' + n + '.jpeg'" alt="">
    </div>
  </div>
  <!-- <div>Product{{ $route.params.id }}</div> -->
</template>
<script>
// 导入本地数据做匹配用，真实场景并不需要
import product_data from "../mock/product.js";
export default {
  data() {
    return {
      // 获取路由中的参数
      id: parseInt(this.$route.params.id),
      product: null
    };
  },
  methods: {
    getProduct() {
      // 真实环境通过 Ajax 获取，这里用异步模拟
      setTimeout(() => {
        this.product = product_data.find(item => item.id === this.id);
      }, 500);
    },
    handleAddToCart() {
      // 加入购物车
      this.$store.commit("cart/addCart", this.id);
    }
  },
  mounted() {
    // 初始化时，请求数据
    this.getProduct();
  }
};
</script>
<style lang="scss" scoped>
.product {
  overflow: hidden;
  margin: 32px;
  padding: 32px;
  border: 1px solid hsl(225, 6%, 87%);
  border-radius: 10px;
  background: #fff;

  &-image {
    float: left;
    width: 50%;
    height: 550px;
    text-align: center;

    img {
      height: 100%;
    }
  }

  &-info {
    float: left;
    width: 50%;
    height: 150px;
    padding: 150px 0 250px;
    text-align: center;
  }

  &-cost {
    margin: 8px 0;
    color: #f2352e;
  }

  &-add-cart {
    display: inline-block;
    margin: 8px 0;
    padding: 8px 64px;
    border-radius: 4px;

    background: hsl(211, 87%, 56%);
    color: hsl(0, 0%, 100%);
    cursor: pointer;
  }

  &-desc {
    padding: 32px;
    margin: 32px;
    border: 1px solid hsl(225, 6%, 87%);
    border-radius: 10px;
    text-align: center;
    background: hsl(0, 0%, 100%);

    img {
      display: block;
      width: 50%;
      margin: 32px auto;
      padding: 32px;
      border-bottom: 1px solid hsl(225, 6%, 87%);
    }
  }
}
</style>
