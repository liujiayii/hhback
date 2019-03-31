<template>
  <div>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <Button type="primary" shape="circle" icon="md-add" @click="drawerShow= true">添加</Button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{row}" slot="action">
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
    <div class="page-box">
      <Page :total="tableData.count" @on-change="pageChange" size="small" show-elevator show-total/>
    </div>
    <Drawer
      title="编辑"
      v-model="drawerShow"
      @on-close="clearDrawer"
      width="720"
      :mask-closable="false"
      :styles="styles"
    >
      <Form :model="formData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="最高金额">
              <Input v-model="formData.price" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="最低金额">
              <Input v-model="formData.prices" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="运费">
              <Input v-model="formData.freight" size="large"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="drawerShow = false">取消</Button>
        <Button type="primary" @click="submit">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "Express",
  data() {
    return {
      drawerShow: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {},
      columns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "运费",
          key: "freight"
        },
        {
          title: "最低金额",
          key: "prices"
        },
        {
          title: "最高金额",
          key: "price"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      tableData: {
        data: [],
        count: 0
      }
    };
  },
  methods: {
    clearDrawer() {
      this.formData = {};
    },
    submit() {
      this.$ajax({
        method: "post",
        url: "t_freight/addt_freight",
        data: this.formData
      })
        .then(res => {
          if (res.data.code === 1) {
            this.$Notice.success({
              title: res.data.msg
            });
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
    },
    show() {
      this.drawerShow = true;
    },
    remove(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否删除</p>",
        onOk: () => {
          this.$ajax({
            method: "post",
            url: "t_freight/delt_freight",
            data: row
          })
            .then(res => {
              if (res.data.code === 1) {
                this.$Notice.success({
                  title: res.data.msg
                });
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
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        }
      });
    },
    pageChange(page) {
      this.$ajax({
        method: "post",
        url: "t_freight/selt_freight",
        data: { page, limit: 10 }
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
    }
  },
  mounted() {
    this.pageChange(1);
  }
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

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

.page-box {
  display: flex;
  justify-content: center;
  margin: 20px auto;
}
</style>
