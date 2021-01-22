<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
             label-position="right">
      <el-row>
        <el-col :span="6">
          <el-form-item label="开始题号" prop="startNum">
            <el-input v-model="formData.startNum" placeholder="请输入开始题号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="刷题数" prop="tCount">
            <el-input v-model="formData.tCount" placeholder="请输入刷题数" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">开始</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-card class="box-bg">
          <el-card>
            <div class="tag-group">
              <el-tag type="success">
                答对：{{ countRight }}
              </el-tag>
              <el-tag type="danger">
                答错：{{ countError }}
              </el-tag>
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" >
              <div class="topic" >
                <div class="tips">
                  <span style="font-family: 华文行楷,serif;font-size: x-large">现在答题第 <span style="color: darkcyan">{{index}}</span> 题，在题库中第 <span style="color: darkcyan">{{id}}</span> 题</span>
                </div>
                {{title}}
              </div>
            </div>
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
          </el-card>
        </el-card>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { findSingle } from '@/api/tSingle'

export default {
  components: {},
  props: [],
  data () {
    const validateNumber = (rule, value, callback) => {
      const numberReg = /^\d+$|^\d+[.]?\d+$/
      if (value !== '') {
        if (!numberReg.test(value)) {
          callback(new Error('请输入数字'))
        } else if (value == 0) {
          callback(new Error('请输入大于0的数字'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入值'))
      }
    }
    return {
      disabled: true, // 提交按钮状态
      id: 0, // 题号 题库里的第几题
      index: 0, // 题序 本次练习答题第几题
      countIndex: 0, // 当前题答题次数
      countRight: 0, //答对次数
      countError: 0, // 答错次数
      title: '暂无数据', // 题中内容
      answerA: '暂无数据1', // A答案
      answerB: '暂无数据2', // B答案
      answerC: '暂无数据3', // C答案
      answerD: '暂无数据4', // D答案
      myAnswer: '', // 用户选择的答案
      correctAnswer: '', // 正确答案
      formData: {
        startNum: undefined, // 练习开始的题号
        tCount: undefined // 练习总数
      },
      // 表单验证
      rules: {
        // 开始题号
        startNum: [{
          validator: validateNumber,
          trigger: 'blur'
        }],
        // 练习总数
        tCount: [{
          required: true,
          message: '请输入刷题数',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
  },
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    // 提交答案
    commit(){
      if(this.myAnswer === this.correctAnswer ){
        if(this.countIndex === 0 ){
          this.countRight++ // 答对次数
        }
        this.$message({
          message: '恭喜你，答对了',
          type: 'success',
          center: true
        })
        // 判断是否练习完成
        if(this.index < this.formData.tCount){
          this.id++ // 下一题
          this.index++ //本次练习的序号+1
          this.getSingle()
        }else {
          this.$notify({
            title: '成功',
            message: '恭喜你，练习完成',
            type: 'success'
          })
          this.disabled = true; // 练习完成后提交按钮不可用
        }
        this.countIndex = 0 //归0
      }else {
        if(this.countIndex === 0 ){
          this.countError++ // 答错次数
        }
        this.$message({
          message: '很遗憾，答错了',
          type: 'error',
          center: true
        })
        this.countIndex++ //当前题答题次数
      }
    },
    // 提交开始题号和训练总数
    submitForm () {
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        this.id = this.formData.startNum
        this.index = 1;
        this.countError = 0;
        this.countRight = 0;
        this.getSingle()
      })
      this.disabled = false;
    },
    // 获取单选题
    getSingle: async function () {
      const { data } = await findSingle(this.id)
      this.title = data.data.tSingle.topic
      this.id = data.data.tSingle.id
      const arr = [data.data.tSingle.answera,data.data.tSingle.answerb,data.data.tSingle.answerc,data.data.tSingle.answerd]
      // 随机数组 进行回显选项 避免每次题目选项位置一样
      arr.sort(function (){
        return 0.5 - Math.random()
      })
      this.answerA = arr[0]
      this.answerB = arr[1]
      this.answerC = arr[2]
      this.answerD = arr[3]
      this.correctAnswer = data.data.tSingle.answera
    },
    // 重置表单
    resetForm () {
      this.$refs.elForm.resetFields()
    }
  }
}

</script>
<style lang="less">


.box-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  .tag-group{
    display: flex;
    justify-content: space-around;
  }
}

.box-card {
  width: 500px;
.tips{
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
</style>
