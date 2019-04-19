<template>
  <div>
    <div class="top">
      <Input search placeholder="输入关键词搜索……" style="width: 300px" @input="searchVal"/>
      <Button type="primary" shape="circle" icon="md-add" @click="drawerShow=true">
        添加
      </Button>
    </div>
    <Table border :columns="columns" :data="tableData.data">
      <template slot-scope="{ row }" slot="action">
        <iSwitch
                @on-change="stateUpdate(row)"
                :value="row.state"
                size="large"
                style="margin-right: 5px"
                :true-value="1"
                :false-value="2"
        >
          <span slot="open">上架</span>
          <span slot="close">下架</span>
        </iSwitch>
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">
          查看
        </Button>
      </template>
    </Table>
    <div class="page-box">
      <Page :total="tableData.count" @on-change="pageChange" size="small" show-elevator show-total/>
    </div>
    <Drawer
            title="编辑"
            v-model="drawerShow"
            @on-close="clearDrawer"
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
      <Form :model="formData" ref="formData" :rules="ruleValidate">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="商品专区">
              <Select v-model="formData.zoneid" size="large">
                <Option v-for="(item,index) in zoneList" :value="item.id" :key="index">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="满减优惠">
              <Select v-model="formData.id" size="large">
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
            <FormItem label="商品价格" prop="price">
              <Input v-model="formData.price" size="large" type="number"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="规格">
              <Input v-model="formData.specifications" size="large"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="颜色">
              <Input v-model="formData.color" size="large"/>
            </FormItem>
          </Col>
          <Col span="12" v-if="!formData.productId">
            <FormItem label="库存" prop="number">
              <Input v-model="formData.number" size="large" type="number"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="商品描述" prop="describion">
              <Input type="textarea" v-model="formData.describion" size="large"/>
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
          <Button icon="ios-cloud-upload-outline">
            上传商品小图
          </Button>
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
          <Button icon="ios-cloud-upload-outline">
            上传商品详情图
          </Button>
        </Upload>
        <div class="img-cont">
          <div
                  v-for="(item,index) in fileList"
                  :key="index"
                  class="img-box"
                  @click="delImg(index)"
          >
            <div class="ico">
              <Icon type="md-trash"/>
            </div>
            <img :src="item" alt>
          </div>
        </div>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="submit('formData')">保存</Button>
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
            title: "价格(元)",
            key: "price"
          },
          {
            title: "操作",
            slot: "action",
            width: 200,
            align: "center"
          }
        ],
        tableData: {
          data: [],
          count: 0
        },
        fileList: [],
        sortList: [],
        discountList: [],
        zoneList: [],
        currPage: 1
      };
    },
    methods: {
      searchVal(productName) {
        console.log(productName)
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
                method: "post",
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
                .catch(res => {
                  this.$Notice.error({
                    title: res.data.msg
                  });
                });
            }

            this.fileList.splice(index, 1);
            this.$Message.info("Clicked ok");
          },
          onCancel: () => {
            this.$Message.info("Clicked cancel");
          }
        });
      },
      clearDrawer() {
        this.formData = {zoneid: -1}
        this.fileList = [];
      },
      handleUpload(res) {
        this.formData.image = res.data;
      },
      handleUploadSec(res) {
        this.fileList.push(res.data[0]);
      },
      show(row) {
        this.$ajax({
          method: "post",
          url: "listProductByProductId",
          data: {productId: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.$ajax({
              method: "post",
              url: "selectZoneByProductId",
              data: {productaid: row.id}
            }).then(res_c => {
              if (res_c.data.code === 1) {
                res.data.data[0].zoneid = res_c.data.data[0].id || ''
                this.formData = res.data.data[0]
              } else {
                this.$Notice.error({
                  title: res_c.data.msg
                });
              }
            }).catch(res_c => {
              this.$Notice.error({
                title: res_c.data.msg
              });
            });
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
          url: "selectProductImageByProductId",
          data: {productId: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.fileList.push(res.data.data[i].img);
            }
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
        this.drawerShow = true;
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
              url: this.formData.productId ? "updateProduct" : "saveProduct",
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
      }
    },
    mounted() {
      this.pageChange(1);
      this.getClass();
      this.getDiscount();
      this.getZone();
    }
  };
</script>

<style scoped>
  .img-cont {
    display: flex;
    flex-wrap: wrap;
  }

  .img-cont .img-box {
    position: relative;
    width: 100px;
    height: 100px;
  }

  .img-cont .img-box:hover .ico {
    opacity: 1;
    transition: all 0.5s;
  }

  .img-cont .img-box .ico {
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

  .img-cont .img-box img {
    width: 100%;
    height: 100%;
  }

</style>
