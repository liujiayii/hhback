<template>
  <div class="main">
 <img src="../assets/logobg.png" alt=""  class="bgimg"/>
 <div class="text">
        <h1>让生活更简单</h1>
        <p>Make the design simpler</p>
 </div>
 <div class="formbox">
 	<p>登录</p>
 <template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" >    	 
        <FormItem  prop="username" class="inputbox">
            <Input type="text" placeholder="用户名" v-model="formCustom.username"><Icon type="ios-person-outline" slot="prepend"></Icon></Input>
        </FormItem>
        <FormItem  prop="passwds" class="inputbox">
            <Input type="password" placeholder="密码" v-model="formCustom.passwds"><Icon type="ios-lock-outline" slot="prepend"></Icon></Input>
        </FormItem>
      
        <FormItem>
            <Button class="inputbox" type="primary" @click="handleSubmit('formCustom')"><router-link tag="p" :to="{path:'/index'}" >登录</router-link></Button>
        </FormItem>
    </Form>
</template>
</div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
  	const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            
    return {
   formCustom: {
                    username: '',
                    passwds: '',
                   
                },
                ruleCustom: {
                    username: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwds: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                
                }
            }
    },
      methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      $.ajax({
              type: "post",
              url: "/login",
              data: JSON.stringify(this.formCustom),
              contentType: 'application/json',
              dataType: "json",
              success: (res) => {
                console.log(res)
                if (res.code == 1) {
                   this.$router.push({path: '/'})
                  // window.location.href = '/'
                } else {
                  this.error(res.msg)
                }
              }
            });
          } else {
            console.log('error')
          }
        })
                    }
               
            },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main{position: fixed;background-image: url(../assets/logobg.png);background-size: 100%;top: 0;bottom: 0;left: 0;right: 0;}
 .bgimg{position: absolute;display: block;width: 100%;height: 100%;}
 .main .text{position: absolute;left: 20%;top: 28%;}
 .main .text{z-index: 22;color: #fff;}
 .main .text h1{font-size: 74px;margin-bottom: 20px;}
 .main .text p{font-size: 30px;}
 .formbox{position: absolute;background-color: rgba(255, 255, 255, 0.6);top: 18%;right: 15%;width: 360px;height: 400px;}
.formbox>p{text-align: center;font-weight: 600;font-size: 18px;margin-bottom: 40px;margin-top: 40px;}
	.main .ivu-form-item-content{margin-left: 0!important;}
	.main .inputbox {width: 75%!important;margin-left: 12.5%!important;}
</style>
