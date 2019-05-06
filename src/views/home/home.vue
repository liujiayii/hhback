<template>
  <div>
    <a-row :gutter="16" style="margin: 20px 0">
      <a-col :span="8" v-for="(item,index) in card" :key="index">
        <a-card hoverable style="overflow: hidden">
          <div class="card-main">
            <div>
              <div class="num">{{item.count}}次</div>
              <div class="info">{{item.title}}</div>
            </div>
            <div class="shape">
              <img src="../../assets/images/glass.png" alt="">
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <anTv/>
    <homeTable/>
  </div>
</template>

<script>
  import homeTable from './components/homeTable'
  import anTv from './components/anTv'

  export default {
    name: "Home",
    components: {homeTable, anTv},
    data() {
      return {
        card: [
          {title: '浏览网页次数', count: '2121313'},
          {title: '查看次数', count: '2121313'},
          {title: '联系次数', count: '2121313'}
        ],
        show: false
      }
    },
    mounted() {
    },
  }
</script>

<style scoped>
  .card-main {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .num {
    font-size: 36px;
    color: #4b94ff;
  }

  .info {
    font-size: 16px;
    color: #8d9498;
  }

  .shape {
    width: 50px;
    height: 50px;
  }
</style>
