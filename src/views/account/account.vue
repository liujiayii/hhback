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
      :columns="columns12"
      :data="data6"
    >
      <template
        slot-scope="{ row }"
        slot="name"
      >
        <strong>{{ row.name }}</strong>
      </template>
      <template
        slot-scope="{ row, index }"
        slot="action"
      >
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="show(index)"
        >
          查看
        </Button>
        <Button
          type="error"
          size="small"
          @click="remove(index)"
        >
          删除
        </Button>
      </template>
    </Table>
    <div class="page-box">
      <Page
        :total="40"
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
    >
      <Form :model="formData">
        <FormItem
          label="姓名"
          label-position="top"
        >
          <Input
            v-model="formData.name"
            placeholder="please enter user name"
          />
        </FormItem>
        <FormItem
          label="身份"
          label-position="top"
        >
          <Select
            v-model="formData.owner"
            placeholder="please select an owner"
          >
            <Option value="jobs">
              管理员
            </Option>
            <Option value="ive">
              普通员工
            </Option>
          </Select>
        </FormItem>
        <FormItem
          label="编号"
          label-position="top"
        >
          <Input
            v-model="formData.name"
            placeholder="please enter user name"
          />
        </FormItem>
        <FormItem
          label="所属部门"
          label-position="top"
        >
          <Select
            v-model="formData.type"
            placeholder="please choose the type"
          >
            <Option value="private">
              财务部
            </Option>
            <Option value="public">
              行政部
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button
          style="margin-right: 8px"
          @click="drawerShow = false"
        >
          取消
        </Button>
        <Button
          type="primary"
          @click="drawerShow = false"
        >
          提交
        </Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  export default {
    name: "Account",
    data() {
      return {
        columns12: [
          {
            title: '姓名',
            slot: 'name'
          },
          {
            title: '身份',
            key: 'age'
          },
          {
            title: '编号',
            key: 'address'
          },
          {
            title: '所属部门',
            key: 'age'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        data6: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ],
        drawerShow: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {
          name: '',
          type: '',
        },
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
        this.data6.splice(index, 1);
      }
    }
  }
</script>

<style scoped>
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }

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
