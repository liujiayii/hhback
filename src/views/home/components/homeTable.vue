<template>
  <div>
    <a-table :columns="columns"
             :rowKey="record => record.id"
             :dataSource="data"
             :pagination="pagination"
             :loading="loading"
             @change="handleTableChange"
             bordered
    >
    </a-table>
  </div>
</template>

<script>
  import {formatDate} from "../../../config/utils";

  export default {
    name: "homeTable",
    data() {
      return {
        columns: [
          {
            title: "姓名",
            dataIndex: "name"
          },
          {
            title: "地址",
            dataIndex: "address"
          },
          {
            title: "联系方式",
            dataIndex: "phone"
          },
          {
            title: "邮箱",
            dataIndex: "emaill"
          },
          {
            title: "留言内容",
            dataIndex: "content"
          },
          {
            title: "创建时间",
            dataIndex: "create_time",
            customRender: (text, record, index) => {
              return formatDate(new Date(text), "yyyy-MM-dd")
            }
          }
        ],
        data: [],
        pagination: {},
        loading: false
      };
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {
        const pager = {...this.pagination};
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          limit: pagination.pageSize,
          page: pagination.current,
          ...filters,
        });
      },
      fetch(params = {}) {
        this.loading = true
        this.$ajax({
          method: "post",
          url: "listAllOpinion",
          data: {
            ...params,
          }
        }).then((res) => {
          const pagination = {...this.pagination};
          pagination.total = res.data.count;
          this.loading = false;
          this.data = res.data.data;
          this.pagination = pagination;
        });
      }
    },
    mounted() {
      this.fetch({page: 1, limit: 10,})
    }
  };
</script>

<style scoped>

</style>
