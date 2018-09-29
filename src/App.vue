<template>
  <div id="app">
    <div class="header">
      <router-link to="/list" class="header-title">花森淘</router-link>
      <div class="header-menu"></div>
      <router-link to="/cart" class="header-menu-cart">
        购物车
        <span v-if="cartList.length"> {{ cartList.length }} </span>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

body {
  background: hsl(240, 8%, 97%);
}

.header {
  height: 48px;
  line-height: 48px;
  background: hsla(0, 0%, 0%, 0.8);
  color: hsl(0, 0%, 100%);

  &-title {
    float: left;
    padding: 0 32px;
    color: hsl(0, 0%, 100%);
  }

  &-menu {
    float: right;
    margin-right: 32px;

    &-cart {
      color: hsl(0, 0%, 100%);
    }
  }

  &-menu-cart span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;

    font-size: 12px;
    line-height: 16px;
    text-align: center;
    background: hsl(20, 100%, 50%);
    color: hsl(0, 0%, 100%);
  }
}
</style>
<script>
export default {
  computed: {
    cartList() {
      return this.$store.state.cartList;
    }
  }
};
</script>
