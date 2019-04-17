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

          <!-- <van-cell-group>
            <van-field v-model="capacity"
                       input-align="center"
                       label-align="center "
                       placeholder="请输入容量"
                       right-icon="passed"
                       required
                       @click-right-icon="changeCapacity">
            </van-field>
          </van-cell-group> -->
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

    <router-view />
  </div>

</template>

<script>

export default {
  data () {
    return {
      capacity: 0,
      frequency: 0,
      isEdit: false,
      pdClass: 'pd'
    }
  },
  methods: {
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
      if (this.frequency) {
        localStorage.setItem('frequency', this.frequency)
      }
    },
    initData () {
      this.capacity = localStorage.getItem('capacity') || 0
      this.frequency = localStorage.getItem('frequency') || 0
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
  }
}
</script>

<style>
.pd {
  padding: 20px 0 20px 0;
}
</style>
