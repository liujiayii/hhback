<template>
  <div>
    <div class="top">
      <Input
              search
              placeholder="Enter something..."
              style="width: 300px"
      />
      <Button
              type="primary"
              shape="circle"
              icon="md-add"
              @click="drawerShow=true"
      >
        添加
      </Button>
    </div>
    <Table
            border
            :columns="columns"
            :data="tableData.data"
    >
      <template
              slot-scope="{ row, index }"
              slot="action"
      >
        <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="show(row)"
        >
          查看
        </Button>
        <Button type="error" size="small" @click="remove(index)">
          删除
        </Button>
      </template>
    </Table>
    <div class="page-box">
      <Page
              :total="tableData.count"
              @on-change="pageChange"
              size="small"
              show-elevator
              show-total
      />
    </div>
    <Drawer
            title="账号管理"
            v-model="drawerShow"
            width="720"
            :mask-closable="false"
            :styles="styles"
            @on-close="clearDrawer"
    >
      <Form :model="formData" ref="formData" :rules="ruleValidate">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="姓名" label-position="top" prop="name">
              <Input v-model="formData.name"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="身份" label-position="top" prop="post">
              <Input v-model="formData.post"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="手机号" label-position="top" prop="phone">
              <Input v-model="formData.phone" type="number"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="用户名" label-position="top" prop="username">
              <Input v-model="formData.username"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="密码" label-position="top" prop="password">
              <Input v-model="formData.password" type="password"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="submit('formData')">提交</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {ruleValidate} from '../../plugins/utils'

  export default {
    name: "Account",
    data() {
      return {
        columns: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '手机号',
            key: 'phone'
          },
          {
            title: '身份',
            key: 'post'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        tableData: {
          data: [],
          count: 0
        },
        drawerShow: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {},
        ruleValidate,
        currPage: 1
      }
    },
    methods: {
      clearDrawer() {
        this.formData = {}
      },
      show(row) {
        this.formData = row
        this.drawerShow = true
      },
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            delete this.formData._index
            delete this.formData._rowKey
            //delete this.formData.password
            delete this.formData.create_time
            this.$ajax({
              method: "post",
              url: this.formData.id ? "updateAdmin" : "addAdmin",
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
              .catch(res => {
                this.$Notice.error({
                  title: res.data.msg
                });
              });
          } else {
            this.$Message.error('Fail!');
          }
        })

      },
      pageChange(page) {
        this.currPage = page
        this.$ajax({
          method: "post",
          url: "/findAdminList",
          data: {page, limit: 10}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.tableData = res.data;
            } else {
              this.$Notice.error({
                title: res.data.msg
              });
            }
          })
          .catch(res => {
            this.$Notice.error({
              title: res.data.msg
            });
          });
      },
      remove(index) {
        this.data6.splice(index, 1);
      }
    },
    mounted() {
      this.pageChange(1)
    }
  }
</script>

<style scoped>

</style>
