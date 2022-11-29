<template>
  <div class="user-manage">
    <div class="user-manage-from">
      <el-form :inline="true" :model="queryParams" ref="elFormRef">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="queryParams.userId" placeholder="请输入用户ID"/>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="queryParams.state" placeholder="请选择用户状态">
            <el-option label="在职" :value="1"/>
            <el-option label="离职" :value="2"/>
            <el-option label="试用期" :value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <common-btns :query="setUserList" :re-set="reSet"></common-btns>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-manage-table-btns" ref="testRef">
      <el-button type="primary" @click="addUser" v-permission="'user-create'">新增</el-button>
      <el-button @click="batchDelete">批量删除</el-button>
    </div>
    <div class="user-manage-table">
      <CommonTable
          ref="commonTableRef"
          :tableHeight="450"
          rowKey="userId"
          @handleSelectionChange="handleSelectionChange"
          :tableData="tableData"
          :columnData="columnData"
          :currentPage="pageParams.pageNum"
          :pageSize="pageParams.pageSize"
          :total="total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
      />
    </div>
    <el-dialog :title="dialogTitle" width="40%" v-model="dialogVisible">
      <el-form :rules="rules" :model="userInfo" label-width="80px" label-position="right" ref="userInfoTable">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userInfo.userName" placeholder="请输入用户名" :disabled="dialogTitle==='编辑用户'"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userInfo.userEmail" placeholder="请输入用户邮箱" :disabled="dialogTitle==='编辑用户'">
            <template #append>@imooc.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userInfo.mobile" placeholder="请输入用户手机号"/>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userInfo.job" placeholder="请输入用户岗位"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userInfo.state" placeholder="请选择用户状态">
            <el-option label="在职" :value="1"/>
            <el-option label="离职" :value="2"/>
            <el-option label="试用期" :value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select v-model="userInfo.roleList" placeholder="请选择用户系统角色" multiple style="width: 100%">
            <el-option :label="role.roleName" :value="role._id" v-for="role in roleList" :key="role._id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader placeholder="请选择用户所属部门" v-model="userInfo.deptId" :options="deptList"
                       :props="{checkStrictly:true,value:'_id',label:'deptName'}" clearable/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {nextTick, onMounted} from "vue"
import {deleteUser, getDeptList, getRoleAllList, getUserList, handleUserOperate} from "@/api/user.js"
import dayjs from "dayjs"
import CommonBtns from '@/components/common/CommonBtns.vue'
import relativeTime from "dayjs/plugin/relativeTime"
import CommonTable from "@/components/common/CommonTable.vue"
import {ElMessage,} from "element-plus"
import {useMessageBox} from "@/hook/useMessageBox.js"
import "dayjs/locale/zh-cn"

dayjs.locale("zh-cn")
dayjs.extend(relativeTime)
/**
 * data
 */
// 用户信息
let userInfo = $ref({
  userName: "",
  userEmail: "",
  mobile: "",
  job: "",
  state: "",
  roleList: [],
  deptId: [],
})
// 用户操作
let action = $ref("")
// 所有角色列表
let roleList = $ref([])
// 部门列表
let deptList = $ref([])
// 用户表单校验规则
const rules = {
  userName: [
    {required: true, message: "请输入用户名", trigger: "change"}
  ],
  userEmail: [
    {required: true, message: "请输入用户邮箱", trigger: "change"}
  ],
  mobile: [
    {
      // 2022手机号校验正则
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入正确手机号",
      trigger: "change"
    }
  ],
  deptId: [
    {required: true, message: "请选择用户所属部门", trigger: "change"}
  ]
}
// 新增用户弹窗可见性
let dialogVisible = $ref(false)
// 弹窗标题
let dialogTitle = $ref("新增用户")
// 查询表单Ref
const elFormRef = $ref()
// 表格Ref
const commonTableRef = $ref()
// 用户信息ref
const userInfoTable = $ref()
// 查询参数
const queryParams = $ref({
  userId: "",
  userName: "",
  state: "",
})
// 分页参数
let pageParams = $ref({
  pageSize: 10,
  pageNum: 1
})
// 删除用户数组
let tempDeleteData = $ref([])
// loading
let loading = $ref(true)
// 数据总数量
let total = $ref(0)
// 表格数据
let tableData = $ref([])
/**
 * method
 */
// 提交用户表单
const submit = async () => {
  userInfoTable.validate(async (valid) => {
    if (valid) {
      console.log(userInfo)
      await handleUserOperate({
        ...userInfo,
        action
      })
      action === "add" ? ElMessage.success("用户创建成功") : ElMessage.success("信息更新成功")
      await setUserList()
      dialogVisible = false
    }
  })
}
// 重置查询表单
const reSet = () => {
  elFormRef.resetFields()
  commonTableRef.clearAllChecked()
  setUserList()
}
// 设置用户列表
const setUserList = async () => {
  loading = true
  let params = {...queryParams, ...pageParams}
  let {list, page} = await getUserList(params)
  total = page.total
  tableData = list
  loading = false
}
// 分页sizeChange
const handleSizeChange = val => {
  pageParams.pageSize = val.pageSize
  pageParams.pageNum = val.currentPage
  setUserList()
}
// 分页numChange
const handleCurrentChange = val => {
  pageParams.pageNum = val
  setUserList()
}
// 新增用户
const addUser = async () => {
  dialogVisible = true
  dialogTitle = "新增用户"
  action = "add"
  await nextTick()
  userInfoTable.resetFields()
}
// Mounted
onMounted(() => {
  // 获取用户列表数据
  setUserList()
  // 获取角色列表
  setRoleList()
  // 获取部门列表
  setDeptList()
})
// 角色列表
const setRoleList = async () => {
  roleList = await getRoleAllList()
}
// 获取部门列表
const setDeptList = async () => {
  deptList = await getDeptList()
}
// 表格操作：编辑
const handleEdit = async (row) => {
  dialogTitle = "编辑用户"
  dialogVisible = true
  action = "edit"
  await nextTick()
  Object.assign(userInfo, row)
}
// 表格操作：删除
const handleDelete = async row => {
  await deleteData([row.userId])
}
// 批量删除
const batchDelete = async () => {
  if (tempDeleteData.length === 0) {
    ElMessage.error("请选择需要删除的用户")
  } else {
    await deleteData(tempDeleteData.map(item => item.userId))
    commonTableRef.clearAllChecked()
  }
}
// 删除操作
const deleteData = async userIds => {
  await useMessageBox("确认删除？", "提示")
  let params = {userIds}
  await deleteUser(params)
  await setUserList({...queryParams, ...pageParams})
  ElMessage.success("删除成功")
}
// 表格操作多选
const handleSelectionChange = val => {
  tempDeleteData = val
}
// 表头数据(放在最下面是为了获取参数:fun)
const columnData = [
  {
    label: "用户角色",
    prop: "role",
    width: "80",
    formatter(row, column, value) {
      return {
        0: "管理员",
        1: "普通用户"
      }[value]
    }
  },
  {
    label: "用户Id",
    prop: "userId",
    width: "60"
  },
  {
    label: "用户名",
    prop: "userName",
    width: "60"
  },
  {
    label: "用户邮箱",
    prop: "userEmail",
    width: "110",
    formatter(...args) {
      return args[2] + "@imooc.com"
    }
  },
  {
    label: "用户职位",
    prop: "job",
    width: "80"
  },
  {
    label: "用户手机",
    prop: "mobile",
    width: "110"
  },
  {
    label: "用户状态",
    prop: "state",
    width: "70",
    formatter(row, column, value) {
      return {
        1: "在职",
        2: "离职",
        3: "试用期"
      }[value]
    }
  },
  {
    label: "注册时间",
    prop: "createTime",
    width: "130",
    formatter(row, column, value) {
      return dayjs(value).locale("zh-cn").format("YYYY/MM/DD A hh:mm ")
    }
  },
  {
    label: "最后登录时间",
    prop: "lastLoginTime",
    width: "130",
    formatter(row, column, value) {
    return  value===null?'从未登录': dayjs(value).locale("zh-cn").fromNow()
    }
  },
  {
    width: "110",
    fixed: "right",
    showOperation: true,
    operationConfig: {
      type: "button",
      buttons: [
        {
          title: "编辑",
          func: handleEdit,
          link: true,
          type: "primary"
        },
        {
          title: "删除",
          func: handleDelete,
          link: true,
          type: "danger"
        }
      ]
    }
  }
]
</script>
<style lang="scss" scoped>
.user-manage {
  display: flex;
  flex-direction: column;

  &-from {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }

  &-table {
    padding: 0 20px 20px 20px;
    background-color: #fff;

    &-btns {
      padding-left: 20px;
      margin-bottom: 20px;
    }
  }
}

</style>
