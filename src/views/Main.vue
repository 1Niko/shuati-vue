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
      <el-aside :width="isCollapse?'200px':'60px'">
          <MenuTree :menu-list="this.menuList" :is-collapse="opened"></MenuTree>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import Hamburger from '../components/Hamburger/index'
import MenuTree from '../components/MenuTree/index'
export default {
  name: 'Main',
  components:{
    Hamburger,
    MenuTree
  },
  data () {
    return {
      menuList: [],
      isCollapse: false,
      opened: true
    }
  },
  methods: {

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
    img{
      width: 60px;
      height: 60px;
      margin: 10px 0 10px 0;
    }
    span{
      margin-left: 15px;
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
