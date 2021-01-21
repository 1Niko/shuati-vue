<template >
  <fragment>
    <template v-for="item in this.menuList">
      <el-submenu :disabled="item.disabled" :index="item.parentId==0?item.id.toString():item.parentId+'-'+item.id"
                  v-if="item.children.length>0">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
        <MenuTree :menuList="item.children"></MenuTree>
      </el-submenu>
      <el-menu-item
        v-else
        :disabled="item.disabled"
        :index="item.parentId==0?item.id.toString():item.parentId+'-'+item.id"
        :route="item.url"
        @click="savePath(item.url)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
export default {
  name: 'MenuTree',
  props: ['menuList'],
  methods: {
    //保存激活路径
    savePath (path) {
      window.sessionStorage.setItem('activePath', path)
      console.log(path)
      //调用Main.vue的activePath
      this.activePath = path
    },
  }
}
</script>

<style scoped>

</style>
