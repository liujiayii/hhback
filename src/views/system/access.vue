<template>
  <div>
    <a-alert message="错误的设置项可能会导致系统崩溃" banner closable style="margin-bottom: 10px"/>
    <div class="top">
      <div></div>
      <a-button type="primary" shape="circle" icon="plus" @click="drawerShow=true">添加</a-button>
    </div>
    <a-table :columns="columns"
             :rowKey="record => record.key"
             :dataSource="tableData"
             :pagination="pagination"
             :loading="loading"
             @change="handleTableChange"
             bordered
    >
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" size="small" @click="showDrawer(record)" style="margin-right: 6px">查看
        </a-button>
        <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
      <template slot="expandedRowRender" slot-scope="record">
        <a-table :columns="columnsC" :dataSource="record.child" size="small" :pagination="false" bordered>
          <template slot="expandedRowRender" slot-scope="record">
            <a-table :columns="columnsF" :dataSource="record.child" size="small" :pagination="false"
                     bordered
                     style="margin-left: 0">
              <template slot="operation" slot-scope="text, record">
                <a-button type="primary" size="small" @click="showDrawer(record)"
                          style="margin-right: 6px">查看
                </a-button>
                <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
                  <a-icon slot="icon" type="question-circle-o" style="color: red"/>
                  <a-button type="danger" size="small">删除</a-button>
                </a-popconfirm>
              </template>
            </a-table>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-button type="primary" size="small" @click="showDrawer(record)" style="margin-right: 6px">查看
            </a-button>
            <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
              <a-icon slot="icon" type="question-circle-o" style="color: red"/>
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table>
      </template>
    </a-table>
    <a-drawer
      title="权限"
      :width="720"
      @close="()=> drawerShow = false"
      :visible="drawerShow"
      wrapClassName="drawer-cont"
      destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="权限名称">
              <a-input v-decorator="['id']" type="hidden"/>
              <a-input v-decorator="['name']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="权限描述">
              <a-input v-decorator="['description']" type="textarea"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="请求地址">
              <a-input v-decorator="['url']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="父菜单id">
              <a-input v-decorator="['pid']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="权限标识">
              <a-input v-decorator="['perms']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="显示顺序">
              <a-input v-decorator="['order_num']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="权限类型">
              <a-select v-decorator="['menu_type']">
                <a-select-option value="M">主目录</a-select-option>
                <a-select-option value="C">子菜单</a-select-option>
                <a-select-option value="F">按钮</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="菜单状态">
              <a-select v-decorator="['visible']">
                <a-select-option :value="0">显示</a-select-option>
                <a-select-option :value="1">隐藏</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="菜单图标">
              <a-input v-decorator="['icon']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="前端组件">
              <a-input v-decorator="['component']"/>
            </a-form-item>
          </a-col>
        </a-row>
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
    name: "access",
    data() {
      return {
        columns: [
          {title: "id", dataIndex: "id"},
          {title: "主目录", dataIndex: "name"},
          {title: "权限描述", dataIndex: "description"},
          {title: "请求地址", dataIndex: "url"},
          {title: "权限标识", dataIndex: "perms"},
          {title: "显示顺序", dataIndex: "order_num"},
          {
            title: "菜单状态", dataIndex: "visible",
            customRender: (text, record, index) => {
              return text === 0 ? '显示' : '隐藏'
            }
          },
          {title: "前端组件", dataIndex: "component"},
          {
            title: '操作',
            dataIndex: 'operation',
            width: '160px',
            scopedSlots: {customRender: 'operation'},
          }
        ],
        columnsC: [
          {title: "id", dataIndex: "id"},
          {title: "子菜单", dataIndex: "name"},
          {title: "权限描述", dataIndex: "description"},
          {title: "请求地址", dataIndex: "url"},
          {title: "权限标识", dataIndex: "perms"},
          {title: "显示顺序", dataIndex: "order_num"},
          {
            title: "菜单状态", dataIndex: "visible",
            customRender: (text, record, index) => {
              return text === 0 ? '显示' : '隐藏'
            }
          },
          {title: "前端组件", dataIndex: "component"},
          {
            title: '操作',
            dataIndex: 'operation',
            width: '160px',
            scopedSlots: {customRender: 'operation'},
          }
        ],
        columnsF: [
          {title: "按钮名称", dataIndex: "name"},
          {title: "权限描述", dataIndex: "description"},
          {title: "请求地址", dataIndex: "url"},
          {title: "权限标识", dataIndex: "perms"},
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
        form: this.$form.createForm(this)
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          for (let key in values) {
            if (!values[key]) delete values[key]
          }
          if (!err) {
            this.$ajax({
              url: values.id ? 'perms/updatePerm' : 'perms/insertPerm',
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
        console.log(row)
        this.drawerShow = true
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
          url: "perms/selectPermsTreeData",
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
          url: "perms/deletePerm",
          data: {id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
