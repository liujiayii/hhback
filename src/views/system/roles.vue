<template>
  <div>
    <div class="top">
      <div></div>
      <a-button type="primary" icon="plus" @click="drawerShow=true">添加</a-button>
    </div>
    <a-table :columns="columns"
             :rowKey="record => record.id"
             :dataSource="data"
             :pagination="pagination"
             :loading="loading"
             @change="handleTableChange"
             bordered
    >
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" size="small" @click="show(record)">查看</a-button>
        <a-button type="primary" size="small" style="margin:0 5px" @click="showAccess(record)">权限</a-button>
        <a-button type="danger" size="small" @click="remove(record)">删除</a-button>
      </template>
    </a-table>
    <a-drawer
            title="角色"
            :width="720"
            @close="onClose"
            :visible="drawerShow"
            :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="角色名">
              <a-input v-decorator="['name']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色键值">
              <a-input v-decorator="['role_key']"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
        <a-button @click="onClose" type="primary">保存</a-button>
      </div>
    </a-drawer>
    <!--<Drawer
            title="角色管理"
            v-model="drawerShow"
            width="720"
            :mask-closable="false"
            :styles="styles"
            @on-close="clearDrawer"
    >
      <Form :model="formData" ref="formData" :rules="ruleValidate">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="角色名" label-position="top" prop="name">
              <Input v-model="formData.name"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="角色键值" label-position="top" prop="post">
              <Input v-model="formData.role_key"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="状态" label-position="top" prop="phone">
              <iSwitch v-model="formData.status" size="large" :true-value="0" :false-value="1">
                <span slot="open">正常</span>
                <span slot="close">锁定</span>
              </iSwitch>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="submit('formData')">提交</Button>
      </div>
    </Drawer>-->
    <Drawer
            title="角色权限"
            v-model="drawerShowAccess"
            width="720"
            :mask-closable="false"
            :styles="styles"
            @on-close="clearDrawer"
    >
      <a-tree
              checkable
              @expand="onExpand"
              :expandedKeys="expandedKeys"
              :autoExpandParent="autoExpandParent"
              v-model="checkedKeys"
              @select="onSelect"
              :selectedKeys="selectedKeys"
              :treeData="treeData"
      />
      <div class="demo-drawer-footer">
        <Button type="primary" @click="submit('formData')">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {ruleValidate} from '../../config/utils'

  export default {
    name: "roles",
    data() {
      return {
        columns: [
          {
            title: '编号',
            dataIndex: 'id'
          },
          {
            title: '角色',
            dataIndex: 'name'
          },
          {
            title: '状态',
            dataIndex: 'status'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: '200px',
            scopedSlots: {customRender: 'operation'},
          }],
        data: [],
        pagination: {},
        loading: false,
        drawerShow: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {},
        ruleValidate,
        drawerShowAccess: false,
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
        treeData: [],
        form: this.$form.createForm(this),
      }
    },
    methods: {
      getTreeData() {
        this.$ajax({
          url: "perms/selectPermsTreeData",
        }).then((res) => {
          if (res.data.code === 1) {
            this.treeData = res.data.data
          }
        })
      },
      showDrawer() {
        this.drawerShow = true
      },
      onClose() {
        this.drawerShow = false
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
        console.log('params:', params);
        this.loading = true
        this.$ajax({
          url: "role/listRole",
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
      },
      clearDrawer() {
        this.formData = {}
      },
      show(row) {
        this.formData = row
        this.drawerShow = true
      },
      showAccess(row) {
        this.drawerShowAccess = true
      },
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            delete this.formData._index
            delete this.formData._rowKey
            this.$ajax({
              url: this.formData.id ? "role/updateRole" : "role/addRole",
              data: this.formData
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChange(this.currPage);
                  this.drawerShow = false;
                } else {
                  this.$Notice.error({
                    title: res.data.msg
                  });
                }
              })
          } else {
            this.$Message.error('Fail!');
          }
        })

      },
      remove(row) {
        this.$confirm({
          title: '提示',
          content: '确定要删除吗 ?',
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            this.$ajax({
              url: "role/deleteRole",
              data: {id: row.id}
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChange(this.currPage)
                } else {
                  this.$Notice.error({
                    title: res.data.msg
                  });
                }
              })
          },
          onCancel: () => {
          },
          class: 'test',
        });
      },
      onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys)
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.expandedKeys = expandedKeys
        this.autoExpandParent = false
      },
      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys)
        this.checkedKeys = checkedKeys
      },
      onSelect(selectedKeys, info) {
        console.log('onSelect', info)
        this.selectedKeys = selectedKeys
      },
    },
    mounted() {
      this.fetch({page: 1, limit: 10,})
      this.getTreeData()
    },
    watch: {
      checkedKeys(val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped>

</style>
