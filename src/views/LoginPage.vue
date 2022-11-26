<template>
  <div class="container">
    <div class="img-container">
      <img src="../assets/imgs/login_img.png" alt="" />
    </div>
    <div class="form-container">
      <div class="img-box">
        <img src="../assets/imgs/login_logo.png" />
      </div>
      <h2>电商上后台管理系统</h2>
      <form @submit="handleSubmit">
        <div class="input-box">
          <input
            type="text"
            placeholder="用户名"
            v-model="username"
            :class="this.username.length > 2 ? '' : 'warning'"
          />
          <span :class="this.username.length > 2 ? '' : 'show'">{{
            nameWarningMsg
          }}</span>
        </div>
        <div class="input-box">
          <input
            type="password"
            placeholder="密码"
            v-model="password"
            :class="this.password.length > 2 ? '' : 'warning'"
          />
          <span :class="this.password.length > 2 ? '' : 'show'">{{
            passwordWarningMsg
          }}</span>
        </div>
        <input type="submit" class="btn" value="登录" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      password: "123456",
    };
  },
  methods: {
    handleSubmit() {
      // this.$router.push({ path: '/home' });

      if (this.nameWarningMsg || this.passwordWarningMsg) {
        this.$message({
          message: "请正确输入用户名和密码",
          showClose: true,
          duration: 2000,
          type: "error",
        });
      } else {
        this.$api.login(this.username, this.password).then((data) => {
          console.log(data);
          if (data.meta.status < 400) {
            this.$message({
              message: "登陆成功",
              showClose: true,
              duration: 2000,
              type: "success",
            });
            sessionStorage.setItem("token", data.data.token);
            this.$router.push({ path: "/home" });
          }
        });
      }
    },
  },
  computed: {
    nameWarningMsg() {
      if (this.username.length == 0) {
        return "请输入登录用户名";
      } else if (this.username.length < 3) {
        return "用户名长度应该大于3";
      } else {
        return "";
      }
    },
    passwordWarningMsg() {
      if (this.password.length == 0) {
        return "请输入登录密码";
      } else if (this.password.length < 3) {
        return "密码长度应该大于3";
      } else {
        return "";
      }
    },
    nameStyling() {
      return this.username.length > 3 ? "opacity:100%" : "opacity:0%";
    },
    passwordStyling() {
      return this.username.length > 3 ? "opacity:100%" : "opacity:0%";
    },
  },
};
</script>

<style scoped>
.container {
  background-color: var(--info);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
}
.img-container,
.form-container {
  height: 50%;
  width: 40%;
  margin: 0 1.5rem;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  min-width: 350px;
}

.img-container {
  max-width: 550px;
}

.img-container img {
  width: 100%;
  height: 100%;
}

.form-container {
  border-radius: 4px;
  background-color: white;
  height: 45%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  min-width: 350px;
  position: relative;
}

form {
  text-align: start;
  width: 100%;
}

h2 {
  margin-top: 20px;
}

form .input-box {
  width: 100%;
  position: relative;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.75rem 0;
  border-radius: 4px;
  border: 1px solid var(--info);
  transition: 0.3s;
}

input:focus {
  outline: none !important;
  border: 1px solid var(--first);
}

.warning {
  border: 1px solid var(--danger) !important;
}

.btn {
  border-radius: 4px;
  background-color: var(--first);
  border: none;
  color: white;
  font-weight: 800;
}

span {
  position: absolute;
  left: 0;
  bottom: -0.75rem;
  color: var(--danger);
  transform: translateY(-100%);
  transition: 0.15s;
}

.show {
  transform: translateY(0%);
}

.img-box {
  position: absolute;
  transform: translateY(-175%);
  height: 30%;
  width: 30%;
  border-radius: 50%;
  border: 6px solid var(--info);
  z-index: 9999;
  background-color: white;
}

.img-box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>