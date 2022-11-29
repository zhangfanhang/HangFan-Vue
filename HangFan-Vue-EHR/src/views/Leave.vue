<template>
  <div class="role-manage">
    <div class="role-manage-from">
      <el-form :inline="true" :model="queryParams" ref="elFormRef">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="queryParams.applyState" placeholder="请选择用户状态">
            <el-option
                v-for="item in applyStateList"
                :value="item.value"
                :key="item.value"
                :label="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <common-btns :query="setApplyList" :re-set="reSet"></common-btns>
        </el-form-item>
      </el-form>
    </div>
    <div class="role-manage-table-btns" ref="testRef">
      <el-button type="primary" @click="addRole">申请休假</el-button>
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
      <el-form :rules="rules" :model="leaveInfo" label-width="80px" label-position="right" ref="leaveInfoForm">
        <el-form-item label="休假类型" prop="applyType">
          <el-select v-model="leaveInfo.applyType" placeholder="请选择休假类型">
            <el-option
                v-for="(value,key) in applyTypeList"
                :value="key"
                :key="key"
                :label="value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="休假时间" prop="time">
          <el-date-picker
              v-model="leaveInfo.time"
              type="daterange"
              range-separator="～"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :disabled-date="time=>time.getTime() < Date.now() - 24 * 60 * 60 * 1000"
          />
        </el-form-item>
        <el-form-item label="休假时长">
          {{ leaveTime }}天
        </el-form-item>
        <el-form-item label="休假原因" prop="reasons">
          <el-input v-model="leaveInfo.reasons" placeholder="请输入休假原因"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
    <el-dialog :title="dialogTitle" width="40%" v-model="dialogVisible2">
      <el-form label-width="80px" label-position="right">
        <el-steps :active="leaveDetail.applyState" align-center>
          <el-step title="待审批"/>
          <el-step title="审批中"/>
          <el-step title="审批通过/拒绝/作废"/>
        </el-steps>
        <el-form-item label="休假类型">
          {{ leaveDetail.applyType }}
        </el-form-item>
        <el-form-item label="休假时间">
          {{ leaveDetail.time }}
        </el-form-item>
        <el-form-item label="休假时长">
          {{ leaveDetail.leaveTime }}
        </el-form-item>
        <el-form-item label="休假原因">
          {{ leaveDetail.reasons }}
        </el-form-item>
        <el-form-item label="审批状态">
          {{ leaveDetail._applyState }}
        </el-form-item>
        <el-form-item label="审批人">
          {{ leaveDetail.auditUsers }}
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible2 = false">关 闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {computed, nextTick, onMounted} from "vue"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import CommonTable from "@/components/common/CommonTable.vue"
import {ElMessage} from "element-plus"
import {useMessageBox} from "@/hook/useMessageBox.js"
import "dayjs/locale/zh-cn"
import _ from 'lodash'
import CommonBtns from "@/components/common/CommonBtns.vue";
import {getApplyList, handleApplyOperate} from "@/api/leave.js";

dayjs.locale("zh-cn")
dayjs.extend(relativeTime)
/**
 * data
 */
// 休假类型列表
const applyTypeList = {
  1: '事假',
  2: '调休',
  3: '年假',
}
// 用户状态列表
const applyStateList = [
  {
    label: '待审批',
    value: 1,
  },
  {
    label: '审批中',
    value: 2,
  },
  {
    label: '审批拒绝',
    value: 3,
  },
  {
    label: '审批通过',
    value: 4,
  },
  {
    label: '作废',
    value: 5,
  }
]
// 休假时长
const leaveTime = computed(val => {
  let time = leaveInfo.time ? leaveInfo.time : []
  const endTime = dayjs(time[1])
  leaveInfo.startTime = time[0]
  leaveInfo.endTime = time[1]
  leaveInfo.leaveTime = endTime.diff(time[0], 'day')
  return endTime.diff(time[0], 'day')
})
// 表单
const leaveInfo = $ref({
  reasons: "",
  time: [],
  startTime: '',
  endTime: '',
  applyType: ""
})
let leaveDetail = $ref({})
// 表单校验规则
const rules = {
  applyType: [
    {required: true, message: "请选择休假类型", trigger: "change"}
  ],
  time: [
    {required: true, message: "请选择休假时间", trigger: "change"}
  ],
}
// 用户操作
let action = $ref("create")
// 休假申请 弹窗可见性
let dialogVisible = $ref(false)
let dialogVisible2 = $ref(false)
// 弹窗标题
let dialogTitle = $ref("休假申请")
// 查询表单Ref
const elFormRef = $ref()
// 表格Ref
const commonTableRef = $ref()
// 休假申请表单ref
const leaveInfoForm = $ref()
// 查询参数
const queryParams = $ref({
  applyState: ''
})
// 分页参数
let pageParams = $ref({
  pageSize: 10,
  pageNum: 1
})
// loading
let loading = $ref(true)
// 数据总数量
let total = $ref(0)
// 表格数据
let tableData = $ref([])
/**
 * method
 */
// 提交表单
const submit = async () => {
  leaveInfoForm.validate(async (valid) => {
    if (valid) {
      await handleApplyOperate({
        ...leaveInfo,
        action
      })
      action === "create" ? ElMessage.success("申请成功") : ElMessage.success("作废成功")
      await setApplyList()
      dialogVisible = false
    }
  })
}
// 重置查询表单
const reSet = () => {
  elFormRef.resetFields()
  setApplyList()
}
// 设置申请列表
const setApplyList = async () => {
  loading = true
  let params = {...queryParams, ...pageParams}
  let {list, page} = await getApplyList(params)
  total = page.total
  tableData = list
  loading = false
}
// 分页sizeChange
// TODO: 如何通过一个自定义事件完成分页操作
const handleSizeChange = val => {
  pageParams.pageSize = val.pageSize
  pageParams.pageNum = val.currentPage
  setApplyList()
}
// 分页numChange
const handleCurrentChange = val => {
  pageParams.pageNum = val
  setApplyList()
}
// 休假申请
const addRole = async () => {
  dialogVisible = true
  action = "create"
  await nextTick()
  leaveInfoForm.resetFields()
}
// Mounted
onMounted(() => {
  // 获取申请列表
  setApplyList()
})
// 表格操作：查看
const handleEdit = row => {
  dialogVisible2 = true
  leaveDetail = _.cloneDeep(row)
  console.log(leaveDetail)
  leaveDetail._applyState = applyStateList.filter(item => item.value === row.applyState)[0].label
  leaveDetail.applyType = applyTypeList[row.applyType]
  leaveDetail.leaveTime = `${row.leaveTime}天`
  leaveDetail.time = `${dayjs(row.startTime).locale("zh-cn").format("YYYY/MM/DD")}~${dayjs(row.endTime).locale("zh-cn").format("YYYY/MM/DD")}`
}
// 表格操作：作废
const handleDelete = async row => {
  await useMessageBox("确认作废此休假申请？", "提示")
  let params = {_id: row._id, action: 'delete'}
  await handleApplyOperate(params)
  await setApplyList({...queryParams, ...pageParams})
  ElMessage.success("作废成功")
}
// 表头数据(放在最下面是为了获取参数:fun)
const columnData = [
  {
    label: "单号",
    prop: "orderNo",
    width: "60",
  },
  {
    label: "休假时间",
    prop: "",
    width: "60",
    formatter(row) {
      return `${dayjs(row.startTime).locale("zh-cn").format("YYYY/MM/DD")}~${dayjs(row.endTime).locale("zh-cn").format("YYYY/MM/DD")}`
    }
  },
  {
    label: "休假时长",
    prop: "leaveTime",
    width: "60",
    formatter(row, column, value) {
      return `${value}天`
    }
  },
  {
    label: "休假类型",
    prop: "applyType",
    width: "60",
    formatter(row, column, value) {
      return applyTypeList[value]
    }
  },
  {
    label: "休假原因",
    prop: "reasons",
    width: "60",
  },
  {
    label: "申请时间",
    prop: "createTime",
    width: "80",
    formatter(row, column, value) {
      return dayjs(value).locale("zh-cn").format("YYYY/MM/DD A hh:mm ")
    }
  },
  {
    label: "审批人",
    prop: "auditUsers",
    width: "60",
  },
  {
    label: "当前审批人",
    prop: "curAuditUserName",
    width: "60",
  },
  {
    label: "审批状态",
    prop: "applyState",
    width: "60",
    formatter(row, column, value) {
      const res = applyStateList.filter(item => item.value === value)
      return res[0].label
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
          title: "查看",
          func: handleEdit,
          link: true,
          type: "primary",
        },
        {
          show:row=>[1,2].includes(row.applyState),
          title: "作废",
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
