<template>
  <div>
    <div class="top">
      <Select style="width:300px" clearable @on-change="goSearch" v-model="searchSelect">
        <Option value="-9">全部</Option>
        <Option :value="-1">订单取消</Option>
        <Option :value="0">待付款</Option>
        <Option :value="1">已付款，待发货</Option>
        <Option :value="2">已发货</Option>
        <Option :value="3">已签收</Option>
        <Option :value="4">已完成</Option>
        <Option :value="5">退货中</Option>
        <Option :value="6">退货审核通过</Option>
        <Option :value="7">退货审核不通过</Option>
      </Select>
    </div>
    <div class="top">
      <Input search placeholder="输入订单编号搜索……" style="width: 300px" @input="goSearch" v-model="searchInput"/>
    </div>
    <Table
            border
            :columns="columns"
            :data="tableData.data"
    >
      <template
              slot-scope="{ row }"
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
        <Button
                type="error"
                size="small"
                @click="remove(index)"
                disabled
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
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
      <Table
              border
              :columns="columnsGoods"
              :data="tableDataGoods"
      />
      <Form :model="formData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="姓名">
              <Input
                      v-model="formData.goods_name"
                      size="large"
                      readonly
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="电话">
              <Input
                      v-model="formData.goods_tel"
                      size="large"
                      readonly
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="收货地址">
              <Input
                      v-model="formData.goods_address"
                      size="large"
                      readonly
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="订单状态">
              <Select
                      v-model="formData.order_state"
                      size="large"
                      readonly
              >
                <Option value="-1">
                  订单取消
                </Option>
                <Option value="0">
                  待付款
                </Option>
                <Option value="1">
                  已付款，代发货
                </Option>
                <Option value="2">
                  已发货
                </Option>
                <Option value="3">
                  已签收
                </Option>
                <Option value="4">
                  已完成
                </Option>
                <Option value="5">
                  退货中
                </Option>
                <Option value="6">
                  退货审核通过
                </Option>
                <Option value="7">
                  退货审核不通过
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col
                  span="12"
                  v-show="formData.order_state>0"
          >
            <FormItem
                    label="物流单号"
                    prop="order_shouhuo_id"
            >
              <Input
                      v-model="formData.order_shouhuo_id"
                      size="large"
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button
                style="margin-right: 8px"
                @click="drawerShow = false"
        >
          取消
        </Button>
        <Button
                v-show="formData.order_state==1"
                type="primary"
                @click="submit('formData')"
        >
          发货
        </Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {formatState, ruleValidate} from "../../config/utils";

  export default {
    name: "Order",
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
            title: "订单编号",
            key: "order_id"
          },
          {
            title: "商品名称",
            key: "name"
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
            title: "订单编号",
            key: "order_no"
          },
          {
            title: "订单金额(元)",
            key: "order_money"
          },
          {
            title: "订单状态",
            key: "order_state",
            render: (h, params) => {
              return h("div", formatState(params.row.order_state));
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
        tableDataGoods: [],
        searchSelect: '',
        searchInput: ''
      };
    },
    methods: {
      goSearch() {
        this.pageChange(1)
      },
      show(row) {
        this.drawerShow = true;
        this.tableDataGoods = row.shping;
        this.formData.order_id = row.order_id;
        this.formData.goods_name = row.t_goods.goods_name;
        this.formData.goods_address = row.t_goods.goods_address;
        this.formData.goods_tel = row.t_goods.goods_tel;
        this.formData.order_state = row.order_state;
        this.formData.order_shouhuo_id = row.order_shouhuo_id;
      },
      pageChange(page) {
        if (!this.searchSelect || this.searchSelect == -9) {
          this.searchSelect = ''
        }
        this.$ajax({
          method: "post",
          url: "t_order/orderweblist",
          data: {page, limit: 10, date: this.searchInput, order_state: this.searchSelect}
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
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: "post",
              url: "/t_order/ordercan",
              data: {
                order_id: this.formData.order_id,
                order_state: 2,
                order_shouhuo_id: this.formData.order_shouhuo_id
              }
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
              });
          } else {
            this.$Message.error('Fail!');
          }
        })

      }
    },
    mounted() {
      this.pageChange(1);
    }
  };
</script>

<style scoped>

</style>
