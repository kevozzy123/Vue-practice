export default {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 3, message: '用户名长度不能小于3位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 3, message: '密码长度不能小于3位', trigger: 'blur' },
    ],
    email:[
        { message: '邮箱不能为空', trigger: 'blur' },
        { pattern :/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , message: '邮箱不合法', trigger: 'blur' }
    ],
    mobile: [
        { trigger: 'blur' },
        { min:6, message: '密码不能小于6位' } 
    ],
    roleName: [
        { required: true, message: '职位不能为空', trigger: 'blur' },
    ]
}