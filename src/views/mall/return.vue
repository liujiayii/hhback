<template>
  <div>
    <div class="top">
      <a-input-search placeholder="输入关键词搜索……" style="width: 300px" @search="onSearch"/>
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
        <a-table :columns="columnsGoods" :dataSource="record.shopinglist" size="small" :pagination="false" bordered/>
      </template>
    </a-table>
    <a-drawer
      title="退货详情"
      :width="720"
      @close="()=> drawerShow = false"
      :visible="drawerShow"
      wrapClassName="drawer-cont"
      destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="退货状态">
          <a-input v-decorator="['sales_id']" type="hidden"/>
          <a-input v-decorator="['order_id']" type="hidden"/>
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="姓名">
              <a-input v-decorator="['nickname']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="电话">
              <a-input v-decorator="['phone']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="退货类别">
              <a-select v-decorator="['cause_type']" disabled>
                <a-select-option :value="0">仅退款</a-select-option>
                <a-select-option :value="1">退货退款</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="退货说明">
              <a-input v-decorator="['cause_explain']" type="textarea" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="退款金额">
              <a-input v-decorator="['sales_amount']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="退款数量">
              <a-input v-decorator="['sales_nunber']" readOnly/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="退款原因">
              <a-input v-decorator="['sales_cause']" type="textarea" readOnly/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="审核订单状态">
          <a-select v-decorator="['stele']">
            <a-select-option value="0">审核中</a-select-option>
            <a-select-option value="1">退货审核通过</a-select-option>
            <a-select-option value="2">退货审核不通过</a-select-option>
          </a-select>
        </a-form-item>
        <div class="drawer-footer">
          <a-button :style="{marginRight: '8px'}" @click="()=> drawerShow = false">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
  import {formatDate} from "../../config/utils";

  export default {
    name: "Return",
    data() {
      return {
        columns: [
          {title: "订单编号", dataIndex: "sales_no"},
          {
            title: "订单状态",
            dataIndex: "stele",
            customRender: (text, record, index) => {
              if (text === '1') {
                return '审核通过'
              } else if (text === '2') {
                return '审核未通过'
              } else {
                return '审核中'
              }
            }
          },
          {
            title: "创建时间",
            dataIndex: "cause_time",
            customRender: (text, record, index) => {
              return formatDate(new Date(text), "yyyy-MM-dd hh:mm:ss")
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
          {
            title: "商品名称",
            dataIndex: "productName"
          },
          {
            title: "规格",
            dataIndex: "shoping_specifications",
            customRender: (text, record, index) => {
              return text.replace('{', '').replace('}', '').split('"')
            }
          },
          {
            title: "单价",
            dataIndex: "danjia"
          },
          {
            title: "优惠金额",
            dataIndex: "youhuijine"
          },
          {
            title: "总价",
            dataIndex: "zongjia"
          }
        ],
        tableData: [],
        pagination: {},
        loading: false,
        drawerShow: false,
        form: this.$form.createForm(this),
        searchKey: ''
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$ajax({
              url: 't_sales/upodate',
              data: {
                sales_id: values.sales_id,
                stale: values.stele,
                order_id: values.order_id
              }
            }).then(res => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
                this.fetch(this.pagination)
                this.drawerShow = false;
              }
            })
          }
        });
      },
      showDrawer(row) {
        this.drawerShow = true;
        setTimeout(() => {
          this.form.setFieldsValue(row)
        }, 500)
      },
      handleTableChange(pagination, filters, sorter) {
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
          url: "t_sales/thlist",
          data: {
            ...params,
          }
        }).then((res) => {
          const pagination = {...this.pagination};
          pagination.total = res.data.count
          this.loading = false;
          this.tableData = res.data.data;
          this.pagination = pagination;
        });
      },
      onSearch(value) {
        this.searchKey = value
        //this.handleTableChange({current: 1})
      },
    },
    mounted() {
      this.fetch()
    }
  };
</script>

<style scoped>

</style>
