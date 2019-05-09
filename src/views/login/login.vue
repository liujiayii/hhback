<template>
  <div class="bg">
    <div class="cont">
      <a-row :gutter="16">
        <a-col :xs="0" :sm="0" :md="12" :lg="12" :xl="12">
          <div>
            <img src="../../assets/images/loginAside.png" alt="">
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div>
            <div class="logo">
              <img src="../../assets/images/logo.png" alt="">
            </div>
            <a-form id="components-form-demo-normal-login" :form="form" @submit="handleSubmit">
              <a-form-item>
                <a-input v-decorator="['username', { rules: [{ required: true, message: '请输入你的账号!' }] }
        ]" placeholder="请输入账号…">
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input v-decorator="[ 'password', { rules: [{ required: true, message: '请输入你的密码!' }] }
        ]" type="password" placeholder="请输入密码……">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit" block class="sub">登录</a-button>
              </a-form-item>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Login',
    data() {
      return {}
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$ajax({
              url: 'login',
              data: values
            }).then((res) => {
              if (res.data.code === 1) {
                window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.admin))
                window.sessionStorage.setItem('SkyLarkBack', JSON.stringify(res.data.data))
                this.$router.push({path: '/home'})
              }
            })
          } else {
            this.$message.error('校验错误');
          }
        });
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
      sessionStorage.clear()
    },
  }
</script>
<style scoped lang="less">
  .bg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../assets/images/loginBg.png");
    overflow: hidden;

    img {
      width: 100%;
    }

    .cont {
      padding: 130px 70px;
      border-radius: 26px;
      box-shadow: 0 0 20px 20px #4057f9;
      background: #fff;

      .logo {
        margin-bottom: 90px;
      }

      .sub {
        border-radius: 32px;
      }
    }
  }
</style>
