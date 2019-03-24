<template>
  <div class="bg">
    <div class="cont">
      <div class="aside">
        <img src="/mock/login/loginAside.png" alt="">
      </div>
      <div class="main">
        <div class="logo">
          <img src="/mock/login/loginLogo.png" alt="">
        </div>
        <Form ref="formVal" :model="formVal" :rules="rulesForm">
          <FormItem prop="username">
            <Input v-model="formVal.username" size="large" prefix="md-contact" placeholder="Enter your name"/>
          </FormItem>
          <FormItem prop="password">
            <Input v-model="formVal.password" size="large" prefix="md-key" placeholder="Enter your password"/>
          </FormItem>
          <FormItem prop="code">
            <Input v-model="formVal.code" size="large" prefix="md-images" placeholder="Enter your code"/>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" shape="circle" long @click="submit('formVal')">Submit</Button>
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
          username: 'username',
          password: 'password',
          code: 'code'
        },
        rulesForm: {
          username: [
            {required: true, trigger: 'blur'}
          ],
          password: [
            {required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$router.push({path: '/home'})
          } else {
            alert('错误')
          }
        })
      }
    },
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
    background: url("/mock/login/loginBg.png");
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

  .aside {
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
