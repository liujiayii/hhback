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
        <a-switch :checked="record.status===0" checkedChildren="正常" unCheckedChildren="锁定"
                  @change="stateUpdate(record,$event)"/>
        <a-button type="primary" size="small" @click="showDrawer(record)" style="margin: 0 6px">查看</a-button>
        <a-button type="primary" size="small" @click="showAccess(record)" style="margin: 0 6px">权限</a-button>
        <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer
      title="角色信息"
      :width="720"
      @close="()=> drawerShow = false"
      :visible="drawerShow"
      wrapClassName="drawer-cont"
      destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="角色名">
              <a-input v-decorator="['id']" type="hidden"/>
              <a-input v-decorator="['name']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色键值">
              <a-input v-decorator="['role_key']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色状态">
              <a-select v-decorator="['status']">
                <a-select-option :value="0">正常</a-select-option>
                <a-select-option :value="1">锁定</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="drawer-footer">
          <a-button :style="{marginRight: '8px'}" @click="()=> drawerShow = false">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form>
    </a-drawer>
    <a-drawer
      title="角色权限"
      :width="720"
      @close="()=> drawerAccessShow = false"
      :visible="drawerAccessShow"
      wrapClassName="drawer-cont"
      destroyOnClose
    >
      <div v-for="(item,index) in accessList" :key="index" class="menu-m">
        <a-checkbox-group :options="[{label:item.name,value:item.id}]" v-model="checkedList.permission_ids"/>
        <div v-for="(item_c,index_c) in item.child" :key="index+index_c" class="menu-c">
          <a-checkbox-group :options="[{label:item_c.name,value:item_c.id}]" v-model="checkedList.permission_ids"/>
          <span v-for="(item_f,index_f) in item_c.child" :key="index+index_c+index_f">
            <a-checkbox-group :options="[{label:item_f.name,value:item_f.id}]" v-model="checkedList.permission_ids"/>
          </span>
        </div>
      </div>
      <div class="drawer-footer">
        <a-button :style="{marginRight: '8px'}" @click="()=> drawerAccessShow = false">取消</a-button>
        <a-button type="primary" @click="submitAccess">保存</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>

  export default {
    name: "roles",
    data() {
      return {
        columns: [
          {title: "编号", dataIndex: "id"},
          {title: "角色", dataIndex: "name"},
          {title: "角色键值", dataIndex: "role_key"},
          {
            title: '操作',
            dataIndex: 'operation',
            width: '260px',
            scopedSlots: {customRender: 'operation'},
          }
        ],
        tableData: [],
        pagination: {},
        loading: false,
        drawerShow: false,
        form: this.$form.createForm(this),
        checkedList: {role_id: '', permission_ids: []},
        accessList: [],
        drawerAccessShow: false,
      }
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
              url: values.id ? 'role/updateRole' : "role/addRole",
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
      submitAccess() {
        this.$ajax({
          url: 'role/addOrUpdatePermsForRole',
          data: this.checkedList
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.drawerAccessShow = false;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      showDrawer(row) {
        this.drawerShow = true;
        setTimeout(() => {
          this.form.setFieldsValue(row)
        }, 500)
      },
      showAccess(row) {
        this.drawerAccessShow = true
        this.checkedList.role_id = row.id
        this.$ajax({
          url: "role/selectPermsByRoleId",
          data: {role_id: row.id}
        }).then((res) => {
          this.checkedList.permission_ids = res.data.data
        });
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
          url: "role/listRole",
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
          url: "role/deleteRole",
          data: {id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getAccessList() {
        this.$ajax({
          url: "perms/selectPermsTreeData",
          data: {page: 1, limit: 10}
        }).then((res) => {
          if (res.data.code === 1) {
            this.accessList = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        });
      },
      stateUpdate(row, status) {
        this.$ajax({
          url: 'role/updateRole',
          data: {id: row.id, status: row.status === 0 ? 1 : 0}
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    mounted() {
      this.getAccessList()
      this.fetch()
    }
  }
</script>

<style lang="less" scoped>
  .menu-m {
    margin-bottom: 10px;

    .menu-c {
      margin: 6px 0 0 24px;
    }
  }

</style>
