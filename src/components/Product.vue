<template>
  <div class="product">
    <router-link :to="'/product/' + info.id" class="product-main">
      <img :src="info.image" :alt="info.name">
      <h4>{{ info.name }}</h4>
      <div class="product-color" :style="{ background: colors[info.color] }">
      </div>
      <div class="product-cost">¥ {{ info.cost }}</div>
      <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  },
  data() {
    return {
      colors: {
        白色: "#ffffff",
        金色: "#dac272",
        蓝色: "#233472",
        红色: "#f2352e"
      }
    };
  },
  methods: {
    handleCart() {
      this.$store.commit("addCart", this.info.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.product {
  float: left;
  width: 25%;

  &-main {
    overflow: hidden;
    position: relative;
    display: block;

    margin: 16px;
    padding: 16px;
    border: 1px solid #dddee1;
    border-radius: 6px;

    background: #fff;
    text-align: center;

    img {
      width: 100%;
    }

    h4 {
      overflow: hidden;
      color: #222;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover h4 {
      color: #0070c9;
    }

    &:hover .product-add-cart {
      display: inline-block;
    }
  }

  &-color {
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid hsl(225, 6%, 87%);
    border-radius: 50%;
    margin: 6px auto;
  }

  &-cost {
    margin-top: 6px;
    color: #de4037;
  }

  &-add-cart {
    position: absolute;
    top: 5px;
    right: 5px;
    display: none;
    padding: 4px 8px;

    font-size: 12px;
    border-radius: 3px;
    cursor: pointer;
    background: hsl(211, 87%, 56%);
    color: hsl(0, 0%, 100%);
  }
}
</style>
