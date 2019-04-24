<template>
  <div>
    <div class="main">
      <a-card v-for="(item,index) in card" :key="index" hoverable style="width: 500px;height: 130px;overflow: hidden">
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
    </div>
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
  .main {
    display: flex;
    justify-content: space-between;
  }

  .card-main {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .num {
    font-size: 36px;
    color: #5962ff;
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
