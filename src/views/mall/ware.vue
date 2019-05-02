<template>
  <div>
    <template>
      <div class="top">
        <a-input-search placeholder="输入关键词搜索……" style="width: 300px" @search="onSearch"/>
        <a-button type="primary" shape="circle" icon="plus" @click="drawerShow=true">添加</a-button>
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
          <a-switch :checked="record.state===1" checkedChildren="上架" unCheckedChildren="下架"
                    @change="stateUpdate(record,$event)"/>
          <a-button type="primary" size="small" @click="showDrawer(record)" style="margin:0 6px">查看</a-button>
          <a-button size="small" @click="showSpecs(record)">规格</a-button>
        </template>
      </a-table>
      <a-drawer
              title="商品详情"
              :width="720"
              @close="()=> drawerShow = false"
              :visible="drawerShow"
              wrapClassName="drawer-cont"
              destroyOnClose
      >
        <a-form :form="form" @submit="handleSubmit">
          <a-row :gutter="16">
            <a-form-item>
              <a-input v-decorator="['productId']" type="hidden"/>
              <a-input v-decorator="['state']" type="hidden"/>
            </a-form-item>
            <a-col :span="12">
              <a-form-item label="商品名称">
                <a-input v-decorator="['productName']"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="商品专区">
                <a-select v-decorator="['zoneid']" style="width: 100%">
                  <a-select-option v-for="(item,index) in zoneList" :value="item.id">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="商品二级分类">
                <a-select v-decorator="['producttypeid']" style="width: 100%">
                  <a-select-option v-for="(item,index) in sortList" :value="item.id">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="满减优惠">
                <a-select v-decorator="['discount_id']" style="width: 100%">
                  <a-select-option v-for="(item,index) in discountList" :value="item.id">满{{ item.price }}减{{ item.money
                    }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="品牌">
                <a-input v-decorator="['brand']"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="商品描述">
                <a-input v-decorator="['describion']" type="textarea"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="售后信息">
                <a-input v-decorator="['after_information']" type="textarea"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-upload action="/upload" :showUploadList="false" @change="handleChange">
            <a-button type="primary" shape="circle" icon="upload">上传商品小图</a-button>
          </a-upload>
          <div class="img-cont">
            <div class="img-box">
              <img :src="image" alt>
            </div>
          </div>
          <a-upload action="/addImg" :showUploadList="false" @change="handleChangeInfo">
            <a-button type="primary" shape="circle" icon="upload">上传商品详情图</a-button>
          </a-upload>
          <div class="img-cont">
            <div v-for="(item,index) in imageList" :key="index" class="img-box" @click="deleteImage(index)">
              <div class="ico">
                <a-icon type="delete" theme="filled"/>
              </div>
              <img :src="item.img" :alt="item.product_id">
            </div>
          </div>
          <div class="drawer-footer">
            <a-button :style="{marginRight: '8px'}" @click="()=> drawerShow = false">取消</a-button>
            <a-button type="primary" html-type="submit">保存</a-button>
          </div>
        </a-form>
      </a-drawer>
      <a-drawer
              title="规格设置"
              :width="720"
              @close="()=> drawerShowSpecs = false"
              :visible="drawerShowSpecs"
              wrapClassName="drawer-cont"
              destroyOnClose
      >
        <a-button class="editable-add-btn" @click="()=>formSpecsShow=!formSpecsShow" style="margin-bottom: 6px">添加</a-button>
        <a-table :columns="[...specsList,...columnsSpecs]" :dataSource="tableDataSpecs" size="small" :pagination="false"
                 bordered>
          <template v-for="col in newColumns" :slot="col" slot-scope="text, record, index">
            <div :key="col">
              <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
                       @change="e => handleEdit(e.target.value, record.id, col)"/>
              <template v-else>{{text}}</template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class='editable-row-operations'>
            <span v-if="record.editable">
              <a @click="() => save(record.id)">保存</a>
              <a-popconfirm title='确定取消?' @confirm="() => cancel(record.id)"><a>取消</a></a-popconfirm>
            </span>
              <span v-else>
              <a @click="() => edit(record.id)">编辑</a>
                <a-popconfirm title='确定删除?' @confirm="() => removeSpecs(record)"><a>删除</a></a-popconfirm>
            </span>
            </div>
          </template>
        </a-table>
        <a-form v-if="formSpecsShow" :form="formSpecs" @submit="handleSubmitSpecs">
          <a-row :gutter="16">
            <a-col :span="12" v-for="item in specsList">
              <a-form-item :label="item.title">
                <a-input v-decorator="[item.title]"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="库存">
                <a-input v-decorator="['number']"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="销售价格">
                <a-input v-decorator="['price']"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="折扣价格">
                <a-input v-decorator="['discount_price']"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="成本价格">
                <a-input v-decorator="['cost_price']"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-form>
      </a-drawer>
    </template>
  </div>
</template>

<script>

  export default {
    name: "Ware",
    data() {
      return {
        columns: [
          {title: "编号", dataIndex: "id"},
          {title: "商品名称", dataIndex: "productName"},
          {title: "品牌", dataIndex: "brand"},
          {title: "商品分类", dataIndex: "producttypename"},
          {
            title: '操作',
            dataIndex: 'operation',
            width: '200px',
            scopedSlots: {customRender: 'operation'},
          }
        ],
        tableData: [],
        pagination: {},
        loading: false,
        searchKey: '',
        drawerShowSpecs: false,
        tableDataSpecs: [],
        columnsSpecs: [
          {
            title: "折扣价", dataIndex: "discount_price",
            scopedSlots: {customRender: 'discount_price'}
          },
          {
            title: "成本价", dataIndex: "cost_price",
            scopedSlots: {customRender: 'cost_price'}
          },
          {
            title: "价格(元)", dataIndex: "price",
            scopedSlots: {customRender: 'price'},
          },
          {
            title: "库存", dataIndex: "number",
            scopedSlots: {customRender: 'number'},
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
          }],
        specsList: [],
        drawerShow: false,
        form: this.$form.createForm(this),
        zoneList: [],
        discountList: [],
        sortList: [],
        image: '',
        imageList: [],
        formSpecsShow: false,
        formSpecs: this.$form.createForm(this),
        cacheId: null
      };
    },
    methods: {
      handleSubmitSpecs(e) {
        e.preventDefault();
        this.formSpecs.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            let newObj = {}
            for (let key in values) {
              if (!/^[a-zA-Z_]*$/.test(key)) {
                newObj[key] = values[key]
              }
            }
            values.specificationName = JSON.stringify(newObj)
            values['product_id'] = this.cacheId
            this.$ajax({
              url: 'addSpecificationService',
              data: values
            }).then(res => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
                this.showSpecs({id: this.cacheId})
                this.formSpecs.resetFields()
                this.formSpecsShow = false
              }else {
                this.$message.error(res.data.msg)
              }
            })
          }
        });
      },
      removeSpecs(row) {
        this.$ajax({
          url: "deleteProductSpecificationById",
          data: {id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.showSpecs({id: this.cacheId})
            this.$message.success(res.data.msg)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      handleAdd() {
        const newData = {
          id: 0,
        }
        this.tableDataSpecs = [...this.tableDataSpecs, newData]
      },
      handleEdit(value, key, column) {
        const newData = [...this.tableDataSpecs]
        const target = newData.filter(item => key === item.id)[0]
        if (target) {
          target[column] = value
          this.tableDataSpecs = newData
        }
      },
      edit(key) {
        const newData = [...this.tableDataSpecs]
        const target = newData.filter(item => key === item.id)[0]
        console.log(target)
        if (target) {
          target.editable = true
          this.tableDataSpecs = newData
        }
      },
      save(key) {
        const newData = [...this.tableDataSpecs]
        const target = newData.filter(item => key === item.id)[0]
        if (target) {
          let newObj = {}
          for (let key in target) {
            //console.log(/^[a-zA-Z_]*$/.test(key) + key)
            if (!/^[a-zA-Z_]*$/.test(key)) {
              newObj[key] = target[key]
            }
          }
          target.specificationName = JSON.stringify(newObj)
          if (target.id) {
            target['attribute'] = target.id
          }
          this.$ajax({
            url: target.id ? 'updateProductSpecification' : 'addSpecificationService',
            data: target
          }).then(res => {
            if (res.data.code === 1) {
              delete target.editable
              this.tableDataSpecs = newData
              this.cacheData = newData.map(item => ({...item}))
            }else {
              this.$message.error(res.data.msg)
            }
          })
        }
      },
      cancel(key) {
        const newData = [...this.tableDataSpecs]
        const target = newData.filter(item => key === item.id)[0]
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.id)[0])
          delete target.editable
          this.tableDataSpecs = newData
        }
      },
      onSearch(value) {
        this.searchKey = value
        this.handleTableChange(this.pagination)
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            if (values.productId === undefined) {
              delete values.productId
            }
            if (values.state === undefined) {
              delete values.state
            }
            values.image = this.image
            let file = []
            for (let i = 0; i < this.imageList.length; i++) {
              file.push(this.imageList[i].img)
            }
            values.file = file
            this.$ajax({
              url: values.productId ? 'updateProduct' : "saveProduct",
              data: values
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
        this.$ajax({
          url: "listProductByProductIds",
          data: {productId: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            let obj = res.data.data.result
            obj.discount_id = res.data.data.s1 ? res.data.data.s1.discountid : ''
            this.image = res.data.data.result.image
            setTimeout(() => {
              this.form.setFieldsValue(obj)
            }, 500)
          }else {
            this.$message.error(res.data.msg)
          }
        })
        this.$ajax({
          url: "selectProductImageByProductId",
          data: {productId: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            console.log(res)
            this.imageList = res.data.data
          }else {
            this.$message.error(res.data.msg)
          }
        })
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
          url: this.searchKey === '' ? 'listAllProductById' : "listProductByProductTypeIds",
          data: {
            productName: this.searchKey,
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
      stateUpdate(row, state) {
        this.$ajax({
          url: "updateProductState",
          data: {id: row.id, state: state ? 1 : 2}
        }).then(res => {
          if (res.data.code === 1) {
            row.state = state ? 1 : 2
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      showSpecs(row) {
        this.drawerShowSpecs = true
        this.cacheId = row.id
        this.$ajax({
          method: "post",
          url: "selectAllspecifi",
          data: {product_id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            let data = res.data.data
            for (let i = 0; i < res.data.data.length; i++) {
              data[i] = {...data[i], ...JSON.parse(res.data.data[i].specificationName)}
            }
            console.log(data)
            this.tableDataSpecs = data
          }else {
            this.$message.error(res.data.msg)
          }
        })
        this.$ajax({
          method: "post",
          url: "listSpecificationsByproducttypeid",
          data: {producttypeid: row.producttypeid, page: 1, limit: 100}
        }).then(res => {
          if (res.data.code === 1) {
            let data = []
            if (res.data.data.length != 0) {
              for (let i = 0; i < res.data.data[0].specificationOptionsListss.length; i++) {
                data.push({
                  title: res.data.data[0].specificationOptionsListss[i].specificationsName,
                  dataIndex: res.data.data[0].specificationOptionsListss[i].specificationsName,
                  scopedSlots: {customRender: res.data.data[0].specificationOptionsListss[i].specificationsName}
                })
              }
            }
            this.specsList = data
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getZone() {
        this.$ajax({
          method: "post",
          url: "selectZoneList",
          data: {page: 1, limit: 100}
        }).then(res => {
          if (res.data.code === 1) {
            this.zoneList = res.data.data;
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getDiscount() {
        this.$ajax({
          method: "post",
          url: "pageOfDiscount",
          data: {page: 1, limit: 100}
        }).then(res => {
          if (res.data.code === 1) {
            this.discountList = res.data.data;
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getSort() {
        this.$ajax({
          method: "post",
          url: "selectAllProductTypeList",
          data: {page: 1, limit: 100}
        }).then(res => {
          if (res.data.code === 1) {
            this.sortList = res.data.data;
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      handleChangeInfo(info) {
        if (info.file.response.code === 1) {
          this.imageList = [...this.imageList, {id: null, img: info.file.response.data[0]}]
        }
      },
      handleChange(info) {
        if (info.file.response.code === 1) {
          this.image = info.file.response.data
        }
      },
      deleteImage(index) {
        this.$confirm({
          title: '提示',
          content: '是否删除 ?',
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            if (this.imageList[index].id !== null) {
              this.$ajax({
                url: "deleteImg",
                data: {id: this.imageList[index].id}
              }).then(res => {
                if (res.data.code === 1) {
                  this.imageList.splice(index, 1)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            } else {
              this.imageList.splice(index, 1)
            }
          }
        });
      }
    },
    computed: {
      newColumns() {
        let data = []
        for (let i = 0; i < this.specsList.length; i++) {
          data.push(this.specsList[i].dataIndex)
        }
        for (let n = 0; n < this.columnsSpecs.length; n++) {
          data.push(this.columnsSpecs[n].dataIndex)
        }
        return data
      }
    },
    mounted() {
      this.fetch()
      this.getZone()
      this.getDiscount()
      this.getSort()
    }
  };
</script>

<style scoped lang="less">
  .img-cont {
    display: flex;
    flex-wrap: wrap;
    margin: 10px;

    .img-box {
      position: relative;
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .img-box:hover .ico {
      opacity: 1;
      transition: all 0.5s;
    }

    .ico {
      position: absolute;
      font-size: 40px;
      width: 100%;
      height: 100%;
      line-height: 100px;
      text-align: center;
      background: rgba(0, 0, 0, 0.8);
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
