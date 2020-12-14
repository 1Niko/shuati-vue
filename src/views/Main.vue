<template>
  <el-container class="main_container">
    <el-header>
      <!--logo和侧边栏控制-->
      <div class="left_box">
        <img src="../assets/img/索隆.gif" alt="头像">
        <span>xxx系统</span>
        <hamburger id="hamburger-container"  :is-active="opened" class="hamburger-container" @toggleClick="collapseStatus()" />
      </div>
      <!--头像-->
      <div class="right_box">
        <!--下拉菜单-->
        <el-dropdown>
          <img src="../assets/img/索隆.gif" alt="头像">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-house">系统首页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-user">个人资料</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import Hamburger from '../components/Hamburger/index.vue'
export default {
  name: 'Main',
  components:{
    Hamburger
  },
  data () {
    return {
      isCollapse: true,
      opened: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    collapseStatus () {
      this.isCollapse = !this.isCollapse
      this.opened = !this.opened
    },
  }
}
</script>

<style lang="less" scoped>
.main_container {
  height: 100%;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  display: flex;
  justify-content: space-between;
  .left_box {
    display: flex;
    align-items: center;
    font-size: 20px;
    button{
      size: 20px;
      background-color: #B3C0D1;
    }
    img{
      width: 60px;
      height: 60px;
    }
  }

  .right_box {
    margin-right: 30px;
    img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background .3s;
  -webkit-tap-highlight-color:transparent;

  &:hover {
    background: rgba(0, 0, 0, .025)
  }
}
</style>
