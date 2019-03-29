<template>
  <div>
    <div class="main">
       <Card style="width: 500px;height: 130px;">
         <div class="card-main">
           <div>
             <div class="num">2121313次</div>
             <div class="info">浏览网页次数</div>
           </div>
           <div class="shape">
             <img src="../../assets/images/glass.png" alt="">
           </div>
         </div>
       </Card>
       <Card style="width: 500px;height: 130px;">
         <div class="card-main">
           <div>
             <div class="num">2121313次</div>
             <div class="info">查看次数</div>
           </div>
           <div class="shape">
             <img src="../../assets/images/glass.png" alt="">
           </div>
         </div>
       </Card>
       <Card style="width: 500px;height: 130px;">
         <div class="card-main">
           <div>
             <div class="num">2121313次</div>
             <div class="info">联系次数</div>
           </div>
           <div class="shape">
             <img src="../../assets/images/glass.png" alt="">
           </div>
         </div>
       </Card>
     </div>
    <div class="main">
      <Card style="width: 540px;height: 350px;margin-right: 20px">
        <div id="myChart_a" :style="{width: '540px', height: '350px'}"></div>
      </Card>
      <Card style="width: 100%;height: 350px">
        <div id="myChart_b" :style="{width: '100%', height: '350px'}"></div>
      </Card>
    </div>
    <homeTable></homeTable>
  </div>
</template>

<script>
  import homeTable from '../../components/homeTable'

  export default {
    name: "Home",
    components: {homeTable},
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart_a = this.$Echarts.init(document.getElementById('myChart_a'))
        // 绘制图表
        myChart_a.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ]
            }
          ]
        });
      }
    },
    mounted() {
      this.drawLine();
    },
  }
</script>

<style scoped>
  .main {
    display: flex;
    justify-content: space-around;
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
