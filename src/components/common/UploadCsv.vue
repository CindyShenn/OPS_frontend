<template>
  <div class="flex justify-center align-center" style="height: 100%;width: 100%">

    <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadUrl"
        :headers="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        name="csv"
        :data="uploadData(courseId)"
        multiple
    >
      <el-button type="primary">选择文件</el-button>
      <template #tip>
        <div class="el-upload__tip">请按照学生导入模板上传文件，且不超过 2M</div>
      </template>
    </el-upload>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import store from "../../store";

export default {
name: "UploadCsv",
  props:['courseId'],
  data() {
    return {
      fileList:[],
      fileUrl:'',
      fileName:'',
    };
  },
  methods:{

    uploadData(Id) {
      let data = {
            courseId:Id
      }
     return data
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.fileName=file.name;
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(res) {
      console.log(res)
      ElMessage.success({
        message: '附件上传成功！',
        type: 'success'
      });
      this.fileUrl = 'http://'+res.data.url;
      console.log(this.fileUrl)
      this.$emit('reload','reload')
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/vnd.ms-excel';
      console.log(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPDF) {
        this.$message.error('只能上传rar格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传附件大小不能超过 2MB!');
      }
      return isPDF&&isLt2M;
    },
  },
  computed: {
    // 设置请求头
    headers() {
      return {
        // 设置Content-Type类型为multipart/form-data
        'ContentType': 'multipart/form-data',
        // 设置token
        'Authorization':'Bearer '+ store.state.token
      }
    },
    // 设置上传地址
    uploadUrl() {
      // baseURL是axios的基本路径
      return this.axios.defaults.baseURL + '/web/course/student/import'
    }
  },
}
</script>

<style scoped>
.upload-demo{
  display: flex;
  flex-direction: column;
}
</style>