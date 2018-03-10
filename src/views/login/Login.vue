<template>
  <div class="login-container">
    <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="login-form">
      <h3 class="title">GBW 问卷管理后台</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import {login} from '@/api/api.js'

export default {
  name: "login",
  data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur', validator: validateUser }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePass }
          ]
        },
        loading: false
      };
    },
    methods: {
      handleLogin(formName) {
        this.$refs.loginForm.validate((valid) => {

          if (valid) {
            let userInfo = {
              'username': this.loginForm.username,
              'password': this.loginForm.password
            }
            // login(userInfo).then(res => {
            //   console.log(res)
            //   if(res.data.status === 200) {
            //     this.$cookie.set('username', res.data.data.username,30);
            //     this.$store.commit('getUser', res.data.data.username);
            //     alert(this.$store.state.user);
            //     this.$router.push({path: '/card'});
            //   }else{
            //     alert(res.data.msg);
            //   }
            // }).catch(function (error) {
            //   console.log(error);
            // });
            this.$store.dispatch('Login', userInfo);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #2d3a4b;

  .login-form{
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px;
    margin: 120px auto;
  }

  .title{
    margin: 0 auto 40px;
    font-size: 26px;
    font-weight: 700;
    color: #eee;
    text-align: center;
  }
}
</style>
