<template>
  <div>
    <van-row :class="pdClass">
      <van-col span="10">容量:</van-col>
      <van-col span="14">
        <div v-if="isEdit">
          <van-row>
            <van-col span="">
              <van-stepper v-model="capacity"
                           step="50"
                           integer
                           input-width="40px"
                           min="0"
                           max="3000" />
            </van-col>
            <van-col>
              <van-icon name="passed"
                        style="line-height:30px;margin-left:10px"
                        @click="changeCapacity" />
            </van-col>
          </van-row>
        </div>
        <div v-else>
          {{capacity}}
          <van-icon name="edit"
                    @click="changeCapacity" />
        </div>

      </van-col>
    </van-row>

    <van-row :class="pdClass">
      <van-col span="10">杯数: </van-col>
      <van-col span="14">
        {{frequency==0 ? "" : frequency}}
      </van-col>
    </van-row>

    <van-row :class="pdClass">
      <van-col span="10">总量: </van-col>
      <van-col span="14">
        {{total == 0 ? "今天还没喝水哟" : total}}
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24"
               size="large">
        <van-button type="info"
                    size="large"
                    @click="editFrequency('add')">加一杯</van-button>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-button type="warning"
                    size="large"
                    @click="editFrequency('minus')">减一杯</van-button>
      </van-col>
    </van-row>
    <van-row>
      <van-col v-if="isShowClear"
               span="24">
        <van-button type="danger"
                    size="large"
                    @click="clearCache()">重置数据</van-button>
      </van-col>
    </van-row>

    <van-list @load="onLoad">
      <van-cell v-for="(item,index) in list"
                :key="index">
        <van-row>
          <van-col span="2">{{item.sort}}</van-col>
          <van-col span="5">{{item.capacity}}</van-col>
          <van-col span="3">{{item.frequency}}</van-col>
          <van-col span="12">{{item.date}}</van-col>
          <van-col span="2">{{item.type==="add"?"增":"减"}}</van-col>
        </van-row>
      </van-cell>
    </van-list>

    <router-view />
  </div>

</template>

<script>

export default {
  data () {
    return {
      capacity: 0, // 容量
      frequency: 0, // 频率
      isEdit: false, //
      pdClass: 'pd', // padding-20
      list: [], // 数据列表
      sort: 1, // 序号
      date: '',
      isShowClear: false
    }
  },
  methods: {
    clearCache () {
      this.frequency = 0
      this.list = []
      this.isShowClear = false

      localStorage.removeItem('frequency')
      localStorage.removeItem('list')

      let nowDate = this.formatDate(Date.now(), 'yyyy-MM-dd')
      this.date = nowDate
      localStorage.setItem('date', nowDate)
    },
    onLoad () {
      this.list = JSON.parse(localStorage.getItem('list')) || []
    },
    changeCapacity () {
      if (this.isEdit) {
        localStorage.setItem('capacity', this.capacity)
      }
      this.isEdit = !this.isEdit
    },
    editFrequency (operate) {
      if (this.capacity === 0) {
        this.$toast('请先设置容量。')
        return
      }
      if (operate === 'add') {
        this.frequency++
      } else {
        this.frequency && this.frequency--
      }
      if (this.frequency >= 0) {
        localStorage.setItem('frequency', this.frequency)

        this.list.unshift({ capacity: this.capacity, frequency: this.frequency, date: this.formatDate(), sort: this.sort++, type: operate })
        localStorage.setItem('list', JSON.stringify(this.list))
      }
    },
    formatDate (idate = Date.now(), fmt = 'yyyy-MM-dd hh:mm:ss') {
      let date = new Date(idate)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }

      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
        }
      }
      return fmt
    }
  },
  components: {
  },
  created: function () {
    // this.capacity = localStorage.getItem('capacity') || 0
    // this.frequency = localStorage.getItem('frequency') || 0
  },
  computed: {
    total () {
      return this.capacity * this.frequency
    }
  },
  mounted: function () {
    this.capacity = localStorage.getItem('capacity') || 0
    this.frequency = localStorage.getItem('frequency') || 0
    this.date = localStorage.getItem('date')
    // 如果缓存和本地都没值，说明第一次进入，写缓存
    if (!this.date) {
      let nowDate = this.formatDate(Date.now(), 'yyyy-MM-dd')
      this.date = nowDate
      localStorage.setItem('date', nowDate)
    } else {
      // 比较日期，如果当前日期比缓存日期大，则显示清楚按钮
      if (new Date(this.formatDate(Date.now(), 'yyyy-MM-dd')) > new Date(this.date)) {
        this.isShowClear = true
      }
    }
  }
}
</script>

<style>
.pd {
  padding: 20px 0 20px 0;
}
</style>
