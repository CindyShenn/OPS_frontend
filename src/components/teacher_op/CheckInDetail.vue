<template>
  <div id="check-in-detail">
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <div id="check-in-detail-table">
            <el-table
                :data="check_in_detail"
                style="width: 100%">
              <el-table-column
                  prop="num"
                  label="学生学号">
              </el-table-column>
              <el-table-column
                  prop="real_name"
                  label="学生姓名">
              </el-table-column>
              <el-table-column
                  prop="organization"
                  label="学生班级">
              </el-table-column>
              <el-table-column
                  label="是否签到">
                <template #default="scope">
                  <el-tag v-if="scope.row.is_check_in == true" type="success">已签到</el-tag>
                  <el-tag v-if="scope.row.is_check_in == false" type="danger">未签到</el-tag>
                  <el-button @click="modifyCheckInDialog(scope.row.stu_id,scope.row.is_check_in)" type="text" style="margin-left: 20px">修改</el-button>
                  <el-dialog title="修改该学生签到情况" v-model="modifyCheckInDialogFormVisible">
                    <el-radio-group v-model="temp_isCheckIn" class="flex align-left">
                      <el-radio :label=true>已签到</el-radio>
                      <el-radio :label=false>未签到</el-radio>
                    </el-radio-group>
                    <template #footer>
    <span class="dialog-footer">
      <el-button @click="modifyCheckInDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="changeCheckIn()">确 定</el-button>
    </span>
                    </template>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "CheckInDetail",
  data(){
    return{
      check_in_radio:1,
      check_in_detail:[
        {
          num:'001',
          real_name:'王小明',
          stu_id:'001',
          organization:'计科1班',
          is_check_in:false,
        }
      ],
      modifyCheckInDialogFormVisible:false,
      temp_stuId :'',
      temp_isCheckIn:'',
    }
  },
  methods:{
    modifyCheckInDialog(stuId,isCheckIn){
      this.modifyCheckInDialogFormVisible=true;
      this.temp_stuId=stuId;
      this.temp_isCheckIn=isCheckIn;
    },
    changeCheckIn(){
      this.modifyCheckInDialogFormVisible=true;
      let that = this
      this.axios({
        method: "put",
        url: "/web/checkin/detail",
        data: {
          stuId: that.temp_stuId,
          checkinRecordId: that.$route.params.id,
          isCheckIn:that.temp_isCheckIn,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '修改成功！',
              type: 'success'
            });
          } else {
            let message = res.data.message;
            console.log(message)
            ElMessage.error(message);
          }
        } else {
          ElMessage.error('服务器错误');
        }
      });
    }
  },
}
</script>

<style scoped>
#check-in-detail {
  width: 100%;
}

#body {
  width: 100%;
}

#check-in-detail-table {
  width: 100%;
}

</style>