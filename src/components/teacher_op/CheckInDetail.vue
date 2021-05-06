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
                  <el-switch
                      style="display: block; margin-left: 20px"
                      :value="scope.row.is_check_in"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                      @change="changeCheckIn(scope.row.user_id,scope.row.is_check_in)"
                  >
                  </el-switch>
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
      check_in_detail:[],
      modifyCheckInDialogFormVisible:false,
      temp_stuId :'',
      temp_isCheckIn:'',
    }
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/web/checkin/details",
      params: {
        pageCurrent: 1,
        pageSize: 50,
        checkInRecordId: this.$route.params.id
      },
    }).then((res) => {
      console.log(res)
      this.check_in_detail = res.data.data.records;
    });
  },
  methods:{
    modifyCheckInDialog(stuId,isCheckIn){
      this.modifyCheckInDialogFormVisible=true;
      this.temp_stuId=stuId;
    },
    changeCheckIn(id,is_check){
      //this.modifyCheckInDialogFormVisible=false;
      let that = this
      //let is_check = true ? this.temp_isCheckIn==1 : false
      this.axios({
        method: "put",
        url: "/web/checkin/detail",
        data: {
          stuId: id,
          checkinRecordId: that.$route.params.id,
          isCheckIn:!is_check,
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