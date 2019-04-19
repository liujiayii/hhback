<template>
  <div>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <Button type="primary" shape="circle" icon="md-add" @click="drawerShow= true">添加</Button>
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
      <Table
              border
              :columns="columnsSec"
              :data="tableDataSec.data"
      >
        <template
                slot-scope="{ row }"
                slot="action"
        >
          <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="editSec(row)"
          >
            选择
          </Button>
        </template>
      </Table>
      <div class="page-box">
        <Page
                :total="tableDataSec.count"
                @on-change="pageChangeSec"
                size="small"
                show-elevator
                show-total
        />
      </div>
      <Form
              :model="formData"
              ref="formData"
              :rules="ruleValidate"
      >
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="分类名称" prop="money">
              <Input
                      v-model="formData.classificationName"
                      size="large"
                      readonly
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
                    label="规格名称"
                    prop="money"
            >
              <Input
                      v-model="formData.specificationsName"
                      size="large"
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
    name: "specs",
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
            title: "规格名称",
            key: "specificationsName"
          },
          {
            title: "商品类型名称",
            key: "producttypename"
          },
          {
            title: "操作",
            slot: "action",
            width: 150,
            align: "center"
          }
        ],
        columnsSec: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "商品一级分类名称",
            key: "classificationName"
          },
          {
            title: "商品分类名称",
            key: "name"
          },
          {
            title: "操作",
            slot: "action",
            width: 150,
            align: "center"
          }
        ], tableDataSec: {
          data: [],
          count: 0
        },
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
      editSec(item) {
        console.log(item)
        this.formData = {classificationName: item.name, producttypeid: item.id}
      },
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: "post",
              url: 'saveSpecificationsVo',
              data: this.formData
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChange(1);
                  this.drawerShow = false;
                  this.clearDrawer()
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
              url: "deleteSpecificationsVoById",
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
          url: "listAllSpecifications",
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
      pageChangeSec(page) {
        this.$ajax({
          method: "post",
          url: "selectAllProductTypeList",
          data: {page, limit: 10}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.tableDataSec = res.data;
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
    },
    mounted() {
      this.pageChange(1)
      this.pageChangeSec(1);
    }
  }
</script>

<style scoped>

</style>
