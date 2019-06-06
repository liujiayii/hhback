<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="listData">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta :description="item.cont">
          <a slot="title">{{item.title}}</a>
        </a-list-item-meta>
        <a type="primary" size="small" slot="actions" @click="showDrawer">修改</a>
      </a-list-item>
    </a-list>
    <a-drawer
            title="联系我们"
            :width="400"
            @close="()=> drawerShow = false"
            :visible="drawerShow"
            wrapClassName="drawer-cont"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input v-decorator="['id']" type="hidden"/>
        </a-form-item>
        <a-form-item label="地址">
          <a-input v-decorator="['address']"/>
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-decorator="['enterprise_email']"/>
        </a-form-item>
        <a-form-item label="联系方式">
          <a-input v-decorator="['phone']"/>
        </a-form-item>
        <a-form-item label="备案">
          <a-input v-decorator="['record']"/>
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

  export default {
    name: "contact",
    data() {
      return {
        drawerShow: false,
        listData: [
          {title: '地址', cont: ''},
          {title: '邮箱', cont: ''},
          {title: '联系方式', cont: ''},
          {title: '备案', cont: ''}
        ],
        form: this.$form.createForm(this),
        formData: {}
      };
    },
    methods: {
      showDrawer() {
        this.drawerShow = true
        this.$nextTick(()=>{
          this.form.setFieldsValue(this.formData)
        })
      },
      getList() {
        this.$ajax({
          url: "selectAllContactUsListPage",
          data: {page: 1, limit: 10}
        }).then(res => {
          if (res.data.code === 1) {
            this.listData[0].cont = res.data.data[0].address
            this.listData[1].cont = res.data.data[0].enterprise_email
            this.listData[2].cont = res.data.data[0].phone
            this.listData[3].cont = res.data.data[0].record
            this.formData = res.data.data[0]
          }
        })
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$ajax({
              url: 'updateContactUs',
              data: values
            }).then(res => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
                this.getList()
                this.drawerShow = false;
              }
            })
          }
        });
      },
    },
    mounted() {
      this.getList();
    }
  };
</script>
