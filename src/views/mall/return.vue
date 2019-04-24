<template>
  <div>
    <div class="top">
      <Input search placeholder="Enter something..." style="width: 300px"/>
      <div></div>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{ row }" slot="action">
        <a-button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</a-button>
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
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
      <Table border :columns="columnsGoods" :data="tableDataGoods"/>
      <Form :model="formData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="姓名">
              <Input v-model="formData.nickname" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="电话">
              <Input v-model="formData.phone" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="退货类别">
              <Select v-model="formData.cause_type" size="large" readonly>
                <Option value="0">仅退款</Option>
                <Option value="1">退货退款</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="退货说明">
              <Input v-model="formData.cause_explain" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="退款金额">
              <Input v-model="formData.sales_amount" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="退款数量">
              <Input v-model="formData.sales_nunber" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="退款原因">
              <Input v-model="formData.sales_cause" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="退货状态">
              <Select v-model="formData.sales_stes" size="large" readonly>
                <Option value="1">
                  退货审核通过
                </Option>
                <Option value="2">
                  退货审核不通过
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <a-button style="margin-right: 8px" @click="drawerShow = false">取消</a-button>
        <a-button type="primary" @click="save" v-if="formData.stele=='0'">保存</a-button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {formatState, ruleValidate} from "../../config/utils";

  export default {
    name: "Return",
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
        columnsGoods: [
          {
            title: "商品名称",
            key: "producttypename"
          },
          {
            title: "规格",
            key: "shoping_specifications"
          },
          {
            title: "单价",
            key: "danjia"
          },
          {
            title: "优惠金额",
            key: "youhuijine"
          },
          {
            title: "总价",
            key: "zongjia"
          }
        ],
        columns: [
          {
            title: "退单编号",
            key: "order_id"
          },
          {
            title: "订单编号",
            key: "sales_no"
          },
          {
            title: "订单状态",
            key: "order_state",
            render: (h, params) => {
              if (params.row.stele == 1) {
                return h("div", '审核通过');
              } else if (params.row.stele == 2) {
                return h("div", '审核未通过');
              } else {
                return h("div", '未审核');
              }
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
        tableDataGoods: []
      };
    },
    methods: {
      show(row) {
        this.tableDataGoods = row.shopinglist
        this.formData = row
        this.drawerShow = true;
      },
      save() {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否保存</p>",
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "t_sales/upodate",
              data: {
                sales_id: this.formData.sales_id,
                stale: this.formData.sales_stes,
                order_id: this.formData.order_id
              }
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
          }
        });
      },
      pageChange(page) {
        this.$ajax({
          method: "post",
          url: "t_sales/thlist",
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
      this.pageChange(1);
    }
  };
</script>

<style scoped>

</style>
