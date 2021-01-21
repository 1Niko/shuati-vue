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
      <el-row >
        <el-card class="box-bg">
          <el-card class="box-card" >
            <div slot="header" class="clearfix">
              <span :title="title">题目是：{{title}}</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
            <div></div>
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
          // eslint-disable-next-line eqeqeq
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
      title: '题目',
      formData: {
        startNum: undefined,
        field105: undefined
      },
      rules: {
        startNum: [{
          validator: validateNumber,
          trigger: 'blur'
        }],
        tCount: [{
          required: true,
          message: '请输入刷题数',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    submitForm () {
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        this.getSingle()
      })
    },
    getSingle: async function () {
      const { data } = await findSingle(this.formData.startNum)
      this.title = data.data.tSingle.topic
      console.info(data)
    },
    resetForm () {
      this.$refs.elForm.resetFields()
    }
  }
}

</script>
<style lang="less">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  height: 90px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-bg{
  display: flex;
  justify-items: center;
  justify-content: center;
}
.box-card {
  width:450px;
}
</style>
