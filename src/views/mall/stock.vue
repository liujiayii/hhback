<template>
  <div>
    <div class="top">
      <Input
              search
              placeholder="输入关键词搜索……"
              style="width: 300px"
              @input="searchVal"
      />
      <Button
              type="primary"
              shape="circle"
              icon="md-add"
              disabled
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
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="show(row)"
        >
          修改
        </Button>
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
            @on-close="closeDrawer"
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
          <Col span="12">
            <FormItem
                    label="商品名称"
                    prop="productName"
            >
              <Input
                      v-model="formData.productName"
                      size="large"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
                    label="库存"
                    prop="number"
            >
              <Input
                      v-model="formData.number"
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
  import {formatDate, ruleValidate} from "../../config/utils";

  export default {
    name: "Stock",
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
            title: "库存ID",
            key: "id"
          },
          {
            title: "商品库存数量",
            key: "number"
          },
          {
            title: "商品名称",
            key: "productName"
          },
          {
            title: "创建时间",
            key: "create_time",
            render: (h, params) => {
              return h(
                "div",
                formatDate(new Date(params.row.create_time), "yyyy-MM-dd")
              );
            }
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
        },
        currPage: 1
      };
    },
    methods: {
      searchVal(productName) {
        console.log(productName)
        this.pageChange(1, productName)
      },
      closeDrawer() {
        this.formData = {};
      },
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            delete this.formData._index;
            delete this.formData._rowKey;
            this.$ajax({
              method: "post",
              url: "updateInventory",
              data: this.formData
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.drawerShow = false;
                  this.pageChange(this.currPage,'');
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
      show(row) {
        this.formData = row;
        this.drawerShow = true;
      },
      remove(row) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "deleteInventoryById",
              data: row
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChange(1,'');
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
        this.data6.splice(row, 1);
      },
      pageChange(page, productName) {
        this.currPage = page
        this.$ajax({
          method: "post",
          url: "listAllInventoryById",
          data: {page, limit: 10, productName}
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
      this.pageChange(1, '');
    }
  };
</script>

<style scoped>

</style>
