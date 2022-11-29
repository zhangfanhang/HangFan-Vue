<template>
  <div class="role-manage">
    <div class="role-manage-from">
      <el-form :inline="true" :model="queryParams" ref="elFormRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryParams.roleName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item>
          <common-btns :query="setRoleList" :re-set="reSet"></common-btns>
        </el-form-item>
      </el-form>
    </div>
    <div class="role-manage-table-btns" ref="testRef">
      <el-button type="primary" @click="addRole">新增</el-button>
    </div>
    <div class="role-manage-table">
      <CommonTable
          ref="commonTableRef"
          :tableHeight="450"
          rowKey="roleId"
          :selectable="false"
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
      <el-form :rules="rules" :model="roleInfo" label-width="80px" label-position="right" ref="roleInfoTable">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="roleInfo.roleName" placeholder="请输入角色名" :disabled="dialogTitle==='编辑角色'"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleInfo.remark" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
    <el-dialog title="设置权限" width="40%" v-model="showPermission">
      <el-form label-width="80px" label-position="right">
        <el-form-item label="角色名">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="权限">
          <div style="height:300px;width: 100%;overflow-y:auto ">
            <el-tree
                ref="permissionTree"
                :data="menuList"
                show-checkbox
                default-expand-all
                node-key="_id"
                highlight-current
                :props="{label:'menuName'}"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPermission = false">取 消</el-button>
        <el-button type="primary" @click="changePermission">确 定</el-button>
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
import _ from 'lodash'
import {getRoleList, handleRoleOperate, updatePremisson} from "@/api/role.js";
import CommonBtns from "@/components/common/CommonBtns.vue";
import {getMenuList} from "@/api/Menu.js";

dayjs.locale("zh-cn")
dayjs.extend(relativeTime)
/**
 * data
 */
// 角色表单
const roleInfo = $ref({
  remark: '',
  roleName: ''
})
// 角色表单校验规则
const rules = {
  roleName: [
    {required: true, message: "请输入角色名", trigger: "change"}
  ],
}
// 用户操作
let action = $ref("")
// 设置权限 弹窗可见性
let showPermission = $ref(false)
// 新增角色 弹窗可见性
let dialogVisible = $ref(false)
// 弹窗标题
let dialogTitle = $ref("新增角色")
// 查询表单Ref
const elFormRef = $ref()
// 表格Ref
const commonTableRef = $ref()
// 用户信息ref
const roleInfoTable = $ref()
// 权限树 ref
const permissionTree = $ref()
// 查询参数
const queryParams = $ref({
  roleName: ''
})
// 分页参数
let pageParams = $ref({
  pageSize: 10,
  pageNum: 1
})
// 当前角色名
let curRoleName = $ref('')
// loading
let loading = $ref(true)
// 数据总数量
let total = $ref(0)
// 表格数据
let tableData = $ref([])
// 菜单列表
let menuList = $ref([])
// 当前角色ID
let curRoleId = $ref('')
// actionMap
let actionMap = $ref({})
/**
 * method
 */
// 获取菜单列表
const setMenuList = async () => {
  menuList = await getMenuList()
  getActionMap(_.cloneDeep(menuList))
}
/**
 * 获取key=>角色名称字典表
 * @param list:Array
 * @return null
 */
const getActionMap = list => {
  const deep = arr => {
    arr.forEach(item => {
      if (item.children && item.action) {
        actionMap[item._id] = item.menuName
      } else if (item.children && !item.action) {
        deep(item.children)
      }
    })
  }
  deep(list)
}
// 提交表单
const submit = async () => {
  roleInfoTable.validate(async (valid) => {
    if (valid) {
      await handleRoleOperate({
        ...roleInfo,
        action
      })
      action === "create" ? ElMessage.success("角色创建成功") : ElMessage.success("信息更新成功")
      await setRoleList()
      dialogVisible = false
    }
  })
}
// 重置查询表单
const reSet = () => {
  elFormRef.resetFields()
  setRoleList()
}
// 设置角色列表
const setRoleList = async () => {
  loading = true
  let params = {...queryParams, ...pageParams}
  let {list, page} = await getRoleList(params)
  total = page.total
  tableData = list
  loading = false
}
// 分页sizeChange
// TODO: 如何通过一个自定义事件完成分页操作
const handleSizeChange = val => {
  pageParams.pageSize = val.pageSize
  pageParams.pageNum = val.currentPage
  setRoleList()
}
// 分页numChange
const handleCurrentChange = val => {
  pageParams.pageNum = val
  setRoleList()
}
// 新增角色
const addRole = async () => {
  dialogVisible = true
  dialogTitle = "新增角色"
  action = "create"
  await nextTick()
  roleInfoTable.resetFields()
}
// Mounted
onMounted(() => {
  // 获取角色列表
  setRoleList()
  // 获取菜单列表
  setMenuList()
})
// 表格操作：编辑
const handleEdit = async (row) => {
  dialogTitle = "编辑用户"
  dialogVisible = true
  action = "edit"
  await nextTick()
  roleInfoTable.resetFields()
  Object.assign(roleInfo, row)
}
// 表格操作：删除
const handleDelete = async row => {
  await useMessageBox("确认删除？", "提示")
  let params = {_id: row._id, action: 'delete'}
  await handleRoleOperate(params)
  await setRoleList({...queryParams, ...pageParams})
  ElMessage.success("删除成功")
}
// 表格操作：设置权限
const settingPermission = async row => {
  showPermission = true
  curRoleName = row.roleName
  curRoleId = row._id
  let {checkedKeys} = row.permissionList
  await nextTick()
  permissionTree.setCheckedKeys(checkedKeys)
}
// changePermission
const changePermission = async () => {
  // 获取权限树所有选中的节点
  let nodes = permissionTree.getCheckedNodes()
  // 仅包含已勾选按钮id
  let checkedKeys = []
  // 仅包含已勾选菜单id(默认当成半选，防止后面新增按钮造成渲染成全选)
  let parentKeys = []
  // 获取半选id
  let halfKeys = permissionTree.getHalfCheckedKeys()
  nodes.map(node => {
    !node.children ? checkedKeys.push(node._id) : parentKeys.push(node._id)
  })
  let params = {
    _id: curRoleId,
    permissionList: {
      checkedKeys,
      // TODO: 后端用于区分是全选还是半全选
      halfCheckedKeys: parentKeys.concat(halfKeys)
    }
  }
  await updatePremisson(params)
  showPermission = false
  await setRoleList()
  ElMessage.success('更新成功')

}
// 表头数据(放在最下面是为了获取参数:fun)
const columnData = [
  {
    label: "角色名称",
    prop: "roleName",
    width: "60",
  },
  {
    label: "备注",
    prop: "remark",
    width: "60"
  },
  {
    label: "权限列表",
    prop: "permissionList",
    width: "170",
    formatter(row, column, value) {
      let list = value.halfCheckedKeys || []
      let names = []
      list.map(key => {
        let name = actionMap[key]
        if (key && name) names.push(actionMap[key])
      })
      return names.join(',')
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
          title: "设置权限",
          func: settingPermission,
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
.role-manage {
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
