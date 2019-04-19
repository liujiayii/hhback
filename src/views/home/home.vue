<template>
  <div>
    <div class="main">
      <Card style="width: 500px;height: 130px;overflow: hidden;">
        <div class="card-main">
          <div>
            <div class="num">
              2121313次
            </div>
            <div class="info">
              浏览网页次数
            </div>
          </div>
          <div class="shape">
            <img
                    src="../../assets/images/glass.png"
                    alt=""
            >
          </div>
        </div>
      </Card>
      <Card style="width: 500px;height: 130px;overflow: hidden;">
        <div class="card-main">
          <div>
            <div class="num">
              2121313次
            </div>
            <div class="info">
              查看次数
            </div>
          </div>
          <div class="shape">
            <img
                    src="../../assets/images/glass.png"
                    alt=""
            >
          </div>
        </div>
      </Card>
      <Card style="width: 500px;height: 130px;overflow: hidden;">
        <div class="card-main">
          <div>
            <div class="num">
              2121313次
            </div>
            <div class="info">
              联系次数
            </div>
          </div>
          <div class="shape">
            <img
                    src="../../assets/images/glass.png"
                    alt=""
            >
          </div>
        </div>
      </Card>
    </div>
    <homeTable/>
  </div>
</template>

<script>
  import homeTable from './components/homeTable'

  export default {
    name: "Home",
    components: {homeTable},
    data() {
      return {}
    },
    methods: {},
    mounted() {
    },
  }
</script>

<style scoped>
  .main {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
