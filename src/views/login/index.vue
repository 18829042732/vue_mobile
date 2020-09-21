<template>
  <div class="login-container">
    <!-- NavBar 导航栏 -->
    <van-nav-bar title="登陆" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- form 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        maxlength="11"
        :rules="userFormRules.mobile"
        type="number"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 30"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="primary"
            round
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
// import router from '@/router'
export default {
  data() {
    return {
      user: {
        mobile: '18888888888',
        code: '246810'
      },
      isCountDownShow: false,
      // 表单规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },
  methods: {
    // 登陆表单
    async onSubmit() {
      // 1.展示登陆中
      this.$toast.loading({
        message: '登录中...', // 提示消息
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true // 是否禁止背景点击
      })
      // 2.请求登陆
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        console.log('登陆成功')
        this.$toast.success('登录成功')
        this.$router.push('/')
        // 登录成功，跳转回原来页面
        // this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 验证手机号
    async onSendSms() {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 172px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border: none;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .van-field__left-icon {
    width: 37px;
  }
}
</style>
