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
      <template slot="img" slot-scope="text, record">
        <img :src="text" alt="" height="100">
      </template>
    </a-table>
    <a-drawer
            title="二级分类"
            :width="720"
            @close="()=> drawerShow = false"
            :visible="drawerShow"
            wrapClassName="drawer-cont"
            destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input v-decorator="['id']" type="hidden"/>
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="一级分类">
              <a-select v-decorator="['classificationId']">
                <a-select-option v-for="item in class_one" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="二级分类">
              <a-input v-decorator="['name']"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="二级分类图片">
          <a-input v-decorator="['ioc']" readOnly/>
        </a-form-item>
        <a-upload action="/upload" :showUploadList="false" @change="handleChange">
          <a-button type="primary" icon="upload">上传图片</a-button>
        </a-upload>
        <div class="drawer-footer">
          <a-button :style="{marginRight: '8px'}" @click="()=> drawerShow = false">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
  import {formatDate} from "../../../config/utils";

  export default {
    name: "sort_4",
    data() {
      return {
        columns: [
          {title: "编号", dataIndex: "id"},
          {title: "一级分类", dataIndex: "classificationName"},
          {title: "二级", dataIndex: "name"},
          {title: "图片", dataIndex: "ioc", scopedSlots: {customRender: 'img'},},
          {
            title: "创建时间",
            dataIndex: "create_time",
            customRender: (text, record, index) => {
              return formatDate(new Date(text), "yyyy-MM-dd")
            }
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: '160px',
            scopedSlots: {customRender: 'operation'},
          }
        ],
        tableData: [],
        pagination: {},
        loading: false,
        drawerShow: false,
        form: this.$form.createForm(this),
        class_one: []
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            if (values.id === undefined) {
              delete values.id
            }
            this.$ajax({
              url: values.id ? 'updateProductType' : "saveProductType",
              data: values
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
          url: "selectAllProductTypeList",
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
          url: "deleteProductTypeById",
          data: row
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      handleChange(info) {
        if (info['file']['response']['code'] === 1) {
          this.form.setFieldsValue({ioc: info.file.response.data})
        }
      },
      getClass_one() {
        this.$ajax({
          url: "listAllClassification",
          data: {
            page: 1, limit: 100
          }
        }).then((res) => {
          this.class_one = res.data.data
        });
      }
    },
    mounted() {
      this.fetch()
      this.getClass_one()
    }
  }
</script>

<style scoped>

</style>
