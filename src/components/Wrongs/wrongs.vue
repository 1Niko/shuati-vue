<template>
  <el-button @click="countFun" type="primary"> You click me {{count}} times</el-button>
</template>

<script>
    export default {
        name: "wrongs",
        props:['title'],
        data:function () {
          return{
            count :0
          }
        },
        methods:{
          countFun : function(){
            this.count++;
            // 让组件接受值
            this.$emit('clicknow',this.count)
          }
        }

    }
</script>

<style scoped>

</style>
