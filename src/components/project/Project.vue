<template>
  <div id="project">
    <div id="main" class="flex flex-column" style="align-items: center">
      <div id="current-project" hidden="hidden" class="flex justify-center" style="margin-top: 60px">
        <div id="current-project-card" hidden="hidden">
          <div id="current-project-content" class="flex flex-column align-start"
               style="margin:30px 30px;color: #FFFFFF">
            <span style="font-size: 30px;font-weight:600">工作空间</span>
            <span style="margin-top: 15px;font-size: 20px">项目：{{ projects[currentIndex].project_name }}</span>
            <span style="margin-top: 15px;font-size: 20px">环境：</span>
            <span style="text-align: left;margin-top: 5px;font-size: 20px">{{ projects[currentIndex].project_env }}</span>
            <span style="margin-top: 15px;font-size: 20px">链接：{{ projects[currentIndex].project_link }}</span>
            <span style="margin-top: 15px;font-size: 20px">密码：{{ projects[currentIndex].project_pwd }}</span>
            <span style="margin-top: 15px;font-size: 20px">关闭时间：{{ projects[currentIndex].close_time }}</span>
            <div class="flex justify-between" style="width: 100%;margin-top: 25px">
              <el-button type="primary" >进入</el-button>
              <el-button type="danger">关闭</el-button>
            </div>
          </div>
        </div>
      </div>
      <div id="project-list" class="flex flex-row wrap justify-between" style="margin-top: 10px">
        <div v-for="(item, index) in projects" style="width: 40%;margin-top: 40px">
          <div id="single-project" class="flex flex-column align-start">
            <div class="flex flex-column align-start justify-between"
                 style="margin-top: 15px;margin-left: 15px;height: 100%;width: 90%">
              <span style="font-size: 25px;font-weight:600">{{ item.project_name }}</span>
              <span style="font-size: 15px;text-align: left">{{ item.project_description }}</span>
              <div class="flex justify-between" style="width: 100%">
                <el-button type="primary" style="margin-bottom: 10px" @click="openCurrent(index)">进入</el-button>
                <div>
                  <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
                  <el-dialog title="编辑项目" v-model="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="项目名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="项目描述" :label-width="formLabelWidth">
                        <el-input v-model="form.description" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </span>
                    </template>
                  </el-dialog>
                  <el-button type="danger" icon="el-icon-delete" circle style="margin-left: 15px" @click="confirmDelete"></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      working_space_info: {
        project_name: "demo project 1",
        project_env: "Debian GNU/Linux 10 (buster) gcc(8.3.0),openjdk(1.8.0_252)",
        project_link: "10.232.123.2:8001",
        project_pwd: "rjo234fsOli90j",
        close_time: "2021-8-8 11:08:32",
        project_description: "description",
      },
      projects: [
        {
          project_name: "demo project 1",
          project_env: "Debian GNU/Linux 10 (buster) \n gcc(8.3.0),openjdk(1.8.0_252)",
          project_link: "10.232.123.2:8001",
          project_pwd: "rjo234fsOli90j",
          close_time: "2021-8-8 11:08:32",
          project_description: "description for project 1",
        },
        {
          project_name: "demo project 2",
          project_env: "Debian GNU/Linux 10 (buster) \n gcc(8.3.0),openjdk(1.8.0_252)",
          project_link: "10.232.123.2:8001",
          project_pwd: "rjo234fsOli90j",
          close_time: "2021-8-8 11:08:32",
          project_description: "description for project 2",
        },
        {
          project_name: "demo project 3",
          project_env: "Debian GNU/Linux 10 (buster) \n gcc(8.3.0),openjdk(1.8.0_252)",
          project_link: "10.232.123.2:8001",
          project_pwd: "rjo234fsOli90j",
          close_time: "2021-8-8 11:08:32",
          project_description: "description for project 3",
        },
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        description: '',
      },
      formLabelWidth: '120px',
      currentIndex:0
    }
  },
  methods: {
    confirmDelete() {
      this.$confirm('此操作将永久删除该工作空间, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    openCurrent(index){
      let vDiv = document.getElementById("current-project-card");
      vDiv.style.display = 'block';
      this.currentIndex=index
    }
  }
}
</script>

<style scoped>
#project {
  width: 100%;
  height: 100%;
}

#main {
  height: 100%;
  width: 100%;
  background: #3589BF;
}

#current-project-card {
  width: 400px;
  height: 420px;
  background: #2c3e50;
  box-shadow: 0px 0px 15px 0px #504d5f;
  border-radius: 10px;
}

#single-project {
  height: 150px;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  border-radius: 10px;
}

#project-list {
  width: 70%;
}
</style>