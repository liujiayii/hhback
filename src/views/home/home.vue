<template>
  <div>
    <div class="main">
      <Card style="width: 500px;height: 130px;">
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
      <Card style="width: 500px;height: 130px;">
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
      <Card style="width: 500px;height: 130px;">
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
    <div class="main">
      <Card style="width: 540px;height: 350px;margin-right: 20px">
        <chart
          :options="option"
          style="width: 540px;height: 350px"
        />
      </Card>
      <Card style="width: 100%;height: 350px">
        <chart
          :options="option2"
          style="width: 100%;height: 350px"
        />
      </Card>
    </div>
    <homeTable />
  </div>
</template>

<script>
  import homeTable from './components/homeTable'

  export default {
    name: "Home",
    components: {homeTable},
    data() {
      return {
        option: {
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
        },
        option2: {
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015'],
              ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
              ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
              ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
            ]
          },
          xAxis: [
            {type: 'category', gridIndex: 0},
            {type: 'category', gridIndex: 1}
          ],
          yAxis: [
            {gridIndex: 0},
            {gridIndex: 1}
          ],
          grid: [
            {bottom: '55%'},
            {top: '55%'}
          ],
          series: [
            // These series are in the first grid.
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            // These series are in the second grid.
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
          ]
        }
      }
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
