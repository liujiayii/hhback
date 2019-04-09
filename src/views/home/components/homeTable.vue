<template>
  <div>
    <Table border :columns="columns" :data="tableData.data"></Table>
    <div class="page-box">
      <Page :total="tableData.count" @on-change="pageChange" size="small" show-elevator show-total/>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../../plugins/utils";

  export default {
    name: "homeTable",
    data() {
      return {
        columns: [
          {
            title: "姓名",
            key: "name"
          },
          {
            title: "地址",
            key: "address"
          },
          {
            title: "联系方式",
            key: "phone"
          },
          {
            title: "地址",
            key: "address"
          },
          {
            title: "邮箱",
            key: "emaill"
          },
          {
            title: "留言内容",
            key: "content"
          },
          {
            title: "创建时间",
            key: "create_time",
            render: (h, params) => {
              return h(
                "div",
                formatDate(new Date(params.row.create_time), "yyyy-MM-dd")
              );
            }
          }
        ],
        tableData: {
          data: [],
          count: 0
        }
      };
    },
    methods: {
      pageChange(page) {
        this.currPage = page
        this.$ajax({
          method: "post",
          url: "listAllOpinion",
          data: {page, limit: 10}
        }).then(res => {
          if (res.data.code === 1) {
            this.tableData = res.data;
          } else {
            this.$Notice.error({
              title: res.data.msg
            });
          }
        }).catch(res => {
          this.$Notice.error({
            title: res.data.msg
          });
        });
      }
    },
    mounted() {
      this.pageChange(1);
    }
  };
</script>

<style scoped>

</style>
