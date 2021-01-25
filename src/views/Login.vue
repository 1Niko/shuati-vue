<template>
  <!--登录表单的容器-->
  <div class="login_container">
    <!--登录区域-->
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/img/索隆.gif">
      </div>
      <!--表单-->
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="login_form">
        <el-form-item prop="username">
          <el-input type="text" prefix-icon="el-icon-user-solid" v-model="loginForm.username" autocomplete="on"
                    placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password" autocomplete="off"
                    placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <div class="verify_box">
            <el-input type="text" prefix-icon="el-icon-mobile" v-model="loginForm.verifyCode" autocomplete="off"
                      placeholder="验证码" class="verify_code"></el-input>
            <img :src="captcha" alt="验证码" class="verify_img">
          </div>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/captcha'

export default {
  name: 'Login',
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    let validateVerifyCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      captcha: '',
      loginForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      loginRules: {
        username: [
          {
            validator: validateName,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        verifyCode: [
          {
            validator: validateVerifyCode,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.findCaptcha()
  },
  methods: {
    findCaptcha: async function () {
      const { data } = await getCaptcha()
      this.captcha = data.data.image
      console.info(data.data.key)
    },

    submitForm (Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          this.$router.push('Main')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (Form) {
      this.$refs[Form].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #42b983;
}

.login_box {
  width: 450px;
  height: 380px;
  background-color: #FFFFFF;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eeeeee;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    margin: -65px auto;

    img {
      width: 100%;
      height: 100%;
      background-color: #eeeeee;
      border-radius: 50%;
    }
  }

  .login_form {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .login_btn {
      display: flex;
      justify-content: flex-end;
    }

    .verify_box {
      display: flex;

      .verify_code {
        width: 60%;
        justify-content: left;
      }

      .verify_img {
        height: 45px;
        width: 40%;
        justify-content: flex-end;
      }
    }

  }

}
</style>
