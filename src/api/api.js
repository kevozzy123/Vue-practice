import createRequest from "./request";
import { ElMessage } from 'element-plus'

// const url = process.env.NODE_ENV == "production" ? "http://127.0.0.1:3002/api/" : "/proxyApi/"

const url = 'http://mall.itanychw.online:8888/api/v2/'
// const request = createRequest(process.env.VUE_DATA_API)
const metaValidation = (options = {}) => {
    options.headers = options.headers || {}
    options.headers.Authorization = sessionStorage.getItem('token')
    return request(options)
        .then(({ data, meta }) => {
            if (meta.status < 400) {
                ElMessage.success(meta.msg)
                return Promise.resolve(data)
            } else {
                ElMessage.error(meta.msg)
                return Promise.reject(meta)
            }
        })
}

const request = createRequest(url)

const login = (username, password) => {
    return request({
        url: url + 'login',
        method: 'post',
        data: {
            username, password
        }
    })
}

const loadNav = () => {
    return metaValidation({
        url: url + 'menus',
        method: 'get'
    })
}

const loadUsers = (pagenum, pagesize, query) => {
    return metaValidation({
        url: url + 'users',
        method: 'get',
        params: {
            pagenum,
            pagesize,
            query
        }
    })
}

const addUser = (username, password, email, mobile) => {
    return metaValidation({
        url: url + 'users',
        method: 'post',
        data: {
            username,
            password,
            email,
            mobile
        }
    })
}

const updateUserState = (uId, type) => {
    return metaValidation({
        url: url + `users/${uId}/state/${type}`,
        method: 'put',
        data: {
            uId,
            type
        }
    })
}

const updateUserInfo = (id, email, mobile) => {
    return metaValidation({
        url: url + `users/${id}`,
        method: 'put',
        data: {
            email,
            mobile
        }
    })
}

const getUser = (id) => {
    return metaValidation({
        url: url + 'users/' + id,
        method: 'get',
        // params: {
        //     id
        // }
    })
}

const deleteUser = (id) => {
    return metaValidation({
        url: url + 'users/' + id,
        method: 'delete',
    })
}

const arrangeRole = (id, rid) => {
    return metaValidation({
        url: url + `users/${id}/role`,
        method: 'put',
        data: {
            rid
        }
    })
}

const getRightsList = () => {
    return metaValidation({
        url: url + 'rights/list',
        method: 'get',
    })
}

const getRightsListTree = () => {
    return metaValidation({
        url: url + 'rights/tree',
        method: 'get',
    })
}

const getOrders = (pagenum, pagesize) => {
    return metaValidation({
        url: url + 'orders',
        method: 'get',
        params: {
            pagenum,
            pagesize
        }
    })
}

const updateOrderAddress = (id, consignee_addr) => {
    return metaValidation({
        url: url +  `orders/${id}/address`,
        method: 'put',
        data: {
            consignee_addr
        }
    })
}

const getCategories = (type, pagenum, pagesize) => {
    return metaValidation({
        url: url + 'categories',
        method: 'get',
        params: {
            type,
            pagenum,
            pagesize
        }
    })
}

const addCategories = (cat_pid, cat_name, cat_level) => {
    return metaValidation({
        url: url + 'categories',
        method: 'post',
        data: {
            cat_pid,
            cat_name,
            cat_level
        }
    })
}

const getLogistics = () => {
    return metaValidation({
        url: url + 'kuaidi/815294206237577',
        method: 'get'
    })
}

const editCategory = (id, cat_name) => {
    return metaValidation({
        url: url + `categories/${id}`,
        method: 'put',
        data: {
            cat_name
        }
    })
}

const deleteCategory = (id) => {
    return metaValidation({
        url: url + `categories/${id}`,
        method: 'delete',
    })
}

const getGoods = (pagenum, pagesize, query) => {
    return metaValidation({
        url: url + 'goods',
        method: 'get',
        params: {
            pagenum,
            pagesize,
            query
        }
    })
}

const addGoods = (goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, goods_attrs) => {
    return metaValidation({
        url: url + 'goods',
        method: 'post',
        data: {
            goods_name,
            goods_cat,
            goods_price,
            goods_weight,
            goods_number,
            goods_introduce,
            goods_attrs
        }
    })
}

const editGood = (id, goods_name, goods_cat, goods_price, goods_weight, goods_number, goods_introduce,goods_pics, goods_attrs) => {
    return metaValidation({
        url: url + 'goods',
        method: 'post',
        data: {
            id,
            goods_name,
            goods_cat,
            goods_price,
            goods_weight,
            goods_number,
            goods_introduce,
            goods_pics,
            goods_attrs
        }
    })
}

const removeGoods = (id) => {
    return metaValidation({
        url: url + `goods/${id}`,
        method: 'delete'
    })
}

const uploadImg = (id, pics) => {
    return metaValidation({
        url: url + `goods/${id}/pics`,
        method: 'put',
        data: {
            pics
        }
    })
}
const getRoles = () => {
    return metaValidation({
        url: url + 'roles',
        method: 'get',
    })
}

const addRole = (roleName, roleDesc) => {
    return metaValidation({
        url: url + 'roles',
        method: 'post',
        data: {
            roleName,
            roleDesc
        }
    })
}

const deleteRole = (id) => {
    return metaValidation({
        url: url + `roles/${id}`,
        method: 'delete',
    })
}

const editRole = (id, roleName, roleDesc) => {
    return metaValidation({
        url: url + `roles/${id}`,
        method: 'put',
        data: {
            roleName,
            roleDesc
        }
    })
}

const grantRoles = (roleId, rids) => {
    return metaValidation({
        url: url + `roles/${roleId}/rights`,
        method: 'post',
        data: {
            rids
        }
    })
}

const removeRoleRight = (roleId, rightId) => {
    return metaValidation({
        url: url + `roles/${roleId}/rights/${rightId}`,
        method: 'delete',
    })
}
const getCategoryParamsMany = (id) => {
    return metaValidation({
        url: url + `categories/${id}/attributes`,
        method: 'get',
        params: {
            sel: 'many'
        }
    })
}

const getCategoryParamsOnly = (id) => {
    return metaValidation({
        url: url + `categories/${id}/attributes`,
        method: 'get',
        params: {
            sel: 'only'
        }
    })
}

const updateCategoryParams = (catId, attrId, attr_name, attr_sel, attr_vals) => {
    return metaValidation({
        url: url + `categories/${catId}/attributes/${attrId}`,
        method: 'put',
        data: {
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}

const removeCategoryParam = (catId, attrId) => {
    return metaValidation({
        url: url + `categories/${catId}/attributes/${attrId}`,
        method: 'delete'
    })
}

const addParam = (catId, attr_name, attr_sel) => {
    return metaValidation({
        url: url + `categories/${catId}/attributes`,
        method: 'post',
        data: {
            attr_name,
            attr_sel
        }
    })
}

const getStatistics = (type) => {
    return metaValidation({
        url: url + `reports/type/${type}`,
        method: 'get'
    })
}
const api = {
    loadNav,
    login,
    loadUsers,addUser,updateUserState,updateUserInfo,getUser,deleteUser,arrangeRole,
    getRightsList, getRightsListTree,
    getOrders, updateOrderAddress, getLogistics,
    getCategories, addCategories, editCategory, deleteCategory,
    getGoods, addGoods, removeGoods, editGood, uploadImg,
    getRoles, addRole, deleteRole, removeRoleRight, editRole, grantRoles,
    getCategoryParamsMany, getCategoryParamsOnly, updateCategoryParams, removeCategoryParam, addParam,
    getStatistics
}

export default {
    ...api,
    install(app) {
        app.config.globalProperties.$api = api
    }
}