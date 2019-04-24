<template>
  <div>
    <a-divider>{{ forumName }}</a-divider>
    <div class="top">
      <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch"/>
    </div>
    <a-table :columns="columns" :dataSource="data"/>
  </div>
</template>

<script>
  export default {
    name: "ForumTable",
    props: {'forumName': String},
    data() {
      return {
        data: [{
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        }, {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        }, {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        }],
        columns: [{
          title: 'Name',
          dataIndex: 'name',
        }, {
          title: 'Age',
          dataIndex: 'age',
        }, {
          title: 'Address',
          dataIndex: 'address',
        }]
      }
    },
    methods: {
      show(index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
      },
      remove(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否删除帖子</p>',
          onOk: () => {
            this.$Message.info('Clicked ok');
            this.data6.splice(index, 1);
          },
          onCancel: () => {
            this.$Message.info('Clicked cancel');
          }
        });
      },
      onSearch(value) {
        console.log(value)
      },
    }
  }
</script>

<style scoped>
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .page-box {
    display: flex;
    justify-content: center;
    margin: 20px auto;
  }
</style>
