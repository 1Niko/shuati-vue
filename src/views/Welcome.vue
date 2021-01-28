<template>
<div>
    <el-col :span="8" :offset="8">
      <el-card class="box-card">
        <div slot="header" class="header">
          <div class="topic" >
            <div class="tips">
              <span style="font-family: 华文行楷,serif;font-size: x-large">现在答题第 <span style="color: darkcyan">{{index}}</span> 题，在题库中第 <span style="color: darkcyan">{{id}}</span> 题</span>
            </div>
            <el-input placeholder="edit me" v-model="input1" class="input"></el-input>
            <el-tag v-bind:class="color">现在是第{{input1}}题</el-tag>

          </div>
        </div>
        {{title}}
        <div class="answer-box">
          <div class="answer">
            <el-radio v-model="myAnswer"  :label="answerA" border>A. {{ answerA }}</el-radio>
          </div>
          <div class="answer">
            <el-radio v-model="myAnswer" :label="answerB" border>B. {{ answerB }}</el-radio>
          </div>
          <div class="answer">
            <el-radio v-model="myAnswer" :label="answerC" border>C. {{ answerC }}</el-radio>
          </div>
          <div class="answer">
            <el-radio v-model="myAnswer" :label="answerD" border>D. {{ answerD }}</el-radio>
          </div>
          <div class="answer"> <el-button ref="commit" type="primary" plain @click="commit()" :disabled="disabled">立即提交</el-button></div>
        </div>
        <el-button type="primary" plain @click="try_once">Try Once</el-button>
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
          点我打开
        </el-button>
        <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :with-header="false">
          <span>我来啦!</span>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="statusnow"></el-progress><br>
          <el-button type="primary" @click="add">+++++</el-button>
          <el-button type="primary" @click="sub">-----</el-button>
        </el-drawer>
      </el-card>

    </el-col>

  </div>
</template>

<script>
  import { findData } from '@/api/tJudgement'
    export default {
        name: "Welcome",
      data() {
        return {
          input1: '',
          color:'red',
          alert1:false,
          title: '暂无数据', // 题中内容
          answerA: '暂无数据1', // A答案
          answerB: '暂无数据2', // B答案
          answerC: '暂无数据3', // C答案
          answerD: '暂无数据4', // D答案
          id: 0, // 题号 题库里的第几题
          index: 0, // 题序 本次练习答题第几题
          myAnswer: '', // 用户选择的答案
          disabled: true, // 提交按钮状态
          statusnow:0,
          drawer: false
        }
      },
      methods:{
          //获取测试
          try_once: async function (res) {
            if(this.input1==null||this.input1==''){
              this.$message({
                message:'来点实在的！',
                type: 'info'
              })
            }else{
              if(this.color == 'red'){
                this.color = 'blue'
              }else if(this.color == 'blue'){
                this.color = 'red'
              }

              //测试获取数据
              const {data} = await findData(this.input1)

              //获取数据之后赋值
              this.title = data.data.tJudgement.topic
              this.id = data.data.tJudgement.id
              //创建数组 接受数组
              const arr = [data.data.tJudgement.answera,data.data.tJudgement.answerb,data.data.tJudgement.answerb,data.data.tJudgement.answerc,data.data.tJudgement.answerd]
              //把数组随机
              arr.sort(function () {
                return 0.5 - Math.random()
              })
              //把数值渲染到vue界面上
              this.answerA = arr[0]
              this.answerB = arr[1]
              this.answerC = arr[2]
              this.answerD = arr[3]
            }


          },
          add: function () {
            this.statusnow += 10
          },
          sub: function () {
            this.statusnow -=10
          }
      }
    }
</script>

<style lang="less">
.red{
  color:red;

}
.blue{
    color: blue;
}
.input {
  width: 200px;
}
.box-card {
  width: 500px;
  .tip{
    height: 20px;
    margin-bottom: 20px;
  }
  .topic{
    display: inline-block;
    line-height: 30px;
    height: 200px;
  }
  .answer-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .answer {
      display: flex;
      margin-bottom: 10px;
      .el-radio{
        justify-content: start;
        width: 460px;
      }
    }

  }
}
.header{
  height: 100px;
}
.box-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  .tag-group{
    display: flex;
    justify-content: space-around;
  }
}
</style>
