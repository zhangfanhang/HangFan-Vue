<template>
  <div class="menu-manage">
    <div class="menu-manage-from">
      <el-form :inline="true" :model="queryParams" ref="elFormRef">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryParams.menuName" placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryParams.menuState" placeholder="请选择菜单状态">
            <el-option label="正常" :value="1"/>
            <el-option label="停用" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <common-btns :query="setMenuList" :re-set="reSet"></common-btns>
        </el-form-item>
      </el-form>
    </div>
    <div class="menu-manage-table-btns" ref="testRef">
      <el-button type="primary" @click="createMenu">创建</el-button>
    </div>
    <div class="menu-manage-table">
      <CommonTable
          :selectable="false"
          :tableHeight="510"
          rowKey="_id"
          :tableData="tableData"
          :columnData="columnData"
          :pagination="false"
      />
    </div>
    <el-dialog :title="dialogTitle" width="40%" v-model="dialogVisible">
      <el-form :rules="rules" :model="menuInfo" label-width="80px" label-position="right" ref="menuInfoTable">
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader v-model="menuInfo.parentId" :options="tableData"
                       :props="{checkStrictly: true,value:'_id',label:'menuName'}" clearable>
          </el-cascader>
          <span style="margin-left: 20px;">若不选,默认为一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuInfo.menuType" :disabled="dialogTitle==='编辑菜单'">
            <el-radio :label="1" size="large">菜单</el-radio>
            <el-radio :label="2" size="large">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName" v-show="menuInfo.menuType===1">
          <el-input v-model="menuInfo.menuName" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="按钮名称" prop="menuName" v-show="menuInfo.menuType===2">
          <el-input v-model="menuInfo.menuName" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-show="menuInfo.menuType===1">
          <el-input v-model="menuInfo.icon" placeholder="请输入菜单图标"/>
        </el-form-item>
        <el-form-item label="路由地址" prop="path" v-show="menuInfo.menuType===1">
          <el-input v-model="menuInfo.path" placeholder="请输入路由地址"/>
        </el-form-item>
        <el-form-item label="组件路径" prop="component" v-show="menuInfo.menuType===1">
          <el-input v-model="menuInfo.component" placeholder="请输入组件路径"/>
        </el-form-item>
        <el-form-item label="权限标识" prop="menuCode" v-show="menuInfo.menuType===2">
          <el-input v-model="menuInfo.menuCode" placeholder="请输入权限标识"/>
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState" v-show="menuInfo.menuType===1">
          <el-radio-group v-model="menuInfo.menuState">
            <el-radio :label="1" size="large">正常</el-radio>
            <el-radio :label="2" size="large">停用</el-radio>
          </el-radio-group>
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
import {handleMenuOperate, getMenuList} from "@/api/menu.js"
import CommonTable from "@/components/common/CommonTable.vue"
import {ElMessage} from "element-plus"
import {useUserStore} from "@/store/user.js"
import CommonBtns from '@/components/common/CommonBtns.vue'

/**
 * data
 */
const userStore = useUserStore()
// 操作类型 创建create 编辑 删除
let action = $ref("create")
// 新增用户弹窗可见性
let dialogVisible = $ref(false)
// 弹窗标题
let dialogTitle = $ref("新增菜单")
// 菜单表单校验规则
const rules = {
  menuName: [
    {required: true, message: "请输入菜单名称", trigger: "blur"},
    {min: 2, max: 8, message: "长度在2-8个字符", trigger: "blur"}
  ],
}
// 菜单信息
const menuInfo = $ref({
  parentId: [null],
  menuType: 1,
  menuState: 1,
})
// 查询表单Ref
const elFormRef = $ref()
// 用户信息ref
const menuInfoTable = $ref()
// 查询参数
const queryParams = $ref({
  menuName: "",
  menuState: "",
})
// 表格数据
let tableData = $ref([])
/**
 * method
 */
// 提交用户表单
const submit = async () => {
  menuInfoTable.validate(async (valid) => {
    if (valid) {
      await handleMenuOperate({
        ...menuInfo,
        action
      })
      action === "create" ? ElMessage.success("菜单创建成功") : ElMessage.success("菜单更新成功")
      let res = await setMenuList()
      dialogVisible = false
      location.reload()
    }
  })
}
// 重置查询表单
const reSet = () => {
  elFormRef.resetFields()
  setMenuList()
}
// 创建菜单
const createMenu = async () => {
  dialogVisible = true
  dialogTitle = "创建菜单"
  action = "create"
  await nextTick()
  menuInfoTable.resetFields()
}
// Mounted
onMounted(() => {
  // 获取菜单列表数据
  setMenuList()
})
// 获取菜单列表
const setMenuList = async () => {
  const deep = arr => {
    arr.forEach(item => {
      if (item.menuType === 1) {
        if(item.children) deep(item.children)
      } else {
        item.disabled = true
      }
    })
  }
  let res = await getMenuList(queryParams)
  deep(res)
  tableData=res
}
// 表格操作：新增
const tableCreateMenu = async row => {
  if (row.menuType === 2) {
    ElMessage.error('按钮下无法新增菜单/按钮')
    return
  }
  dialogVisible = true
  dialogTitle = "创建菜单"
  action = "create"
  await nextTick()
  menuInfoTable.resetFields()
  menuInfo.parentId = [...row.parentId, row._id].filter(item => item)
}
// 表格操作：编辑
const handleEdit = async (row) => {
  dialogTitle = "编辑菜单"
  dialogVisible = true
  action = "edit"
  await nextTick()
  menuInfoTable.resetFields()
  Object.assign(menuInfo, row)
}
// 表格操作：删除
const handleDelete = async row => {
  action = "delete"
  await handleMenuOperate({_id: row._id, action})
  let res = await setMenuList()
  location.reload()
}
// 表头数据(放在最下面是为了获取参数:fun)
const columnData = [
  {
    label: "菜单名称",
    prop: "menuName",
    width: "110"
  },
  {
    label: "图标",
    prop: "icon",
    width: "110"
  },
  {
    label: "菜单类型",
    prop: "menuType",
    width: "80",
    formatter(row, column, value) {
      return {
        1: "菜单",
        2: "按钮"
      }[value]
    }
  },
  {
    label: "权限标识",
    prop: "menuCode",
    width: "110"
  },
  {
    label: "路由地址",
    prop: "path",
    width: "110"
  },
  {
    label: "组件路径",
    prop: "component",
    width: "110",
  },
  {
    label: "菜单状态",
    prop: "menuState",
    width: "80",
    formatter(row, column, value) {
      return {
        1: "正常",
        2: "停用",
      }[value]
    }
  },
  {
    width: "140",
    fixed: "right",
    showOperation: true,
    operationConfig: {
      type: "button",
      buttons: [
        {
          title: "新增",
          func: tableCreateMenu,
          link: true,
          type: "primary"
        },
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
.menu-manage {
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
