<template>
  <div id="teacher-class">
    <div id="main" class="flex align-center justify-center">
      <div id="teacher-class-card" class="flex flex-column justify-between" >
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin: 15px 30px;font-size: 30px">
          <el-tab-pane  name="first" style="height: 100%">
            <template #label>
              <span style="font-size: 20px">我的班级</span>
            </template>
            <div class="flex justify-between" style="margin-top: 10px;margin-bottom: 15px">
              <el-button type="success" @click="dialogFormVisible = true">创建班级</el-button>
              <el-dialog title="创建班级" v-model="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="班级名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入班级名称"></el-input>
                  </el-form-item>
                  <el-form-item label="班级描述" :label-width="formLabelWidth">
                    <el-input v-model="form.description" type="textarea"
                              placeholder="请输入班级描述" autocomplete="off" maxlength="30"
                              show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="加入密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off" placeholder="请输入班级加入密码"></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </span>
                </template>
              </el-dialog>
              <div style="width: 150px">
                <el-input
                    placeholder="搜索班级"
                    prefix-icon="el-icon-search"
                    v-model="search">
                </el-input>
              </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;font-size: 15px">
              <el-table-column
                  prop="number"
                  label="编号"
                  width="150px">
              </el-table-column>
              <el-table-column
                  prop="class"
                  label="班级"
                  width="150px">
              </el-table-column>
              <el-table-column
                  prop="description"
                  label="描述">
              </el-table-column>
              <el-table-column
                  prop="password"
                  label="班级密码"
                  width="150px">
              </el-table-column>
              <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="150px">
              </el-table-column>
              <el-table-column
                  prop="studentStatus"
                  label="学生情况"
                  width="150px">
                <template #default="scope">
                  <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
                  <el-button type="text">导入</el-button>
                </template>
              </el-table-column>
              <el-table-column
                  prop="operation"
                  label="操作"
                  width="150px">
                <template #default="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="dialogForm1Visible = true"></el-button>
                  <el-dialog title="编辑班级" v-model="dialogForm1Visible">
                    <el-form :model="form">
                      <el-form-item label="班级名称" :label-width="formLabelWidth">
                        <el-input v-model="modify_form.name" autocomplete="off" placeholder="请输入班级名称"></el-input>
                      </el-form-item>
                      <el-form-item label="班级描述" :label-width="formLabelWidth">
                        <el-input v-model="modify_form.description" type="textarea"
                                  placeholder="请输入班级描述" autocomplete="off" maxlength="30"
                                  show-word-limit></el-input>
                      </el-form-item>
                      <el-form-item label="加入密码" :label-width="formLabelWidth">
                        <el-input v-model="modify_form.password" autocomplete="off" placeholder="请输入班级加入密码"></el-input>
                      </el-form-item>
                    </el-form>
                    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogForm1Visible = false">取 消</el-button>
      <el-button type="primary" @click="dialogForm1Visible = false">确 定</el-button>
    </span>
                    </template>
                  </el-dialog>
                  <el-button type="danger" icon="el-icon-delete" circle style="margin-left: 15px" @click="confirmDelete"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="second">
            <template #label>
              <span style="font-size: 20px">所有班级</span>
            </template>
            <div style="width: 150px;margin-top: 10px;margin-bottom: 15px">
              <el-input
                  placeholder="搜索班级"
                  prefix-icon="el-icon-search"
                  v-model="search">
              </el-input>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;font-size: 15px">
              <el-table-column
                  prop="number"
                  label="编号"
                  width="150px">
              </el-table-column>
              <el-table-column
                  prop="class"
                  label="班级"
                  width="150px">
              </el-table-column>
              <el-table-column
                  prop="description"
                  label="描述">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div style="align-items: flex-end;margin-bottom: 20px;">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="10">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherClass",
  data() {
    return {
      activeName: 'first',
      tableData: [{
        number: '0001',
        class: 'c++ 1班',
        description: '20级5、6班c++实训课程',
        password:'123456',
        createTime:'2020-05-06',
      }, {
        number: '0002',
        class: 'c++ 1班',
        description: '20级5、6班c++实训课程',
        password:'123456',
        createTime:'2020-05-06',
      }, {
        number: '0003',
        class: 'c++ 1班',
        description: '20级5、6班c++实训课程',
        password:'123456',
        createTime:'2020-05-06',
      }, {
        number: '0004',
        class: 'c++ 1班',
        description: '20级5、6班c++实训课程',
        password:'123456',
        createTime:'2020-05-06',
      }],
      form: {
        name: '',
        description: '',
        password:'',
      },
      modify_form: {
        name: '',
        description: '',
        password:'',
      },
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '80px',
      search: '',
    };
  },
  methods: {
    confirmDelete() {
      this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
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
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
#teacher-class{
  height: 100%;
  width: 100%;
}
#main {
  height: 100%;
  width: 100%;
  background: #3589BF;
}
#teacher-class-card{
  width: 90%;
  height: 90%;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  border-radius: 10px;
}
</style>