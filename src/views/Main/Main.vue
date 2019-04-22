<template>
  <div>

    <van-tabbar v-model="activeIndex">

      <van-tabbar-item icon="home-o"
                       :to="{name:'menu'}">
        主页
      </van-tabbar-item>

      <van-tabbar-item icon="setting-o"
                       :to="{name:'setting'}">
        设置
      </van-tabbar-item>

    </van-tabbar>

    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    // this.$router.push({ name: 'drink', params: { key: '张三' } })
  },
  components: {

  }
}
</script>
