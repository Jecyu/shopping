<template>
  <div class="cart">
    <div class="cart-header">
      <div class="cart-header-title">购物车清单</div>
      <div class="cart-header-main">
        <div class="cart-info">商品信息</div>
        <div class="cart-price">单价</div>
        <div class="cart-count">数量</div>
        <div class="cart-cost">小计</div>
        <div class="cart-delete">删除</div>
      </div>
    </div>
    <div class="cart-content">
      <div class="cart-content-main" v-for="(item, index) in cartList" :key="item.id">
        <div class="cart-info">
          <img :src="productDictList[item.id].image" :alt="productDictList[item.id].name">
          <span>{{ productDictList[item.id].name }}</span>
        </div>
        <div class="cart-price">
          ¥ {{ productDictList[item.id].cost }}
        </div>
        <div class="cart-count">
          <span class="cart-control-minus" @click="handleCount(index, -1)">-</span>
          <span class="cart-control-add" @click="handleCount(index, 1)">+</span>
        </div>
        <div class="cart-cost">
          ¥ {{ productDictList[item.id].cost * (item.count) }}
        </div>
        <div class="cart-delete">
          <span class="cart-control-delete" @click="handleDelete(index)">删除</span>
        </div>
      </div>
      <div class="cart-empty" v-if="!cartList.length">购物车为空</div>
    </div>
    <div class="cart-promotion" v-show="cartList.length">
      <span>使用优惠码：</span>
      <input type="text" v-model="promotionCode">
      <span class="cart-control-promotion" @click="handleCheckCode">验证</span>
    </div>
    <div class="cart-footer" v-show="cartList.length">
      <div class="cart-footer-desc">
        共计 <span>{{ countAll }}</span>件商品
      </div>
      <div class="cart-footer-desc">
        应付总额 <span>¥ {{ costAll - promotion}}</span>
        <br>
        <template v-if="promotion">
          (优惠 <span>¥ {{ promotion }}</span>)
        </template>
      </div>
      <div class="cart-footer-desc">
        <div class="cart-control-order" @click="handleOrder">现在结算</div>
      </div>
    </div>
  </div>
</template>
<script>
import product_data from "../mock/product.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      productList: product_data,
      promotion: 0,
      promotionCode: ""
    };
  },
  computed: {
    ...mapState("cart", {
      cartList: "cartList"
    }),
    productDictList() {
      const dict = {};
      this.productList.forEach(item => {
        dict[item.id] = item;
      });
      return dict;
    },
    countAll() {
      let count = 0;
      this.cartList.forEach(item => {
        count += item.count;
      });
      return count;
    },
    costAll() {
      let cost = 0;
      this.cartList.forEach(item => {
        cost += this.productDictList[item.id].cost * item.count;
      });
      return cost;
    }
  },
  methods: {
    handleCount(index, count) {
      console.log(count);
      if (count < 0 && this.cartList[index].count === 1) {
        return;
      }
      this.$store.commit("cart/editCartCount", {
        id: this.cartList[index].id,
        count: count
      });
    },
    handleDelete(index) {
      this.$store.commit("cart/deleteCart", this.cartList[index].id);
    },
    // 验证优惠码，使用 vue.js 代表正确的优惠吗
    handleCheckCode() {
      const strategies = {
        vue: unit => {
          return unit * 2;
        }
      };
      const calculateDiscount = (Code, unit) => {
        return strategies[Code](unit);
      };
      if (this.promotionCode === "") {
        window.alert("请输入优惠码");
        return;
      }
      console.log(this.promotionCode);
      strategies[this.promotionCode] === undefined
        ? window.alert("优惠码验证失败")
        : (this.promotion = calculateDiscount(this.promotionCode, 200));
    },
    handleOrder() {
      this.$store.dispatch("cart/buy").then(() => {
        window.alert("购买成功");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cart {
  margin: 32px;
  border: 1px solid hsl(225, 6%, 87%);
  border-radius: 10px;
  background: #fff;

  &-header-title {
    padding: 16px 32px;
    border-bottom: 1px solid hsl(225, 6%, 87%);
    border-radius: 10px 10px 0 0;
    background: hsl(240, 8%, 97%);
  }
  &-header-main {
    overflow: hidden;
    padding: 8px 32px;
    border-bottom: 1px solid hsl(225, 6%, 87%);
    background: hsl(0, 0%, 93%);

    div {
      float: left;
      font-size: 14px;
      text-align: center;
    }
  }
  &-empty {
    padding: 32px;
    text-align: center;
  }
  div.cart-info {
    width: 60%;
    text-align: left;
  }
  &-price {
    width: 10%;
  }
  &-count {
    width: 10%;
  }
  &-cost {
    width: 10%;
  }
  &-delete {
    width: 10%;
  }

  &-content-main {
    overflow: hidden;
    height: 60px;
    padding: 0 32px;
    border-bottom: 1px dashed #e9eaec;

    line-height: 60px;
    text-align: center;

    div {
      float: left;
    }

    img {
      position: relative;
      top: 10px;
      width: 40px;
      height: 40px;
    }
  }

  &-control-minus,
  &-control-add {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 0 4px;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

    line-height: 22px;
    text-align: center;
    background: #f8f8f9;
    cursor: pointer;
  }

  &-control-delete {
    cursor: pointer;
    color: #2d8cf0;
  }

  &-promotion {
    padding: 16px 32px;
  }

  &-control-promotion,
  &-control-order {
    display: inline-block;
    padding: 8px 32px;
    border-radius: 6px;

    background: hsl(211, 87%, 56%);
    color: #fff;
    cursor: pointer;
  }

  &-control-promotion {
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 3px;
  }

  &-footer {
    padding: 32px;
    text-align: right;

    &-desc {
      display: inline-block;
      padding: 0 16px;

      span {
        color: hsl(2, 88%, 56%);
        font-size: 20px;
      }
    }
  }
}
</style>
