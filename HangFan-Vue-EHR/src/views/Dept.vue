<template>
  <div class="dept-manage">
    <div class="dept-manage-from">
      <el-form :inline="true" :model="queryParams" ref="elFormRef">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="queryParams.deptName" placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item>
          <common-btns :query="setDeptList" :re-set="reSet"></common-btns>
        </el-form-item>
      </el-form>
    </div>
    <div class="dept-manage-table-btns" ref="testRef">
      <el-button type="primary" @click="addDept">新增</el-button>
    </div>
    <div class="dept-manage-table">
      <CommonTable
          ref="commonTableRef"
          :tableHeight="510"
          rowKey="_id"
          :pagination="false"
          :selectable="false"
          :tableData="tableData"
          :columnData="columnData"
      />
    </div>
    <el-dialog :title="dialogTitle" width="40%" v-model="dialogVisible">
      <el-form :rules="rules" :model="deptInfo" label-width="90px" label-position="right" ref="deptInfoTable">
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader @change="setOneDept" placeholder="请选择上级部门" v-model="deptInfo.parentId"
                       :options="tableData"
                       :props="{checkStrictly:true,value:'_id',label:'deptName'}" clearable/>
          <span style="margin-left: 10px;">若为空,默认为一级部门</span>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="deptInfo.deptName" placeholder="请输入部门名称" :disabled="dialogTitle==='编辑角色'"
                    clearable/>
        </el-form-item>
        <el-form-item label="负责人" prop="user">
          <el-select v-model="deptInfo.user" @change="setUserEmail(deptInfo.user)" clearable>
            <el-option v-for="user in userAllList"
                       :key="user._id"
                       :value="`${user.userId},${user.userEmail},${user.userName}`"
                       :label="user.userName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人邮箱" prop="userEmail">
          <el-input v-model="deptInfo.userEmail" disabled clearable>
            <template #append>@imooc.com</template>
          </el-input>
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
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import CommonTable from "@/components/common/CommonTable.vue"
import {ElMessage} from "element-plus"
import {useMessageBox} from "@/hook/useMessageBox.js"
import "dayjs/locale/zh-cn"
import {getDeptList, handleDeptOperate, getAllUserList} from "@/api/dept.js";
import CommonBtns from "@/components/common/CommonBtns.vue";

dayjs.locale("zh-cn")
dayjs.extend(relativeTime)
/**
 * data
 */
// 部门表单
const deptInfo = $ref({
  parentId: [null],
  deptName: '',
  user: '',
  userEmail: ''
})
// 部门表单校验规则
const rules = {
  deptName: {required: true, message: "请输入部门名称", trigger: "change"},
  user: {required: true, message: "请选择负责人", trigger: "change"}
}
// 用户操作
let action = $ref("")
// 新增部门 弹窗可见性
let dialogVisible = $ref(false)
// 弹窗标题
let dialogTitle = $ref("新增部门")
// 查询表单Ref
const elFormRef = $ref()
// 表格Ref
const commonTableRef = $ref()
// 部门信息ref
const deptInfoTable = $ref()
// 查询参数
const queryParams = $ref({
  deptName: ''
})
// loading
let loading = $ref(true)
// 表格数据
let tableData = $ref([])
// 全量用户列表
let userAllList = $ref([])
/**
 * method
 */
// 提交表单
const submit = async () => {
  let user = deptInfo.user.split(',')
  deptInfoTable.validate(async (valid) => {
    if (valid) {
      await handleDeptOperate({
        _id: deptInfo._id,
        parentId: deptInfo.parentId,
        deptName: deptInfo.deptName,
        userId: user[0],
        userName: user[2],
        userEmail: user[1],
        action
      })
      action === "create" ? ElMessage.success("部门创建成功") : ElMessage.success("信息更新成功")
      await setDeptList()
      dialogVisible = false
    }
  })
}
// 重置查询表单
const reSet = () => {
  elFormRef.resetFields()
  setDeptList()
}
// 获取全量用户列表
const setUserList = async () => {
  userAllList = await getAllUserList()
}
// 设置部门列表
const setDeptList = async () => {
  loading = true
  let params = {...queryParams}
  tableData = await getDeptList(params)
  loading = false
}
// 新增部门
const addDept = async () => {
  dialogVisible = true
  dialogTitle = "新增部门"
  action = "create"
  await nextTick()
  deptInfoTable.resetFields()
}
// 设置用户邮箱
const setUserEmail = (user) => {
  user === '' ? deptInfo.userEmail = '' : deptInfo.userEmail = user.split(',')[1]
}
// Mounted
onMounted(() => {
  // 获取角色列表
  setDeptList()
//  获取全量用户列表
  setUserList()
})
// 如果新增一级部门
const setOneDept = (value) => {
  if (value === null) deptInfo.parentId = [null]
}
// 表格操作：编辑
const handleEdit = async (row) => {
  dialogTitle = "编辑部门"
  dialogVisible = true
  action = "edit"
  await nextTick()
  deptInfoTable.resetFields()
  Object.assign(deptInfo, row, {user: `${row.userId},${row.userEmail},${row.userName}`})
}
// 表格操作：新增
const handleAdd = async (row) => {
  dialogTitle = "新增部门"
  dialogVisible = true
  action = "create"
  await nextTick()
  deptInfoTable.resetFields()
  row.parentId[0] !== null ? deptInfo.parentId = [...row.parentId, row._id] : deptInfo.parentId = [row._id]
}
// 表格操作：删除
const handleDelete = async row => {
  await useMessageBox("确认删除？", "提示")
  let params = {_id: row._id, action: 'delete'}
  await handleDeptOperate(params)
  await setDeptList({...queryParams})
  ElMessage.success("删除成功")
}
// 表头数据(放在最下面是为了获取参数:fun)
const columnData = [
  {
    label: "部门名称",
    prop: "deptName",
    width: "60",
  },
  {
    label: "负责人",
    prop: "userName",
    width: "60"
  },
  {
    label: "修改时间",
    prop: "updateTime",
    width: "80",
    formatter(row, column, value) {
      return dayjs(value).locale("zh-cn").format("YYYY/MM/DD A hh:mm ")
    }
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: "80",
    formatter(row, column, value) {
      return dayjs(value).locale("zh-cn").format("YYYY/MM/DD A hh:mm ")
    }
  },
  {
    width: "100",
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
          title: "新增",
          func: handleAdd,
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
.dept-manage {
  display: flex;
  flex-direction: column;

  &-from {
    margin: 20px 0 0 20px;
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
