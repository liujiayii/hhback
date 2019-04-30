<template>
  <div>
    <div class="top">
      <div></div>
      <a-button type="primary" shape="circle" icon="plus" @click="drawerShow=true">添加</a-button>
    </div>
    <a-table :columns="columns"
             :rowKey="record => record.id"
             :dataSource="tableData"
             :pagination="pagination"
             :loading="loading"
             @change="handleTableChange"
             bordered
    >
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" size="small" @click="showDrawer(record)" style="margin-right: 6px">查看</a-button>
        <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer
            title="版本控制"
            :width="720"
            @close="()=> drawerShow = false"
            :visible="drawerShow"
            wrapClassName="drawer-cont"
            destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="版本">
          <a-select v-decorator="['app_type']">
            <a-select-option value="0">安卓</a-select-option>
            <a-select-option value="1">IOS</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="版本号">
          <a-input v-decorator="['app_version']"/>
        </a-form-item>
        <a-form-item label="软件名称">
          <a-input v-decorator="['app_name']"/>
        </a-form-item>
        <a-form-item>
          <a-upload action="" :beforeUpload="handleChange" :showUploadList="false">
            <a-button>
              <a-icon type="upload"/>
              安卓版本请上传安装包
            </a-button>
          </a-upload>
          <p v-if="file!=null">{{file.name}}</p>
        </a-form-item>
        <div class="drawer-footer">
          <a-button :style="{marginRight: '8px'}" @click="()=> drawerShow = false">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>

  export default {
    name: "version",
    data() {
      return {
        columns: [
          {
            title: "安装包类型", dataIndex: "app_type",
            customRender: (text, record, index) => {
              return text === '0' ? '安卓版本' : 'IOS版本'
            }
          },
          {title: "名称", dataIndex: "app_name"},
          {title: "内部版本号", dataIndex: "app_cood"},
          {title: "路径", dataIndex: "app_url", width: '50%'},
          {title: "版本", dataIndex: "app_version"},
        ],
        tableData: [],
        pagination: {},
        loading: false,
        drawerShow: false,
        form: this.$form.createForm(this),
        file: null
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            let newForm = new FormData()
            if (values.app_type == 0) {
              newForm.append('pic', this.file)
            }
            newForm.append('app_version', values.app_version)
            newForm.append('app_name', values.app_name)
            newForm.append('app_type', values.app_type)
            newForm.append('app_cood', 1)
            this.$ajax_({
              url: 't_app/inserttapp',
              data: newForm
            }).then(res => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
                this.fetch(this.pagination)
                this.drawerShow = false;
              } else {
                this.$message.error(res.data.msg)
              }
            })
          }
        });
      },
      showDrawer(row) {
        this.drawerShow = true;
        setTimeout(() => {
          this.form.setFieldsValue(row)
        }, 500)
      },
      handleTableChange(pagination, filters, sorter) {
        console.log(pagination);
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
        params.page = params.page || params.current || 1
        params.limit = params.limit || 10
        this.loading = true
        this.$ajax({
          url: "t_app/insertlist",
          data: {
            ...params,
          }
        }).then((res) => {
          const pagination = {...this.pagination};
          pagination.total = res.data.count
          this.loading = false;
          this.tableData = res.data.data;
          this.pagination = pagination;
        });
      },
      remove(row) {
        this.$ajax({
          url: "delOne",
          data: {id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          }
        })
      },
      handleChange(file, fileList) {
        this.file = file
        return false
      }
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
