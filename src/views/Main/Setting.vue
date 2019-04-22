<template>
  <div>

    <van-cell-group>
      <van-cell icon="records"
                title="退出登录"
                @click="logout" />
    </van-cell-group>

    <van-actionsheet v-model="show"
                     :actions="actions"
                     @select="onSelect"
                     cancel-text="取消" />

    <!-- <van-cell-group>
      <van-cell icon="points"
                title="我的积分"
                is-link />
      <van-cell icon="gold-coin-o"
                title="我的优惠券"
                is-link />
      <van-cell icon="gift-o"
                title="我收到的礼物"
                is-link />
    </van-cell-group> -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      actions: [
        {
          name: '确定'
        }
      ]
    }
  },
  methods: {
    onSelect (item, index) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      if (index === 0) {
        localStorage.clear()
        this.$router.push({ name: 'login' })
      }
    },
    logout () {
      this.show = true
    }
  },
  components: {

  }
}
</script>

<style>
</style>
