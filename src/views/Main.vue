<template>
  <el-container class="main_container">
    <el-header>
      <!--logo和侧边栏控制-->
      <div class="left_box">
        <img src="../assets/img/索隆.gif" alt="头像">
        <span>xxx系统</span>
        <hamburger id="hamburger-container"  :is-active="isOpened" class="hamburger-container" @toggleClick="collapseStatus()" />
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
      <el-aside :width="isCollapse?'65px':'201px'">
        <el-menu default-active="1-253" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" :unique-opened="opened" :collapse-transition="false" :router="true">
          <MenuTree :menu-list="this.menuList"></MenuTree>
        </el-menu>
      </el-aside>
      <el-main>
        <!--路由视图-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Hamburger from '../components/Hamburger/index'
import MenuTree from '../components/MenuTree/index'
export default {
  name: 'Main',
  components: {
    Hamburger,
    MenuTree
  },
  data () {
    return {
      activePath: '',
      isCollapse: false,
      opened: true,
      isOpened: true,
      menuList: [
        {
          id: 1,
          parentId: 0,
          menuName: '系统管理',
          url: '',
          icon: 'el-icon-setting',
          orderNum: 1,
          open: 1,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 253,
              parentId: 1,
              menuName: '欢迎页面',
              url: '/welcome',
              icon: 'el-icon-star-off',
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: 'map:view',
              // perms: 'welcome:view',
              type: 0,
              children: []
            },
            {
              id: 226,
              parentId: 1,
              menuName: '用户管理',
              url: '/users',
              icon: 'el-icon-user',
              orderNum: 2,
              open: 0,
              disabled: false,
              perms: 'users',
              type: 0,
              children: []
            },
            {
              id: 4,
              parentId: 1,
              menuName: '菜单权限',
              url: '/menus',
              icon: 'el-icon-help',
              orderNum: 3,
              open: 0,
              disabled: false,
              perms: null,
              type: 0,
              children: []
            },
            {
              id: 235,
              parentId: 1,
              menuName: '角色管理',
              url: '/roles',
              icon: 'el-icon-postcard',
              orderNum: 3,
              open: 0,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            },
            {
              id: 319,
              parentId: 1,
              menuName: '公告管理',
              url: '/notices',
              icon: 'el-icon-s-flag',
              orderNum: 4,
              open: 0,
              disabled: true,
              perms: '',
              type: 0,
              children: []
            }
          ]
        },
        {
          id: 303,
          parentId: 0,
          menuName: '题库管理',
          url: '',
          icon: 'el-icon-platform-eleme',
          orderNum: 3,
          open: 0,
          disabled: false,
          perms: '',
          type: 0,
          children: [
            {
              id: 273,
              parentId: 303,
              menuName: '单选题',
              url: '/single',
              icon: 'el-icon-s-opportunity',
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: 'map:view',
              type: 0,
              children: []
            },

            {
              id: 304,
              parentId: 303,
              menuName: '多选题',
              url: '/health',
              icon: 'el-icon-s-cooperation',
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: 'map:view',
              type: 0,
              children: []
            },
            {
              id: 305,
              parentId: 303,
              menuName: '判断题',
              url: '/judgment',
              icon: 'el-icon-c-scale-to-original',
              orderNum: 2,
              open: 1,
              disabled: false,
              perms: 'map:view',
              type: 0,
              children: []
            },
            {
              id: 272,
              parentId: 303,
              menuName: '解答题',
              url: '/rumors',
              icon: 'el-icon-help',
              orderNum: 5,
              open: 0,
              disabled: false,
              perms: null,
              type: 0,
              children: []
            }
          ]
        },
        {
          id: 295,
          parentId: 0,
          menuName: '其他管理',
          url: '',
          icon: 'el-icon-s-marketing',
          orderNum: 5,
          open: 0,
          disabled: false,
          perms: '',
          type: 0,
          children: [
            {
              id: 297,
              parentId: 295,
              menuName: '监控管理',
              url: '',
              icon: 'el-icon-warning',
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: '',
              type: 0,
              children: [
                {
                  id: 298,
                  parentId: 297,
                  menuName: 'SQL监控',
                  url: '/druid',
                  icon: 'el-icon-view',
                  orderNum: 1,
                  open: 0,
                  disabled: false,
                  perms: null,
                  type: 0,
                  children: []
                }
              ]
            },
            {
              id: 341,
              parentId: 295,
              menuName: '个人博客',
              url: '/blog',
              icon: 'el-icon-view',
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            },
            {
              id: 296,
              parentId: 295,
              menuName: 'swagger文档',
              url: '/swagger',
              icon: 'el-icon-document',
              orderNum: 2,
              open: 0,
              disabled: false,
              perms: null,
              type: 0,
              children: []
            },
            {
              id: 318,
              parentId: 295,
              menuName: '图标管理',
              url: '/icons',
              icon: 'el-icon-star-off',
              orderNum: 2,
              open: 1,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            }
          ]
        },
        {
          id: 5,
          parentId: 0,
          menuName: '日志管理',
          url: '/logs',
          icon: 'el-icon-camera',
          orderNum: 6,
          open: 0,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 271,
              parentId: 5,
              menuName: '登入日志',
              url: '/loginLog',
              icon: 'el-icon-date',
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: 'login:log',
              type: 0,
              children: []
            },
            {
              id: 307,
              parentId: 5,
              menuName: '操作日志',
              url: '/logs',
              icon: 'el-icon-edit',
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    collapseStatus () {
      this.isCollapse = !this.isCollapse
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="less" scoped>
.main_container {
  height: 100%;
}

.el-header {
  background-color: #d0dfe6;
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
      width: 58px;
      height: 58px;
      border-radius: 50%;
    }
  }
}

.el-aside {
  background-color: #ffffff;
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
