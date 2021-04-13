import request from '@/utils/request'

export default {
    // 客户信息展示
    getMurderList(current, limit, searchObj) {
        return request({
            url: `admin/murder/findPageMurder/${current}/${limit}`,
            method: 'post',
            data: searchObj // 使用 json
        })
    },

    // 删除客户信息
    removeMurder(id) {
        return request({
            url: `admin/murder/${id}`,
            method: 'delete'
        })
    },

    // 批量删除客户信息
    batchRemoveMurder(idList) {
        return request({
            url: `admin/murder/batchRemove`,
            method: 'delete',
            data: idList
        })
    },

    // 添加客户信息
    saveMurder(murderModel) {
        return request({
            url: `admin/murder/saveMurder`,
            method: 'post',
            data: murderModel
        })
    },

    // 根据id查询客户
    getMurder(id) {
        return request({
            url: `admin/murder/getMurder/${id}`,
            method: 'get'
        })
    },
    // 修改客户信息
    updateMurder(murderModel) {
        return request({
            url: `admin/murder/updateMurder`,
            method: 'post',
            data: murderModel
        })
    }
}