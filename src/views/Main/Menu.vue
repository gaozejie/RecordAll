<template>
  <div>

    <van-row>
      <van-col span="6"
               class="van-hairline--surround row-2"
               v-for="(item,index) in menu"
               :key='index'>

        <router-link :to="item.route">
          <img :src="item.icon"
               style="width:30px;height:30px" />
          <span>{{item.name}}</span>

        </router-link>
      </van-col>

    </van-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          name: '喝水',
          route: { name: 'drink' },
          icon: require('../../assets/images/drink.png')
        },
        {
          name: '喝水',
          route: { name: 'drink' },
          icon: require('../../assets/images/drink.png')
        },
        {
          name: '喝水',
          route: { name: 'drink' },
          icon: require('../../assets/images/drink.png')
        },
        {
          name: '喝水',
          route: { name: 'drink' },
          icon: require('../../assets/images/drink.png')
        },
        {
          name: '喝水',
          route: { name: 'drink' },
          icon: require('../../assets/images/drink.png')
        },
        {
          name: '喝水',
          route: { name: 'drink' },
          icon: require('../../assets/images/drink.png')
        }
      ]

    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style  lang="scss">
.row-2 {
  height: 70px;
  text-align: center;
  padding: 10px;

  span {
    display: block;
    color: #555;
    font-size: 12px;
  }
}
</style>
