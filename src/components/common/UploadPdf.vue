<template>
  <div class="flex flex-column">
    <div class="flex justify-left align-center" style="height: 100%;width: 100%">
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
          :auto-upload="false"
          name="pdf"
          multiple
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <el-button style="margin-left: 20px;" type="success" @click="submitUpload">确认上传</el-button>
        <template #tip>
          <div class="el-upload__tip">只能上传 pdf 文件，且不超过 2M</div>
        </template>
      </el-upload>
    </div>
    <el-button v-if="fileUrl != ''" type="primary" style="margin-top: 20px" @click="checkUploaded">查看已上传文件</el-button>
  </div>
</template>

<script>
import store from "../../store";
import {ElMessage} from "element-plus";
export default {
name: "UploadPdf",
  data() {
    return {
      fileList:[],
      fileUrl:'',
      fileName:'',
    };
  },
  methods:{
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
      this.$emit('getUrl',this.fileUrl)
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf';
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file.type)
      if (!isPDF) {
        this.$message.error('只能上传pdf格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传附件大小不能超过 2MB!');
      }
      return isPDF && isLt2M;
    },
    checkUploaded(){
      window.open(this.fileUrl);
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
      return this.axios.defaults.baseURL + '/web/upload/pdf'
    }
  },
}
</script>

<style scoped>

</style>