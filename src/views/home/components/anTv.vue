<template>
  <a-row :gutter="16" style="margin: 20px 0">
    <a-col :span="10">
      <a-card hoverable>
        <div id="c1"></div>
      </a-card>
    </a-col>
    <a-col :span="14">
      <a-card hoverable>
        <div id="c2"></div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
  import G2 from '@antv/g2';

  export default {
    name: "anTv",
    data() {
      const barData = [{item: '事例一', count: 40, percent: 0.4},
        {item: '事例二', count: 21, percent: 0.21},
        {item: '事例三', count: 17, percent: 0.17},
        {item: '事例四', count: 13, percent: 0.13},
        {item: '事例五', count: 9, percent: 0.09}]
      const pieData = [{year: '1951 年', sales: 38},
        {year: '1952 年', sales: 52},
        {year: '1956 年', sales: 61},
        {year: '1957 年', sales: 145},
        {year: '1958 年', sales: 48},
        {year: '1959 年', sales: 38},
        {year: '1960 年', sales: 38},
        {year: '1962 年', sales: 38}];
      return {
        barData,
        pieData
      }
    },
    methods: {
      charts() {
        const chart = new G2.Chart({// Step 1: 创建 Chart 对象
          container: 'c1', // 指定图表容器 ID
          forceFit: true,
          height: 300 // 指定图表高度
        });
        chart.source(this.barData, { // Step 2: 载入数据源
          percent: {
            formatter: function formatter(val) {
              val = val * 100 + '%';
              return val;
            }
          }
        });
        chart.coord('theta', {
          radius: 0.75
        });
        chart.tooltip({
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        });
        chart.intervalStack().position('percent').color('item').label('percent', {
          formatter: function formatter(val, item) {
            return item.point.item + ': ' + val;
          }
        }).tooltip('item*percent', function (item, percent) {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        }).style({
          lineWidth: 1,
          stroke: '#fff'
        });
        chart.render();// Step 4: 渲染图表
        this.$nextTick(()=>{
          chart.forceFit(); // 手动调用自适应函数
        })
      },
      charts2() {
        const chart = new G2.Chart({
          container: 'c2',
          forceFit: true,
          height: 300, // 指定图表高度
        });
        chart.source(this.pieData);
        chart.scale('sales', {
          tickInterval: 20
        });
        chart.interval().position('year*sales');
        chart.render();// Step 4: 渲染图表
        this.$nextTick(()=>{
          chart.forceFit(); // 手动调用自适应函数
        })
      }
    },
    mounted() {
      this.charts()
      this.charts2()
    }
  }
</script>
