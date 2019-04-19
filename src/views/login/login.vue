<template>
  <div class="bg">
    <div class="cont">
      <div class="aside">
        <img
                src="../../assets/images/loginAside.png"
                alt=""
        >
      </div>
      <div class="main">
        <div class="logo">
          <img
                  src="../../assets/images/loginLogo.png"
                  alt=""
          >
        </div>
        <Form
                ref="formVal"
                :model="formVal"
                :rules="rulesForm"
        >
          <FormItem prop="username">
            <Input
                    v-model="formVal.username"
                    size="large"
                    prefix="md-contact"
                    placeholder="请输入账号…"
            />
          </FormItem>
          <FormItem prop="password">
            <Input
                    v-model="formVal.password"
                    type="password"
                    size="large"
                    prefix="md-key"
                    placeholder="请输入密码……"
            />
          </FormItem>
          <FormItem>
            <Button
                    type="primary"
                    size="large"
                    shape="circle"
                    long
                    @click="submit('formVal')"
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        formVal: {
          username: '',
          password: ''
        },
        rulesForm: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$router.push({path: '/home'})
            this.$ajax({
              method: 'post',
              url: 'login',
              data: this.formVal
            }).then((res) => {
              if (res.data.code === 1) {
                let routerArr = res.data.data
                window.sessionStorage.setItem('userName', this.formVal.username)
                window.sessionStorage.setItem('routerPath', '/home')
                window.sessionStorage.setItem('SkyLarkBack', JSON.stringify(routerArr))
                this.$router.push({path: '/home'})
              } else {
                this.$Notice.error({
                  title: res.data.data.msg
                })
              }
            }).catch((res) => {
              this.$Notice.error({
                title: res.data.msg
              })
            })
          } else {
            this.$Notice.error({
              title: '校验错误',
            })
          }
        })
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../assets/images/loginBg.png");
  }

  .cont {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    width: 1200px;
    height: 700px;
    border-radius: 26px;
    box-shadow: 0 0 20px 20px #4057f9;
    background: #fff;
  }

  .logo {
    margin-bottom: 90px;
    width: 90%;
    height: 90%;
  }

  .logo img {
    width: 100%;
    height: 100%;
  }
</style>
