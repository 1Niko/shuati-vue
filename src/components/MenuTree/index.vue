<template>
  <div>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" :unique-opened="opened" :collapse-transition="false" v-for="(item,index) in this.menuList" :key="index">
      <el-submenu :disabled="item.disabled" :index="item.id+''" v-if="item.children.length>0">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
        <MenuTree :menuList="item.children"></MenuTree>
      </el-submenu>
      <el-menu-item
        v-else
        :disabled="item.disabled"
        :index="item.url+''"
        :route="item.url+''"
        :key="item.id"
        @click="savePath(item.url)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: ["menuList","isCollapse","opened"],
  methods:{
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    //保存激活路径
    savePath(path) {
        window.sessionStorage.setItem("activePath", path);
        //调用Main.vue的activePath
        this.activePath = path;
    },
  }
}
</script>

<style scoped>

</style>
