<template>
  <div>
    <Divider orientation="left">
      首页轮播图
    </Divider>
    <div class="top">
      <Input
              search
              placeholder="Enter something..."
              style="width: 300px"
      />
      <Upload
              action="/t_carousel/insert"
              :show-upload-list="false"
              :on-success="bannerSuc"
              :format="['jpg','jpeg','png']"
              :on-format-error="formatError"
      >
        <Button
                type="primary"
                shape="circle"
                icon="md-add"
                @click="drawerShowBanner=true"
        >
          上传图片
        </Button>
      </Upload>
    </div>
    <Table
            border
            :columns="columnsBanner"
            :data="tableDataBanner.data"
    >
      <template
              slot-scope="{ row }"
              slot="action"
      >
        <Button
                type="error"
                size="small"
                @click="removeBanner(row)"
        >
          删除
        </Button>
      </template>
    </Table>
    <div class="page-box">
      <Page
              :total="tableDataBanner.count"
              @on-change="pageChangeBanner"
              size="small"
              show-elevator
              show-total
      />
    </div>
    <Divider orientation="left">
      商品专区
    </Divider>
    <div class="top">
      <Input
              search
              placeholder="Enter something..."
              style="width: 300px"
      />
      <Button
              type="primary"
              shape="circle"
              icon="md-add"
              @click="drawerShowSpec=true"
      >
        添加
      </Button>
    </div>
    <Table
            border
            :columns="columnsSpec"
            :data="tableDataSpec.data"
    >
      <template
              slot-scope="{ row }"
              slot="action"
      >
        <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="editSpec(row)"
        >
          修改
        </Button>
        <Button
                type="error"
                size="small"
                @click="removeSpec(row)"
        >
          删除
        </Button>
      </template>
    </Table>
    <div class="page-box">
      <Page
              :total="tableDataSpec.count"
              @on-change="pageChangeSpec"
              size="small"
              show-elevator
              show-total
      />
    </div>
    <Divider orientation="left">
      一级分类
    </Divider>
    <div class="top">
      <Input
              search
              placeholder="Enter something..."
              style="width: 300px"
      />
      <Button
              type="primary"
              shape="circle"
              icon="md-add"
              @click="drawerShow=true"
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
              slot-scope="{ row }"
              slot="action"
      >
        <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="edit(row)"
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
    <Divider orientation="left">
      二级分类
    </Divider>
    <div class="top">
      <Input
              search
              placeholder="Enter something..."
              style="width: 300px"
      />
      <Button
              type="primary"
              shape="circle"
              icon="md-add"
              @click="drawerShowSec=true"
      >
        添加
      </Button>
    </div>
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
          修改
        </Button>
        <Button
                type="error"
                size="small"
                @click="removeSec(row)"
        >
          删除
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
    <Drawer
            title="编辑"
            v-model="drawerShowSpec"
            @on-close="closeDrawer"
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
      <Form :model="formDataSpec" ref="formDataSpec" :rules="ruleValidate">
        <Row :gutter="32">
          <Col span="12">
          <FormItem
                  label="专区名称"
                  prop="name"
          >
            <Input
                    v-model="formDataSpec.name"
                    size="large"
            />
          </FormItem>
          </Col>
        </Row>
        <Upload
                action="/upload"
                :on-success="handleUploadSpec"
                :format="['jpg','jpeg','png']"
                :on-format-error="formatError"
                :show-upload-list="false"
        >
          <Button icon="ios-cloud-upload-outline">
            上传图标
          </Button>
        </Upload>
      </Form>
      <div class="demo-drawer-footer">
        <Button
                type="primary"
                @click="submitSpec('formDataSpec')"
        >
          保存
        </Button>
      </div>
    </Drawer>
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
                  label="一级分类名称"
                  prop="name"
          >
            <Input
                    v-model="formData.name"
                    size="large"
            />
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
            上传图标
          </Button>
        </Upload>
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
    <Drawer
            title="编辑"
            v-model="drawerShowSec"
            @on-close="closeDrawer"
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
      <Form
              :model="formDataSec"
              ref="formDataSec"
              :rules="ruleValidate"
      >
        <Row :gutter="32">
          <Col span="12">
          <FormItem
                  label="一级分类名称"
                  prop="classificationId"
          >
            <Select
                    v-model="formDataSec.classificationId"
                    size="large"
            >
              <Option
                      v-for="(item) in tableData.data"
                      :value="item.id"
                      :key="item.id"
              >
                {{ item.name }}
              </Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
                  label="二级分类名称"
                  prop="name"
          >
            <Input
                    v-model="formDataSec.name"
                    size="large"
            />
          </FormItem>
          </Col>
        </Row>
        <Upload
                action="/upload"
                :on-success="handleUploadSec"
                :format="['jpg','jpeg','png']"
                :on-format-error="formatError"
                :show-upload-list="false"
        >
          <Button icon="ios-cloud-upload-outline">
            上传图标
          </Button>
        </Upload>
      </Form>
      <div class="demo-drawer-footer">
        <Button
                type="primary"
                @click="submitSec('formDataSec')"
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
    name: "Sort",
    data() {
      return {
        drawerShow: false,
        drawerShowSec: false,
        drawerShowSpec: false,
        styles: {
          height: "calc(100% - 55px)",
          overflow: "auto",
          paddingBottom: "53px",
          position: "static"
        },
        formData: {},
        ruleValidate,
        formDataSec: {},
        formDataSpec: {},
        formDataBanner: {},
        columns: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "商品分类名称",
            key: "name"
          },
          {
            title: "商品分类图片",
            key: "image",
            render: (h, params) => {
              return h("div", [
                h("img", {
                  attrs: {
                    src: params.row.image
                  },
                  style: {
                    width: "50px",
                    height: "50px"
                  }
                })
              ]);
            }
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
            title: "商品分类图片",
            key: "ioc",
            render: (h, params) => {
              return h("div", [
                h("img", {
                  attrs: {
                    src: params.row.ioc
                  },
                  style: {
                    width: "50px",
                    height: "50px"
                  }
                })
              ]);
            }
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
        columnsBanner: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "图片",
            key: "ioc",
            render: (h, params) => {
              return h("div", [
                h("img", {
                  attrs: {
                    src: params.row.path
                  },
                  style: {
                    width: "50px",
                    height: "50px"
                  }
                })
              ]);
            }
          },
          {
            title: "创建时间",
            key: "creat_time",
            render: (h, params) => {
              return h(
                "div",
                formatDate(new Date(params.row.creat_time), "yyyy-MM-dd")
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
        columnsSpec: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "商品分类名称",
            key: "name"
          },
          {
            title: "商品专区图片",
            key: "image",
            render: (h, params) => {
              return h("div", [
                h("img", {
                  attrs: {
                    src: params.row.image
                  },
                  style: {
                    width: "50px",
                    height: "50px"
                  }
                })
              ]);
            }
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
        tableDataSpec: {
          data: [],
          count: 0
        },
        tableDataBanner: {
          data: [],
          count: 0
        },
        tableData: {
          data: [],
          count: 0
        },
        tableDataSec: {
          data: [],
          count: 0
        }
      };
    },
    methods: {
      formatError() {
        this.$Notice.error({
          title: '文件格式错误'
        });
      },
      closeDrawer() {
        this.formData = {};
        this.formDataSec = {};
        this.formDataSpec = {};
      },
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: "post",
              url: this.formData.id ? "updateClassification" : "saveClassification",
              data: this.formData
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

      },
      submitSec(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            delete this.formDataSec._index;
            delete this.formDataSec._rowKey;
            this.$ajax({
              method: "post",
              url: this.formDataSec.id ? "updateProductType" : "saveProductType",
              data: this.formDataSec
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChangeSec(1);
                  this.drawerShowSec = false;
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
      submitSpec(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            delete this.formDataSpec._index;
            delete this.formDataSpec._rowKey;
            delete this.formDataSpec.create_time;
            this.$ajax({
              method: "post",
              url: this.formDataSpec.id ? "updateZone" : "saveZone",
              data: this.formDataSpec
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChangeSpec(1);
                  this.drawerShowSpec = false;
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
      bannerSuc() {
        this.pageChangeBanner(1);
      },
      handleUpload(res) {
        this.formData.image = res.data;
      },
      handleUploadSec(res) {
        this.formDataSec.ioc = res.data;
      },
      handleUploadSpec(res) {
        this.formDataSpec.image = res.data;
      },
      edit(row) {
        Object.assign(this.formData, row);
        this.drawerShow = true;
      },
      editSpec(row) {
        Object.assign(this.formDataSpec, row);
        this.drawerShowSpec = true;
      },
      editSec(row) {
        Object.assign(this.formDataSec, row);
        this.drawerShowSec = true;
      },
      remove(row) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "deleteClassificationById",
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
      removeSpec(row) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "deleteZoneById",
              data: row
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChangeSpec(1);
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
      removeBanner(row) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "t_carousel/deleatById",
              data: row
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChangeBanner(1);
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
      removeSec(row) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否删除</p>",
          onOk: () => {
            this.$ajax({
              method: "post",
              url: "deleteProductTypeById",
              data: row
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$Notice.success({
                    title: res.data.msg
                  });
                  this.pageChangeSec(1);
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
      pageChangeBanner(page) {
        this.$ajax({
          method: "post",
          url: "t_carousel/selectAll",
          data: {page, limit: 10}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.tableDataBanner = res.data;
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
      pageChangeSpec(page) {
        this.$ajax({
          method: "post",
          url: "selectZoneList",
          data: {page, limit: 10}
        })
          .then(res => {
            if (res.data.code === 1) {
              this.tableDataSpec = res.data;
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
      pageChange(page) {
        this.$ajax({
          method: "post",
          url: "listAllClassification",
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
      this.pageChangeSec(1);
      this.pageChangeSpec(1);
      this.pageChangeBanner(1);
    }
  };
</script>

<style scoped>

</style>
