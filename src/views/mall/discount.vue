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
        @click="drawerShow= true"
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
        slot-scope="{row}"
        slot="action"
      >
        <Button
          type="error"
          size="small"
          @click="remove(row)"
        >
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
      title="编辑"
      v-model="drawerShow"
      @on-close="clearDrawer"
      width="720"
      :mask-closable="false"
      :styles="styles"
    >
      <Form
        :model="formData"
        ref="formData"
        :rules="ruleValidate"
      >
        <Row :gutter="32">
          <Col span="12" >
          <FormItem
            label="优惠起始金额"
            prop="price"
          >
            <Input
              v-model="formData.price"
              size="large"
              type="number"
            />
          </FormItem>
          </Col>
          <Col span="12" >
          <FormItem
            label="优惠金额"
            prop="money"
          >
            <Input
              v-model="formData.money"
              size="large"
              type="number"
            />
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button
          type="primary"
          @click="submit('formData')"
        >
          保存
        </Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {ruleValidate} from '../../config/utils'

  export default {
    name: "Discount",
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
        ruleValidate,
        columns: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "起始金额",
            key: "price"
          },
          {
            title: "减免金额",
            key: "money"
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
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: "post",
              url: this.formData.id ? "updateDiscount" : "addDiscount",
              data: this.formData
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChange(1);
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
              })
          } else {
            this.$Message.error('Fail!');
          }
        })
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
              url: "deleteDiscount",
              data: row
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChange(1);
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
          url: "pageOfDiscount",
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
      }
    },
    mounted() {
      this.pageChange(1)
    }
  };
</script>

<style scoped>

</style>
