<template>
  <div>
    <div class="top">
      <Input search placeholder="输入关键词搜索……" style="width: 300px" @input="searchVal"/>
      <a-button type="primary" shape="circle" icon="plus" @click="drawerShow=true">添加</a-button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{ row }" slot="action">
        <iSwitch
                @on-change="stateUpdate(row)"
                :value="row.state"
                size="large"
                :true-value="1"
                :false-value="2"
        >
          <span slot="open">上架</span>
          <span slot="close">下架</span>
        </iSwitch>
        <a-button type="primary" size="small" style="margin:0 5px" @click="show(row)">查看</a-button>
        <a-button size="small" @click="showSpecs(row)">规格</a-button>
      </template>
    </Table>
    <div class="page-box">
      <Page :total="tableData.count" @on-change="pageChange" size="small" show-elevator show-total/>
    </div>
    <Drawer
            title="编辑"
            v-model="drawerShow"
            @on-close="clearDrawer"
            width="740"
            :mask-closable="false"
            :styles="styles"
    >
      <Form :model="formData" ref="formData" :rules="ruleValidate">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="商品专区">
              <Select v-model="formData.classificationIds" size="large">
                <Option v-for="(item,index) in zoneList" :value="item.id" :key="index">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="满减优惠">
              <Select v-model="formData.discount_id" size="large">
                <Option v-for="(item,index) in discountList" :value="item.id" :key="index">
                  满{{ item.price }}减{{ item.money }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="商品二级分类">
              <Select v-model="formData.producttypeid" size="large">
                <Option v-for="(item,index) in sortList" :value="item.id" :key="index">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="品牌" prop="brand">
              <Input v-model="formData.brand" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="商品名称" prop="productName">
              <Input v-model="formData.productName" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="商品描述" prop="describion">
              <Input type="textarea" v-model="formData.describion" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="售后信息" prop="describion">
              <Input type="textarea" v-model="formData.after_information" size="large"/>
            </FormItem>
          </Col>
        </Row>
        <Upload
                action="/upload"
                :on-success="handleUpload"
                :format="['jpg','jpeg','png']"
                :on-format-error="formatError"
                :show-upload-list="false"
        >
          <a-button icon="upload">
            上传商品小图
          </a-button>
        </Upload>
        <div class="img-cont">
          <div class="img-box">
            <img :src="formData.image" alt>
          </div>
        </div>
        <Upload
                action="/addImg"
                multiple
                :on-success="handleUploadSec"
                :format="['jpg','jpeg','png']"
                :on-format-error="formatError"
                :show-upload-list="false"
        >
          <a-button icon="upload">上传商品详情图</a-button>
        </Upload>
        <div class="img-cont">
          <div v-for="(item,index) in fileList" :key="index" class="img-box" @click="delImg(index)">
            <div class="ico">
              <a-icon type="delete" theme="filled"/>
            </div>
            <img :src="item" alt>
          </div>
        </div>
      </Form>
      <div class="demo-drawer-footer">
        <a-button type="primary" @click="submit('formData')">保存</a-button>
      </div>
    </Drawer>
    <Drawer
            title="编辑"
            v-model="drawerShowSpecs"
            @on-close="clearDrawer"
            width="740"
            :mask-closable="false"
            :styles="styles"
    >
      <div class="top">
        <div></div>
        <a-button type="primary" shape="circle" icon="plus" @click="specsFormShow=!specsFormShow">添加</a-button>
      </div>
      <Table border :columns="columnsSpecs" :data="tableDataSpecs.data">
        <template slot-scope="{ row }" slot="action">
          <a-button type="primary" size="small" style="margin-right: 5px" @click="show(row)">修改</a-button>
          <a-button type="danger" size="small" style="margin-right: 5px" @click="showSpecs(row)">删除</a-button>
        </template>
      </Table>
      <Form v-show="specsFormShow" :model="formDataSpecs" ref="formDataSpecs" :rules="ruleValidate">
        <Row :gutter="32">
          <template v-for="(item,index) in specsList">
            <Col span="12">
              <FormItem :label="item.specificationsName" :key="index">
                <Input size="large" @input="updateSpecs(item.specificationsName,$event)"/>
              </FormItem>
            </Col>
          </template>
          <Col span="12">
            <FormItem label="库存" prop="brand">
              <Input v-model="formDataSpecs.number" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="销售价格" prop="productName">
              <Input v-model="formDataSpecs.price" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="折扣价格" prop="productName">
              <Input v-model="formDataSpecs.discount_price" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="成本价格" prop="productName">
              <Input v-model="formDataSpecs.cost_price" size="large"/>
            </FormItem>
          </Col>
        </Row>
        <a-button type="primary" @click="submitSpecs('formDataSpecs')">保存</a-button>
      </Form>
      <div class="demo-drawer-footer">
        <a-button type="primary" @click="drawerShowSpecs=false">保存</a-button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {ruleValidate} from '../../config/utils'

  export default {
    name: "Ware",
    data() {
      return {
        drawerShow: false,
        drawerShowSpecs: false,
        styles: {
          height: "calc(100% - 55px)",
          overflow: "auto",
          paddingBottom: "53px",
          position: "static"
        },
        formData: {zoneid: 0},
        ruleValidate,
        columns: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "商品名称",
            key: "productName"
          },
          {
            title: "商品类型",
            key: "producttypename"
          },
          {
            title: "品牌",
            key: "brand"
          },
          {
            title: "操作",
            slot: "action",
            width: 200,
            align: "center"
          }
        ],
        columnsSpecs: [
          {
            title: "规格名称",
            key: "specificationName"
          },
          {
            title: "折扣价",
            key: "discount_price"
          },
          {
            title: "成本价",
            key: "cost_price"
          },
          {
            title: "价格(元)",
            key: "price"
          },
          {
            title: "库存",
            key: "number"
          },
          /*   {
               title: "操作",
               slot: "action",
               width: 160,
               align: "center"
             }*/
        ],
        tableData: {
          data: [],
          count: 0
        },
        fileList: [],
        sortList: [],
        discountList: [],
        zoneList: [],
        currPage: 1,
        specsList: [],
        tableDataSpecs: [],
        formDataSpecs: {specificationName: {}},
        specsFormShow: false
      };
    },
    methods: {
      updateSpecs(key, value) {
        console.log(key)
        console.log(value)
        this.formDataSpecs.specificationName = Object.assign(this.formDataSpecs.specificationName, {[key]: value})
      },
      searchVal(productName) {
        this.pageChange(1, productName)
      },
      formatError() {
        this.$Notice.error({
          title: '文件格式错误'
        });
      },
      delImg(index) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            if (this.formData.productImage[index].id) {
              this.$ajax({
                url: "deleteImg",
                data: {id: this.formData.productImage[index].id}
              })
                .then(res => {
                  if (res.data.code !== 1) {
                    this.$Notice.error({
                      title: res.data.msg
                    });
                  }
                })
            }
            this.fileList.splice(index, 1);
          },
          onCancel: () => {
          }
        });
      },
      clearDrawer() {
        this.formData = {zoneid: -1}
        this.fileList = [];
        this.formDataSpecs = {specificationName: {}}
      },
      handleUpload(res) {
        this.formData.image = res.data;
      },
      handleUploadSec(res) {
        this.fileList.push(res.data[0]);
      },
      show(row) {
        this.$ajax({
          url: "listProductByProductIds",
          data: {productId: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.formData = res.data.data.result
            this.formData.discount_id = res.data.data.s1.discountid
            for (let i = 0; i < res.data.data.result.productImage.length; i++) {
              this.fileList.push(res.data.data.result.productImage[i].img);
            }
          } else {
            this.$Notice.error({
              title: res.data.msg
            });
          }
        })
        this.drawerShow = true;
      },
      showSpecs(row) {
        this.drawerShowSpecs = true
        this.formDataSpecs.product_id = row.id
        this.$ajax({
          method: "post",
          url: "selectAllspecifi",
          data: {product_id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.tableDataSpecs = res.data
          } else {
            this.$Notice.error({
              title: res.data.msg
            });
          }
        }).catch(res => {
          this.$Notice.error({
            title: res.data.msg
          });
        });
        this.$ajax({
          method: "post",
          url: "listSpecificationsByproducttypeid",
          data: {producttypeid: row.producttypeid, page: 1, limit: 100}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.specsList = res.data.data[0].specificationOptionsListss
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
      pageChange(page, productName) {
        this.currPage = page
        this.$ajax({
          method: "post",
          url: productName != undefined ? 'listProductByProductTypeId' : "listAllProductById",
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
      },
      stateUpdate(row) {
        this.$ajax({
          method: "post",
          url: "updateProductState",
          data: {id: row.id, state: row.state == 1 ? 2 : 1}
        })
          .then(res => {
            if (res.data.code === 1) {
              row.state = row.state == 1 ? 2 : 1
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
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            delete this.formData._index;
            delete this.formData._rowKey;
            delete this.formData.page;
            delete this.formData.limit;
            delete this.formData.productImage;
            delete this.formData.create_times;
            this.formData["file"] = this.fileList;
            this.$ajax({
              method: "post",
              url: this.formData.productId ? "updateProduct" : "addproductService",
              data: this.formData
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.drawerShow = false;
                  this.pageChange(this.currPage)
                  this.fileList = [];
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
              });
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      getClass() {
        this.$ajax({
          method: "post",
          url: "selectAllProductTypeList",
          data: {page: 1, limit: 100}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.sortList = res.data.data;
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
      getDiscount() {
        this.$ajax({
          method: "post",
          url: "pageOfDiscount",
          data: {page: 1, limit: 100}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.discountList = res.data.data;
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
      getZone() {
        this.$ajax({
          method: "post",
          url: "selectZoneList",
          data: {page: 1, limit: 100}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.zoneList = res.data.data;
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
      submitSpecs(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formDataSpecs.specificationName = JSON.stringify(this.formDataSpecs.specificationName)
            this.$ajax({
              method: "post",
              url: 'addSpecificationService',
              data: this.formDataSpecs
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
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
              });
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
    },
    mounted() {
      this.pageChange(1);
      this.getClass();
      this.getDiscount();
      this.getZone();
    }
  };
</script>

<style scoped lang="less">
  .img-cont {
    display: flex;
    flex-wrap: wrap;

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
