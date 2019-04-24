<template>
  <div style="display: flex;justify-content: space-between;margin: 20px 0">
    <a-card hoverable style="width: 49%">
      <div id="c1"></div>
    </a-card>
    <a-card hoverable style="width: 50%">
      <div id="c2"></div>
    </a-card>
  </div>
</template>

<script>
  import G2 from '@antv/g2';

  export default {
    name: "anTv",
    methods: {
      charts() {
        const data = [{item: '事例一', count: 40, percent: 0.4},
          {item: '事例二', count: 21, percent: 0.21},
          {item: '事例三', count: 17, percent: 0.17},
          {item: '事例四', count: 13, percent: 0.13},
          {item: '事例五', count: 9, percent: 0.09}]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
// Step 1: 创建 Chart 对象
        const chart = new G2.Chart({
          container: 'c1', // 指定图表容器 ID
          forceFit: true,
          width: 600, // 指定图表宽度
          height: 300 // 指定图表高度
        });
// Step 2: 载入数据源
        chart.source(data, {
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
// Step 4: 渲染图表
        chart.render();
      },
      charts2() {
        const data = [{year: '1951 年', sales: 38},
          {year: '1952 年', sales: 52},
          {year: '1956 年', sales: 61},
          {year: '1957 年', sales: 145},
          {year: '1958 年', sales: 48},
          {year: '1959 年', sales: 38},
          {year: '1960 年', sales: 38},
          {year: '1962 年', sales: 38}];
        const chart = new G2.Chart({
          container: 'c2',
          forceFit: true,
          width: 600, // 指定图表宽度
          height: 300 // 指定图表高度
        });
        chart.source(data);
        chart.scale('sales', {
          tickInterval: 20
        });
        chart.interval().position('year*sales');
        chart.render();
      }
    },
    mounted() {
      this.charts()
      this.charts2()
    }
  }
</script>

<style scoped>

</style>
