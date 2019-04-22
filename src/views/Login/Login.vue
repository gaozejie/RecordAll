<template>
  <div>
    <div v-if="isReg">
      <van-cell-group>
        <van-field v-model="userName"
                   label="用户名"
                   placeholder="请输入用户名"
                   required
                   clearable />

        <van-field v-model="password"
                   type="password"
                   label="密码"
                   placeholder="请输入密码"
                   clearable
                   required />
        <van-field v-model="confirmPassword"
                   type="password"
                   label="确认密码密码"
                   placeholder="请再次输入密码"
                   clearable
                   required />
      </van-cell-group>

      <van-button @click="doRegister()"
                  type="default">注册</van-button>
      <van-button @click="changeIsReg()"
                  type="default">取消</van-button>
    </div>
    <div v-else>
      <van-cell-group>
        <van-field v-model="userName"
                   label="用户名"
                   placeholder="请输入用户名"
                   required
                   clearable />

        <van-field v-model="password"
                   type="password"
                   label="密码"
                   placeholder="请输入密码"
                   clearable
                   required />
      </van-cell-group>

      <van-button @click="doLogin"
                  size="large"
                  type="default">登录</van-button>
      <a href="javascript:;"
         @click="changeIsReg()">还没有账号？</a>
    </div>
  </div>
</template>

<script>
import { cacheHelper } from '../../../common/Utils.js'
export default {
  data () {
    return {
      userName: '',
      password: '',
      confirmPassword: '',
      isReg: false
    }
  },
  methods: {
    changeIsReg () {
      this.isReg = !this.isReg
    },
    doRegister () {
      if (this.userName && this.password && this.confirmPassword) {
        if (this.password !== this.confirmPassword) {
          this.$toast('两次密码不一致。')
          return
        }
        this.$axios.post('/api/SysUser', { UserName: this.userName, Password: this.password })
          .then((response) => {
            console.log(response)
            if (response.data) {
              this.password = ''
              this.confirmPassword = ''
              this.changeIsReg()
            } else {
              this.$toast('注册失败，请重试。')
            }
          })
          .catch((response) => {
            this.$toast('注册出错，请重试。')
            console.log(response)
          })
      } else {
        this.$toast('请填写用户名、密码。')
      }
    },
    validLogin () {
      if (cacheHelper.getLocalStorage('user')) {
        this.$router.push({ name: 'menu' })
      }
    },
    doLogin () {
      if (this.userName && this.password) {
        this.$axios.get('/api/SysUser', { params: { userName: this.userName, password: this.password } })
          .then((response) => {
            console.log(response)
            if (response.data) {
              cacheHelper.setLocalStorage('userIdA', response.data.id)
              cacheHelper.setLocalStorage('user', response.data)
              this.$router.push({ name: 'menu' })
            } else {
              this.$toast('用户名或密码错误。')
            }
          })
          .catch((response) => { console.log(response) })
      } else {
        this.$toast('请填写用户名、密码。')
      }
    }
  },
  components: {

  },
  created () {
    this.validLogin()
  },
  mounted () {

  }
}

</script>

<style>
</style>
