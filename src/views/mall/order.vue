<template>
  <div>
    <div class="top">
      <a-form :form="searchForm" layout="inline" @submit="handleSearch">
        <a-form-item>
          <a-select placeholder="选择订单状态" style="width: 300px" v-decorator="['order_state']">
            <a-select-option value="">查看全部</a-select-option>
            <a-select-option value="-1">订单取消</a-select-option>
            <a-select-option value="0">待付款</a-select-option>
            <a-select-option value="1">已付款，待发货</a-select-option>
            <a-select-option value="2">已发货</a-select-option>
            <a-select-option value="3">已签收</a-select-option>
            <a-select-option value="4">已完成</a-select-option>
            <a-select-option value="5">退货中</a-select-option>
            <a-select-option value="6">退货审核通过</a-select-option>
            <a-select-option value="7">退货审核不通过</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-input placeholder="输入关键词搜索……" v-decorator="['date']" style="width: 300px"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" style="margin-right: 6px">搜索</a-button>
          <a-button @click="()=>searchForm.resetFields()">重置</a-button>
        </a-form-item>
      </a-form>
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
        <a-button type="primary" size="small" @click="showDrawer(record)" style="margin-right: 6px">查看</a-button>
      </template>
      <template slot="expandedRowRender" slot-scope="record">
        <a-table :columns="columnsGoods" :dataSource="record.shping" size="small" :pagination="false" bordered/>
      </template>
    </a-table>
    <a-drawer
            title="订单详情"
            :width="720"
            @close="()=> drawerShow = false"
            :visible="drawerShow"
            wrapClassName="drawer-cont"
            destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="姓名">
              <a-input v-decorator="['goods_name']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="电话">
              <a-input v-decorator="['goods_tel']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="省">
              <a-input v-decorator="['goods_Province']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="市">
              <a-input v-decorator="['goods_city']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="县">
              <a-input v-decorator="['goods_CountyArea']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="详细地址">
              <a-input v-decorator="['goods_address']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="订单状态">
              <a-select v-decorator="['order_state']" disabled>
                <a-select-option value="-1">订单取消</a-select-option>
                <a-select-option value="0">待付款</a-select-option>
                <a-select-option value="1">已付款，待发货</a-select-option>
                <a-select-option value="2">已发货</a-select-option>
                <a-select-option value="3">已签收</a-select-option>
                <a-select-option value="4">已完成</a-select-option>
                <a-select-option value="5">退货中</a-select-option>
                <a-select-option value="6">退货审核通过</a-select-option>
                <a-select-option value="7">退货审核不通过</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12" v-show="isShow">
            <a-form-item label="物流单号">
              <a-input v-decorator="['order_shouhuo_id']"/>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="drawer-footer">
          <a-button :style="{marginRight: '8px'}" @click="()=> drawerShow = false">取消</a-button>
          <a-button type="primary" html-type="submit" v-show="isShow">发货</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
  import {formatState} from "../../config/utils";

  export default {
    name: "Order",
    data() {
      return {
        columns: [
          {title: "订单编号", dataIndex: "order_no"},
          {
            title: "订单状态", dataIndex: "order_state",
            customRender: (text, record, index) => {
              return formatState(text)
            }
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: '160px',
            scopedSlots: {customRender: 'operation'},
          }
        ],
        columnsGoods: [
          {title: "商品名称", dataIndex: "productName"},
          {
            title: "规格", dataIndex: "shoping_specifications",
            customRender: (text, record, index) => {
              return text.replace('{', '').replace('}', '').split('"')
            }
          },
          {title: "单价", dataIndex: "danjia"},
          {title: "优惠金额", dataIndex: "youhuijine"},
          {title: "总价", dataIndex: "zongjia"}],
        tableData: [],
        pagination: {},
        loading: false,
        drawerShow: false,
        form: this.$form.createForm(this),
        searchForm: this.$form.createForm(this),
        searchKey: {date: '', order_state: ''},
        isShow: false
      };
    },
    methods: {
      handleSearch(e) {
        e.preventDefault();
        this.searchForm.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            this.searchKey = {date: values.date || '', order_state: values.order_state || ''}
            this.fetch()
          }
        });
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$ajax({
              url: 't_order/ordercan',
              data: {
                order_id: values.order_id,
                order_state: 2,
                order_shouhuo_id: values.order_shouhuo_id
              }
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
      showDrawer(row) {
        this.drawerShow = true;
        this.isShow = row.order_state > 0
        setTimeout(() => {
          this.form.setFieldsValue(row)
        }, 500)
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
        params.page = params.page || params.current || 1
        params.limit = params.limit || 10
        this.loading = true
        this.$ajax({
          url: "t_order/orderweblist",
          data: {
            ...this.searchKey,
            ...params,
          }
        }).then((res) => {
          const pagination = {...this.pagination};
          pagination.total = res.data.count
          this.loading = false;
          this.tableData = res.data.data;
          this.pagination = pagination;
        });
      }
    },
    mounted() {
      this.fetch()
    }
  };
</script>

<style scoped>

</style>
