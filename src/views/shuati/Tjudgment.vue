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
            <el-button type="primary" plain @click="try_once" class="btn">获取题目</el-button>
          </div>
        </div>
        {{title}}
        <div class="answer-box">
          <div class="answer">
            <el-radio v-model="myAnswer"  :label="answerA" border>对。</el-radio>
          </div>
          <div class="answer">
            <el-radio v-model="myAnswer" :label="answerB" border>错。</el-radio>
          </div>


          <div class="answer"> <el-button ref="commit" type="primary" plain @click="commit()" :disabled="disabled">立即提交</el-button>
            <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
              点我打开错题记录
            </el-button>
          </div>

        </div>

        <el-drawer
          title="错题记录"
          :visible.sync="drawer"
          :with-header="false">
          <span>错题记录!</span>
          <div class="answer">
            <Wrongs></Wrongs>
          </div>
        </el-drawer>
      </el-card>

    </el-col>

  </div>
</template>

<script>
  import { findData } from '@/api/tJudgment'
  import Wrongs from '../../components/Wrongs/wrongs'
  export default {
      name: "Tjudgment",
       //新建错题组件
    components:{
      Wrongs
    },
    data() {
      return {
        count:0,
        input1: 0,
        color:'red',
        alert1:false,
        title: '暂无数据', // 题中内容
        answerA: 'A', // A答案
        answerB: 'B', // B答案
        correctAnswer:'',
        id: 0, // 题号 题库里的第几题
        index: 0, // 题序 本次练习答题第几题
        myAnswer: '', // 用户选择的答案
        disabled: false, // 提交按钮状态
        statusnow:0,
        drawer: false,
        //添加一个存储错题id的数组
        wrongs:[]
      }
    },
    methods:{
      //获取测试
      try_once: async function () {
        //获取数据
        const {data} = await findData(this.input1)
        //获取数据之后赋值
        this.title = data.data.tJudgment.topic
        this.id = data.data.tJudgment.id
        this.correctAnswer = data.data.tJudgment.correctanswer
      },

      commit:function () {
        if(this.myAnswer != ''){
          if(this.myAnswer === this.correctAnswer ){
            this.$message.success("回答正确")
            this.index ++
            this.input1 ++
            this.try_once()
          }else{
            this.$message.warning("回答错误")
            //todo 记录回答错误的题号并标记 生成带有id的按钮，点击直接查看错误的题目 并且有正确答案
            this.wrongs.push(this.input1)
            console.log(this.wrongs)
          }
        }

      }
    }

  }
</script>

<style lang="less">
  .input {
    width: 200px;
    border-radius: 4px;
  }
  .btn{
    border-radius: 4px;
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
