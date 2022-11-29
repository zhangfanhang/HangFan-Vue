import request from '@/utils/request.js'

/**
 * 申请列表 申请列表和审核列表接口公用，通过type区分
 * approve:审核  默认用户审批列表
 */
export async function getApplyList(params) {
  return request({
    url: '/leave/list',
    method: 'get',
    data: params,
  })
}

/**
 * 操作 申请
 */
export async function handleApplyOperate(params) {
  return request({
    url: '/leave/operate',
    method: 'post',
    data: params,
  })
}

/**
 * 操作 审核
 */
export async function handleApproveOperate(params) {
  return request({
    url: '/leave/approve',
    method: 'post',
    data: params,
  })
}
