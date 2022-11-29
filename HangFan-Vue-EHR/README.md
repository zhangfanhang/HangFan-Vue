## 本地接口

`npm run dev`一键启动前端和服务端

## 接口文档

**通用结构体**

```
// 分页结构
{
	pageNum:1, 		// 当前页码
  pageSize:10 // 每页条数，默认10
}

// 返回结构
{
  code:200,// 状态码 200：成功，非200：失败
  data:"",// 返回结果
  msg:""//错误信息
}

// 错误码
{
    SUCCESS: 200,
    PARAM_ERROR: 10001,//'参数不正确',
    USER_ACCOUNT_ERROR:20001,//用户账号密码错误
    USER_LOGIN_ERROR:20002,//用户未登录
    BUSINESS_ERROR: 30001,//业务请求失败
    AUTH_ERROR: 40001,//认证失败或TOKEN过期
}

// 公共请求头携带token
{
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTUxMTA3NzcsImRhdGEiOnsidXNlck5hbWUiOiJhZG1pbiIsInVzZXJJZCI6MTAwMDAwMiwiZGVwdElkIjpbIjYwMTY3MDU5YzkwMjdiN2QyYzUyMGE2MSIsIjYwMTY3MzQ1YzZhNDQxN2YyZDI3NTA2ZiJdLCJyb2xlIjoiMCJ9LCJpYXQiOjE2MTUwMjQzNzd9.gaXhcyer27m35ouHPLwC51TP1cjBl5BMroHxknXcABI"
}

// 角色
role:0 管理员 1：普通用户
```

#### 登录

**POST "/users/login"**

> request

```
{
  userName,
  userPwd
}
```

> response

success

```json
{
  "code": 200,
  "data": {
    "deptId": ["62408933dc01fb458d000efb", "624acef3bebf9f948b7a6aca"],
    "state": 1,
    "role": 0,
    "roleList": ["609781b45ccd183084f8ea3d"],
    "_id": "624a933005dd5a2e953c612b",
    "userId": 1000002,
    "userName": "admin",
    "userEmail": "admin@imooc.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImRlcHRJZCI6WyI2MjQwODkzM2RjMDFmYjQ1OGQwMDBlZmIiLCI2MjRhY2VmM2JlYmY5Zjk0OGI3YTZhY2EiXSwic3RhdGUiOjEsInJvbGUiOjAsInJvbGVMaXN0IjpbIjYwOTc4MWI0NWNjZDE4MzA4NGY4ZWEzZCJdLCJfaWQiOiI2MjRhOTMzMDA1ZGQ1YTJlOTUzYzYxMmIiLCJ1c2VySWQiOjEwMDAwMDIsInVzZXJOYW1lIjoiYWRtaW4iLCJ1c2VyRW1haWwiOiJhZG1pbkBpbW9vYy5jb20ifSwiaWF0IjoxNjYxMjQ2ODc4LCJleHAiOjE2NjEyNTA0Nzh9.QzpUkR3oX_U_q2O-fP_G-0X_IlWUe1UbnNvXFEhOK7A"
  },
  "msg": ""
}
```

fail

```
{
	code:20001,
	data:'',
	msg:'账号或密码不正确'
}
```

#### 用户列表

**GET "/users/list"**

> request

```
{
	userId,
  userName,
  state, 			// 0:所有 1：在职 2：离职 3：试用期
  pageNum:1, 		// 当前页码
  pageSize:10 // 每页条数，默认10
}
```

> response

success

```json
{
  "code": 200,
  "data": {
    "page": {
      "pageNum": 0,
      "pageSize": 0,
      "total": 91
    },
    "list": [
      {
        "deptId": ["62408933dc01fb458d000efb", "624acef3bebf9f948b7a6aca"],
        "state": 1,
        "role": 0,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T06:23:37.514Z",
        "lastLoginTime": "2022-04-04T06:23:37.514Z",
        "userId": 1000002,
        "userName": "admin",
        "userEmail": "admin@imooc.com",
        "job": "架构师",
        "mobile": "17600000000",
        "__v": 0
      },
      {
        "deptId": ["62ed2cf2c44e48db613361b4", "62f1b8dec44e48db613364bf"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T06:48:34.142Z",
        "lastLoginTime": "2022-04-04T06:48:34.142Z",
        "userId": 1000003,
        "userName": "tom",
        "userEmail": "tom@imooc.com",
        "__v": 0,
        "job": "测试",
        "mobile": "18274736473"
      },
      {
        "deptId": [
          "62ed2cf2c44e48db613361b4",
          "62f1b8dec44e48db613364bf",
          "62f50e01c44e48db61336c01"
        ],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T08:36:19.421Z",
        "lastLoginTime": "2022-04-04T08:36:19.421Z",
        "userId": 1000004,
        "userName": "jack",
        "userEmail": "11984342221@qq.com@imooc.com",
        "job": "java",
        "mobile": "15060398950",
        "__v": 0
      },
      {
        "deptId": ["62408933dc01fb458d000efb", "624a95ed09d1c337b6bbf8b4"],
        "state": 2,
        "role": 1,
        "roleList": ["609781c15ccd183084f8ea3e"],
        "createTime": "2022-04-04T08:36:19.421Z",
        "lastLoginTime": "2022-04-04T08:36:19.421Z",
        "userId": 1000005,
        "userName": "王明东",
        "userEmail": "6666666@imooc.com",
        "job": "j讲师",
        "mobile": "18750060655",
        "__v": 0
      },
      {
        "deptId": ["62408933dc01fb458d000efb", "624a95ed09d1c337b6bbf8b4"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T08:36:19.421Z",
        "lastLoginTime": "2022-04-04T08:36:19.421Z",
        "userId": 1000006,
        "userName": "zhangsan",
        "userEmail": "100000000@imooc.com",
        "job": "100000000帆帆",
        "mobile": "13666933712",
        "__v": 0
      },
      {
        "deptId": ["62408933dc01fb458d000efb", "624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000007,
        "userName": "黄嘉han",
        "userEmail": "1198434221@imooc.com",
        "mobile": "13888933718",
        "__v": 0,
        "job": "前端"
      },
      {
        "deptId": ["624be45d8a91fae1f3851b1a", "624be46a8a91fae1f3851b1d"],
        "state": 2,
        "role": 1,
        "roleList": ["624d243f8a91fae1f3851fb2"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000008,
        "userName": "测试人员一",
        "userEmail": "123456789@163.com",
        "job": "前端工程师",
        "mobile": "1234567891",
        "__v": 0
      },
      {
        "deptId": ["624be45d8a91fae1f3851b1a"],
        "state": 1,
        "role": 1,
        "roleList": ["62ca9d99c44e48db6133213f"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000009,
        "userName": "dsq",
        "userEmail": "8",
        "job": "ceshi ",
        "mobile": "157",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000010,
        "userName": "测试人员二",
        "userEmail": "1234546213@qq.com",
        "job": "2",
        "mobile": "1",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000011,
        "userName": "orange",
        "userEmail": "orange@qq.com",
        "job": "前端",
        "mobile": "15655400293",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000012,
        "userName": "cherry",
        "userEmail": "cherry@qq.com@qq.com",
        "job": "前端",
        "mobile": "15655400293",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000013,
        "userName": "gavin",
        "userEmail": "gavin@qq.com",
        "job": "前端",
        "mobile": "15655400293",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000014,
        "userName": "黎黎黎明",
        "userEmail": "116019284@qq.com@qq.com",
        "job": "前端",
        "mobile": "15655400293",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000015,
        "userName": "黎黎黎明11111",
        "userEmail": "116019284@qq.com@qq.com@qq.com@qq.com",
        "job": "前端",
        "mobile": "15655400293",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000016,
        "userName": "1",
        "userEmail": "2@imooc.com",
        "job": "4",
        "mobile": "13112312345",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000017,
        "userName": "009",
        "userEmail": "2@imooc.com@imooc.com",
        "job": "4",
        "mobile": "13129983421",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d", "609781c15ccd183084f8ea3e"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000018,
        "userName": "a",
        "userEmail": "123@imooc.com",
        "job": "123",
        "mobile": "13420796162",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000019,
        "userName": "admin122",
        "userEmail": "admin@imooc.com@imooc.com",
        "job": "架构师",
        "mobile": "17600000000",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000020,
        "userName": "123213",
        "userEmail": "3213232@imooc.com",
        "job": "我",
        "mobile": "13386424223",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000021,
        "userName": "Tom",
        "userEmail": "test@imooc.com",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000022,
        "userName": "Kobe",
        "userEmail": "1144307062@qq.com@imooc.com",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000023,
        "userName": "celine",
        "userEmail": "27534892@imooc.com",
        "job": "前端",
        "mobile": "17388979496",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000024,
        "userName": "serra",
        "userEmail": "111111@imooc.com",
        "job": "前端",
        "mobile": "138765432111",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000025,
        "userName": "Gorger",
        "userEmail": "Gorger@imooc.com",
        "job": "产品",
        "mobile": "123456543222",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000026,
        "userName": "aaa",
        "userEmail": "aaa@imooc.com",
        "job": "qianduan",
        "mobile": "11111111111111111",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000027,
        "userName": "bbb",
        "userEmail": "bbb@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000028,
        "userName": "ccc",
        "userEmail": "ccc@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000029,
        "userName": "ddd",
        "userEmail": "ddd@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [],
        "state": null,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000030,
        "userName": "mulan",
        "userEmail": "mulan@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000031,
        "userName": "ligong",
        "userEmail": "ligong@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000032,
        "userName": "bbbb",
        "userEmail": "bbbb@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000033,
        "userName": "ss",
        "userEmail": "ss@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000034,
        "userName": "dd",
        "userEmail": "dd@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000035,
        "userName": "ff",
        "userEmail": "ff@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000036,
        "userName": "qq",
        "userEmail": "qq@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000037,
        "userName": "111",
        "userEmail": "222",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000038,
        "userName": "11122",
        "userEmail": "222333",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000039,
        "userName": "110",
        "userEmail": "221",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000040,
        "userName": "9989",
        "userEmail": "11",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000041,
        "userName": "998922",
        "userEmail": "113",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000042,
        "userName": "userrrr",
        "userEmail": "33277kj",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000043,
        "userName": "userrrrsss",
        "userEmail": "33277kj000",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d", "609781c15ccd183084f8ea3e"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000044,
        "userName": "188i8888",
        "userEmail": "188i8888",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000045,
        "userName": "09900099",
        "userEmail": "09900099",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000046,
        "userName": "ppppp",
        "userEmail": "ppppp",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000047,
        "userName": "11---9999",
        "userEmail": "22321",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000048,
        "userName": "oooo444",
        "userEmail": "111212",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000049,
        "userName": "000000",
        "userEmail": "0088008",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000050,
        "userName": "213123213213",
        "userEmail": "123213213213",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000051,
        "userName": "213123213",
        "userEmail": "123123213213",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000052,
        "userName": "11111111111111111122",
        "userEmail": "222222222222211",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000053,
        "userName": "122·321321321",
        "userEmail": "34414123",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000054,
        "userName": "11",
        "userEmail": "22@imooc.com",
        "__v": 0
      },
      {
        "deptId": [],
        "state": null,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000055,
        "userName": "11111",
        "userEmail": "22a@imooc.com",
        "__v": 0,
        "job": "",
        "mobile": ""
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000056,
        "userName": "Dana",
        "userEmail": "Dana@gmail.com",
        "__v": 0,
        "job": "",
        "mobile": ""
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781c15ccd183084f8ea3e"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000057,
        "userName": "我问问",
        "userEmail": "我问问@gmail.com",
        "job": "11",
        "mobile": "文文",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781c15ccd183084f8ea3e"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000058,
        "userName": "kris",
        "userEmail": "kris@gmail.com",
        "job": "前端",
        "mobile": "1111111111111111",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000059,
        "userName": "lele",
        "userEmail": "lele@gmail.com",
        "job": "前端",
        "mobile": "2222222222222",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781c15ccd183084f8ea3e"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000060,
        "userName": "Celine",
        "userEmail": "celine@gmail.com",
        "job": "",
        "mobile": "111111111",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000061,
        "userName": "Biden",
        "userEmail": "Biden@gmail.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000062,
        "userName": "Dillie",
        "userEmail": "Dillie@gmail.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000063,
        "userName": "Gorge",
        "userEmail": "Gorge@gmail.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781c15ccd183084f8ea3e"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000064,
        "userName": "tina",
        "userEmail": "tina@gmail.com",
        "job": "前端",
        "mobile": "11111111111",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781c15ccd183084f8ea3e"],
        "createTime": "2022-04-04T11:00:58.072Z",
        "lastLoginTime": "2022-04-04T11:00:58.072Z",
        "userId": 1000065,
        "userName": "Lynn",
        "userEmail": "Lynn@gmail.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d", "609781c15ccd183084f8ea3e"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000066,
        "userName": "zyf",
        "userEmail": "zyf@imooc.com",
        "job": "工程师",
        "mobile": "15670789578",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 3,
        "role": 1,
        "roleList": ["62c79242c44e48db6133009d", "62c7d452c44e48db613305e4"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000067,
        "userName": "ssda",
        "userEmail": "sad@imooc.com",
        "job": "sdsd",
        "mobile": "17838183827",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000068,
        "userName": "fch",
        "userEmail": "480858736@imooc.com",
        "job": "站大街",
        "mobile": "13150402008",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000069,
        "userName": "fch1",
        "userEmail": "480858736@imooc.com@imooc.com",
        "job": "站大街",
        "mobile": "13150607008",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["62c79242c44e48db6133009d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000070,
        "userName": "123456",
        "userEmail": "123520@imooc.com",
        "job": "111",
        "mobile": "13545621586",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 3,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000071,
        "userName": "12366",
        "userEmail": "123654@imooc.com",
        "mobile": "13712345689",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["62c79242c44e48db6133009d", "609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000072,
        "userName": "123321",
        "userEmail": "123666@imooc.com@imooc.com@imooc.com@imooc.com",
        "job": "3",
        "mobile": "136666666789",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": [
          "62c84b4cc44e48db6133183f",
          "62c83077c44e48db6133171d",
          "62c8f605c44e48db61331a76",
          "609781b45ccd183084f8ea3d",
          "62c8c3e8c44e48db613318c8"
        ],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000073,
        "userName": "1000003",
        "userEmail": "2983711@qq.com@imooc.com",
        "job": "管理员",
        "mobile": "13567829983",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d", "62c84b4cc44e48db6133183f"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000074,
        "userName": "123123",
        "userEmail": "123123@imooc.com",
        "job": "123",
        "mobile": "15010132131",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000075,
        "userName": "12313123",
        "userEmail": "123123123@imooc.com",
        "job": "123",
        "mobile": "15019395919",
        "__v": 0
      },
      {
        "deptId": [
          "624acef3bebf9f948b7a6aca",
          "62551aa18a91fae1f3854275",
          "62cabc63c44e48db613322a9"
        ],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000076,
        "userName": "hahhahah",
        "userEmail": "123123@imooc.com@imooc.com",
        "job": "12312",
        "mobile": "13120502008",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000077,
        "userName": "will",
        "userEmail": "20210903@imooc.com",
        "job": "初级web工程师",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "628ccac48a91fae1f385699f"],
        "state": 2,
        "role": 1,
        "roleList": ["62caba8cc44e48db6133226f"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000078,
        "userName": "Li",
        "userEmail": "66666666@imooc.com",
        "job": "leader",
        "mobile": "13790867453",
        "__v": 0
      },
      {
        "deptId": [
          "624acef3bebf9f948b7a6aca",
          "62551aa18a91fae1f3854275",
          "62cabc63c44e48db613322a9"
        ],
        "state": 2,
        "role": 1,
        "roleList": ["62ca9d99c44e48db6133213f"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000079,
        "userName": "小白",
        "userEmail": "666999@imooc.com",
        "job": "高级web前端工程师",
        "mobile": "18256780943",
        "__v": 0
      },
      {
        "deptId": [
          "624acef3bebf9f948b7a6aca",
          "628ccac48a91fae1f385699f",
          "62c817b8c44e48db6133156f",
          "62cabc42c44e48db613322a5"
        ],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000080,
        "userName": "小李",
        "userEmail": "1222@imooc.com",
        "__v": 0
      },
      {
        "deptId": ["624acef3bebf9f948b7a6aca", "62551aa18a91fae1f3854275"],
        "state": 2,
        "role": 1,
        "roleList": ["62caba8cc44e48db6133226f"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000081,
        "userName": "Liu",
        "userEmail": "Liu@gmail.com",
        "job": "大数据",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": [
          "624acef3bebf9f948b7a6aca",
          "62551aa18a91fae1f3854275",
          "62da15d2c44e48db61334500"
        ],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000082,
        "userName": "1211111",
        "userEmail": "111111@qq.com@qq.com",
        "__v": 0,
        "job": "架构师",
        "mobile": "17600000000"
      },
      {
        "deptId": [null],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000083,
        "userName": "SSS",
        "userEmail": "sss@imooc.com",
        "__v": 0
      },
      {
        "deptId": [
          "624acef3bebf9f948b7a6aca",
          "62551aa18a91fae1f3854275",
          "62da15d2c44e48db61334500"
        ],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000084,
        "userName": "发发发",
        "userEmail": "770992789@imooc.com",
        "__v": 0
      },
      {
        "deptId": [null],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000085,
        "userName": "CVV",
        "userEmail": "尝尝@imooc.com",
        "__v": 0
      },
      {
        "deptId": [
          "624acef3bebf9f948b7a6aca",
          "62551aa18a91fae1f3854275",
          "62da15d2c44e48db61334500"
        ],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000086,
        "userName": "test_01",
        "userEmail": "test01@imooc.com",
        "__v": 0
      },
      {
        "deptId": [
          "62ed2cf2c44e48db613361b4",
          "62f1b8dec44e48db613364bf",
          "62f50e01c44e48db61336c01"
        ],
        "state": 1,
        "role": 1,
        "roleList": ["62ca9d99c44e48db6133213f"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000087,
        "userName": "xiaoyang",
        "userEmail": "222222@qq.com",
        "mobile": "13029476352",
        "__v": 0,
        "job": null
      },
      {
        "deptId": ["62ed2cf2c44e48db613361b4"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000088,
        "userName": "amy",
        "userEmail": "123456@qq.com@imooc.com",
        "job": "1312",
        "mobile": "13213153456",
        "__v": 0
      },
      {
        "deptId": ["62ed2cf2c44e48db613361b4"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000089,
        "userName": "ZS",
        "userEmail": "ZS123@imooc.com",
        "job": "开发",
        "mobile": "13745678910",
        "__v": 0
      },
      {
        "deptId": ["62f1b8dec44e48db613364bf"],
        "state": 2,
        "role": 1,
        "roleList": [],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000090,
        "userName": "test1",
        "userEmail": "test1@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["62ed2cf2c44e48db613361b4"],
        "state": 2,
        "role": 1,
        "roleList": ["62f25b33c44e48db613366cb"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000091,
        "userName": "jack1",
        "userEmail": "jack@imooc.com@imooc.com",
        "job": "",
        "mobile": "",
        "__v": 0
      },
      {
        "deptId": ["62ed2cf2c44e48db613361b4", "62f1b8dec44e48db613364bf"],
        "state": 2,
        "role": 1,
        "roleList": ["609781b45ccd183084f8ea3d"],
        "createTime": "2022-07-04T04:36:41.365Z",
        "lastLoginTime": "2022-07-04T04:36:41.365Z",
        "userId": 1000092,
        "userName": "alex-chan",
        "userEmail": "dff@imooc.com@imooc.com",
        "job": "点都德",
        "mobile": "18523232423",
        "__v": 0
      }
    ]
  },
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'查询失败'
}
```

#### 所有用户列表

**GET "/users/all/list"**

> request

```
{}
```

> response

success

```json
{
  "code": 200,
  "data": [
    {
      "state": 1,
      "role": "0",
      "roleList": [
        "60180b07b1eaed6c45fbebdb",
        "60150cb764de99631b2c3cd3",
        "60180b59b1eaed6c45fbebdc"
      ],
      "deptId": ["60167059c9027b7d2c520a61", "60167345c6a4417f2d27506f"],
      "userId": 1000002,
      "userName": "admin",
      "userEmail": "admin@imooc.com",
      "createTime": "2021-01-17T13:32:06.381Z",
      "lastLoginTime": "2021-01-17T13:32:06.381Z",
      "__v": 0,
      "job": "前端架构师",
      "mobile": "17611020000"
    }
  ],
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'查询失败'
}
```

#### 用户创建/编辑

**POST "/users/operate"**

> request

```
{
	userId,userName,userEmail,mobile,job,state,roleList,deptId,
	action // edit:编辑 add:新增
}
```

> response

success

```json
{
  "code": 200,
  "data": "修改成功/创建成功",
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'修改失败/创建失败'
}
```

#### 用户删除

**POST "/users/delete"**

> request

```
{
	userIds:[userId,userId]//可单个删除，也可批量删除
}
```

> response

success

```json
{
  "code": 200,
  "data": {
    "nModified": 1
    //删除成功条数
  },
  "msg": "删除成功1条"
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'删除失败'
}
```

#### 用户权限列表

**GET "/users/getPermissionList"**

> request

```
{}
```

> response

success

```json
{
  "code": 200,
  "data": [
    {
      "parentId": [null],
      "createTime": "2021-04-04T13:23:49.765Z",
      "updateTime": "2021-04-04T13:23:49.765Z",
      "_id": "6069beb8b306e7f18dd72efc",
      "menuType": 1,
      "menuState": 1,
      "menuName": "系统管理",
      "icon": "Setting",
      "path": "/system",
      "__v": 0,
      "children": [
        {
          "parentId": ["6069beb8b306e7f18dd72efc"],
          "createTime": "2021-04-04T13:23:49.765Z",
          "updateTime": "2021-05-16T13:33:43.236Z",
          "_id": "6069bec6b306e7f18dd72efd",
          "menuType": 1,
          "menuState": 1,
          "menuName": "用户管理",
          "path": "/system/user",
          "__v": 0,
          "component": "User",
          "children": [
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6069bec6b306e7f18dd72efd"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e80d92ea01921486ecac",
              "menuType": 2,
              "menuState": 1,
              "menuName": "新增",
              "menuCode": "user-create",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6069bec6b306e7f18dd72efd"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e81c92ea01921486ecad",
              "menuType": 2,
              "menuState": 1,
              "menuName": "编辑",
              "menuCode": "user-edit",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6069bec6b306e7f18dd72efd"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e82592ea01921486ecae",
              "menuType": 2,
              "menuState": 1,
              "menuName": "删除",
              "menuCode": "user-delete",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6069bec6b306e7f18dd72efd"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e83392ea01921486ecaf",
              "menuType": 2,
              "menuState": 1,
              "menuName": "批量删除",
              "menuCode": "user-patch-delete",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6069bec6b306e7f18dd72efd"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e80d92ea01921486ecac",
              "menuType": 2,
              "menuState": 1,
              "menuName": "新增",
              "menuCode": "user-create",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6069bec6b306e7f18dd72efd"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e81c92ea01921486ecad",
              "menuType": 2,
              "menuState": 1,
              "menuName": "编辑",
              "menuCode": "user-edit",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6069bec6b306e7f18dd72efd"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e82592ea01921486ecae",
              "menuType": 2,
              "menuState": 1,
              "menuName": "删除",
              "menuCode": "user-delete",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6069bec6b306e7f18dd72efd"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e83392ea01921486ecaf",
              "menuType": 2,
              "menuState": 1,
              "menuName": "批量删除",
              "menuCode": "user-patch-delete",
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["6069beb8b306e7f18dd72efc"],
          "createTime": "2021-04-04T13:23:49.765Z",
          "updateTime": "2021-05-16T13:33:54.312Z",
          "_id": "6083d756c30e1188761493f2",
          "menuType": 1,
          "menuState": 1,
          "menuName": "菜单管理",
          "path": "/system/menu",
          "__v": 0,
          "component": "Menu",
          "children": [
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d756c30e1188761493f2"
              ],
              "createTime": "2021-04-24T05:00:05.659Z",
              "updateTime": "2021-04-24T05:00:05.659Z",
              "_id": "6083f63bc30e1188761493f4",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "menuCode": "menu_query",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d756c30e1188761493f2"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e84c92ea01921486ecb0",
              "menuType": 2,
              "menuState": 1,
              "menuName": "新增",
              "menuCode": "menu-create",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d756c30e1188761493f2"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e85392ea01921486ecb1",
              "menuType": 2,
              "menuState": 1,
              "menuName": "编辑",
              "menuCode": "menu-edit",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d756c30e1188761493f2"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e85c92ea01921486ecb2",
              "menuType": 2,
              "menuState": 1,
              "menuName": "删除",
              "menuCode": "menu-delete",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d756c30e1188761493f2"
              ],
              "createTime": "2021-04-24T05:00:05.659Z",
              "updateTime": "2021-04-24T05:00:05.659Z",
              "_id": "6083f63bc30e1188761493f4",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "menuCode": "menu_query",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d756c30e1188761493f2"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e84c92ea01921486ecb0",
              "menuType": 2,
              "menuState": 1,
              "menuName": "新增",
              "menuCode": "menu-create",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d756c30e1188761493f2"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e85392ea01921486ecb1",
              "menuType": 2,
              "menuState": 1,
              "menuName": "编辑",
              "menuCode": "menu-edit",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d756c30e1188761493f2"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e85c92ea01921486ecb2",
              "menuType": 2,
              "menuState": 1,
              "menuName": "删除",
              "menuCode": "menu-delete",
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["6069beb8b306e7f18dd72efc"],
          "createTime": "2021-04-24T05:00:05.659Z",
          "updateTime": "2021-05-16T13:33:59.788Z",
          "_id": "6083d76bc30e1188761493f3",
          "menuType": 1,
          "menuState": 1,
          "menuName": "角色管理",
          "path": "/system/role",
          "__v": 0,
          "component": "Role",
          "children": [
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-16T09:40:51.253Z",
              "_id": "60978d6a3c0c8738d016ca5f",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "menuCode": "role-query",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e87392ea01921486ecb3",
              "menuType": 2,
              "menuState": 1,
              "menuName": "创建",
              "menuCode": "role-create",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e87b92ea01921486ecb4",
              "menuType": 2,
              "menuState": 1,
              "menuName": "编辑",
              "menuCode": "role-edit",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e88792ea01921486ecb5",
              "menuType": 2,
              "menuState": 1,
              "menuName": "设置权限",
              "menuCode": "role-setting",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e89192ea01921486ecb6",
              "menuType": 2,
              "menuState": 1,
              "menuName": "删除",
              "menuCode": "role-delete",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-16T09:40:51.253Z",
              "_id": "60978d6a3c0c8738d016ca5f",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "menuCode": "role-query",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e87392ea01921486ecb3",
              "menuType": 2,
              "menuState": 1,
              "menuName": "创建",
              "menuCode": "role-create",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e87b92ea01921486ecb4",
              "menuType": 2,
              "menuState": 1,
              "menuName": "编辑",
              "menuCode": "role-edit",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e88792ea01921486ecb5",
              "menuType": 2,
              "menuState": 1,
              "menuName": "设置权限",
              "menuCode": "role-setting",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "6083d76bc30e1188761493f3"
              ],
              "createTime": "2021-05-16T09:34:46.325Z",
              "updateTime": "2021-05-16T09:34:46.325Z",
              "_id": "60a0e89192ea01921486ecb6",
              "menuType": 2,
              "menuState": 1,
              "menuName": "删除",
              "menuCode": "role-delete",
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["6069beb8b306e7f18dd72efc"],
          "createTime": "2021-05-09T07:17:23.890Z",
          "updateTime": "2021-05-16T13:34:04.099Z",
          "_id": "60979e4d3c0c8738d016ca60",
          "menuType": 1,
          "menuState": 1,
          "menuName": "部门管理",
          "path": "/system/dept",
          "__v": 0,
          "component": "Dept",
          "children": [
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "60979e4d3c0c8738d016ca60"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-09T07:17:23.890Z",
              "_id": "60979e5a3c0c8738d016ca61",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "menuCode": "dept-query",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "60979e4d3c0c8738d016ca60"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-09T07:17:23.890Z",
              "_id": "60a0e8b092ea01921486ecb7",
              "menuType": 2,
              "menuState": 1,
              "menuName": "创建",
              "menuCode": "dept-create",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "60979e4d3c0c8738d016ca60"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-09T07:17:23.890Z",
              "_id": "60a0e8b892ea01921486ecb8",
              "menuType": 2,
              "menuState": 1,
              "menuName": "编辑",
              "menuCode": "dept-edit",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "60979e4d3c0c8738d016ca60"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-09T07:17:23.890Z",
              "_id": "60a0e8c392ea01921486ecb9",
              "menuType": 2,
              "menuState": 1,
              "menuName": "删除",
              "menuCode": "dept-delete",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "60979e4d3c0c8738d016ca60"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-09T07:17:23.890Z",
              "_id": "60979e5a3c0c8738d016ca61",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "menuCode": "dept-query",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "60979e4d3c0c8738d016ca60"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-09T07:17:23.890Z",
              "_id": "60a0e8b092ea01921486ecb7",
              "menuType": 2,
              "menuState": 1,
              "menuName": "创建",
              "menuCode": "dept-create",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "60979e4d3c0c8738d016ca60"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-09T07:17:23.890Z",
              "_id": "60a0e8b892ea01921486ecb8",
              "menuType": 2,
              "menuState": 1,
              "menuName": "编辑",
              "menuCode": "dept-edit",
              "__v": 0
            },
            {
              "parentId": [
                "6069beb8b306e7f18dd72efc",
                "60979e4d3c0c8738d016ca60"
              ],
              "createTime": "2021-05-09T07:17:23.890Z",
              "updateTime": "2021-05-09T07:17:23.890Z",
              "_id": "60a0e8c392ea01921486ecb9",
              "menuType": 2,
              "menuState": 1,
              "menuName": "删除",
              "menuCode": "dept-delete",
              "__v": 0
            }
          ]
        }
      ]
    },
    {
      "parentId": [null],
      "createTime": "2021-04-04T13:23:49.765Z",
      "updateTime": "2021-05-23T08:09:22.386Z",
      "_id": "6069bedfb306e7f18dd72efe",
      "menuType": 1,
      "menuState": 1,
      "menuName": "审批管理",
      "icon": "Promotion",
      "path": "/audit",
      "__v": 0,
      "children": [
        {
          "parentId": ["6069bedfb306e7f18dd72efe"],
          "createTime": "2021-05-23T08:38:08.857Z",
          "updateTime": "2021-05-23T08:44:40.671Z",
          "_id": "60aa14a5e6b0fa3dc8fb5024",
          "menuType": 1,
          "menuState": 1,
          "menuName": "休假申请",
          "path": "/audit/leave",
          "__v": 0,
          "component": "Leave",
          "children": [
            {
              "parentId": [
                "6069bedfb306e7f18dd72efe",
                "60aa14a5e6b0fa3dc8fb5024"
              ],
              "createTime": "2021-05-23T08:44:03.968Z",
              "updateTime": "2021-05-23T08:44:03.968Z",
              "_id": "60aa1675a19f033ebc1c7f92",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "menuCode": "leave-query",
              "__v": 0
            },
            {
              "parentId": [
                "6069bedfb306e7f18dd72efe",
                "60aa14a5e6b0fa3dc8fb5024"
              ],
              "createTime": "2022-04-04T11:00:58.088Z",
              "updateTime": "2022-04-04T11:00:58.088Z",
              "_id": "62c259048a91fae1f385a811",
              "menuType": 1,
              "menuName": "转发",
              "icon": "",
              "path": "",
              "component": "",
              "menuState": 1,
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "6069bedfb306e7f18dd72efe",
                "60aa14a5e6b0fa3dc8fb5024"
              ],
              "createTime": "2021-05-23T08:44:03.968Z",
              "updateTime": "2021-05-23T08:44:03.968Z",
              "_id": "60aa1675a19f033ebc1c7f92",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "menuCode": "leave-query",
              "__v": 0
            },
            {
              "parentId": [
                "6069bedfb306e7f18dd72efe",
                "60aa14a5e6b0fa3dc8fb5024"
              ],
              "createTime": "2022-04-04T11:00:58.088Z",
              "updateTime": "2022-04-04T11:00:58.088Z",
              "_id": "62c259048a91fae1f385a811",
              "menuType": 1,
              "menuName": "转发",
              "icon": "",
              "path": "",
              "component": "",
              "menuState": 1,
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["6069bedfb306e7f18dd72efe"],
          "createTime": "2021-05-23T08:38:08.857Z",
          "updateTime": "2021-05-29T10:23:47.974Z",
          "_id": "60aa14b6e6b0fa3dc8fb5025",
          "menuType": 1,
          "menuState": 1,
          "menuName": "待审批",
          "path": "/audit/approve",
          "__v": 0,
          "component": "Approve",
          "children": [
            {
              "parentId": [
                "6069bedfb306e7f18dd72efe",
                "60aa14b6e6b0fa3dc8fb5025"
              ],
              "createTime": "2021-05-23T08:38:08.857Z",
              "updateTime": "2021-05-29T10:10:52.079Z",
              "_id": "60b2164931165fbf56a7d674",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "__v": 0,
              "menuCode": "approve-query"
            },
            {
              "parentId": [
                "6069bedfb306e7f18dd72efe",
                "60aa14b6e6b0fa3dc8fb5025"
              ],
              "createTime": "2021-05-23T08:38:08.857Z",
              "updateTime": "2021-05-29T10:10:52.079Z",
              "_id": "60b2165f31165fbf56a7d675",
              "menuType": 2,
              "menuState": 1,
              "menuName": "审核",
              "__v": 0,
              "menuCode": "approve-check"
            }
          ],
          "action": [
            {
              "parentId": [
                "6069bedfb306e7f18dd72efe",
                "60aa14b6e6b0fa3dc8fb5025"
              ],
              "createTime": "2021-05-23T08:38:08.857Z",
              "updateTime": "2021-05-29T10:10:52.079Z",
              "_id": "60b2164931165fbf56a7d674",
              "menuType": 2,
              "menuState": 1,
              "menuName": "查看",
              "__v": 0,
              "menuCode": "approve-query"
            },
            {
              "parentId": [
                "6069bedfb306e7f18dd72efe",
                "60aa14b6e6b0fa3dc8fb5025"
              ],
              "createTime": "2021-05-23T08:38:08.857Z",
              "updateTime": "2021-05-29T10:10:52.079Z",
              "_id": "60b2165f31165fbf56a7d675",
              "menuType": 2,
              "menuState": 1,
              "menuName": "审核",
              "__v": 0,
              "menuCode": "approve-check"
            }
          ]
        }
      ]
    }
  ],
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'查询失败'
}
```

#### 菜单列表

**POST "/menu/list"**

> request

```
{
  menuName,
  menuState
}
```

> response

success

```json
{
  "code": 200,
  "data": [
    {
      "parentId": [null],
      "updateTime": "2021-03-06T10:03:38.947Z",
      "createTime": "2021-01-30T09:22:00.000Z",
      "_id": "600d4075e218daaf4ec77e52",
      "menuType": "1",
      "menuName": "系统管理",
      "menuCode": "",
      "path": "/system",
      "icon": "el-icon-setting",
      "order": "0",
      "component": "",
      "children": [
        {
          "parentId": ["600d4075e218daaf4ec77e52"],
          "updateTime": "2021-02-04T07:12:21.077Z",
          "createTime": "2021-01-30T08:10:00.000Z",
          "_id": "600d525e602f452aaeeffcd9",
          "menuType": "1",
          "menuName": "用户管理",
          "menuCode": "",
          "path": "/system/user",
          "icon": "",
          "order": "1",
          "component": "/system/user",
          "menuState": "1",
          "children": [
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "600d525e602f452aaeeffcd9"
              ],
              "updateTime": "2021-02-21T09:54:44.242Z",
              "createTime": "2021-02-20T06:46:50.711Z",
              "_id": "6030ca8f93f0e159c8390f0c",
              "menuType": "2",
              "menuState": "1",
              "menuName": "新增",
              "menuCode": "user-create",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "600d525e602f452aaeeffcd9"
              ],
              "updateTime": "2021-02-21T09:54:50.464Z",
              "createTime": "2021-02-21T08:50:47.217Z",
              "_id": "603226d9257d15a8c54cf9f8",
              "menuType": "2",
              "menuState": "1",
              "menuName": "批量删除",
              "menuCode": "user-delete",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "600d525e602f452aaeeffcd9"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "603253e0a821c6bb59084541",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "user-query",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "600d525e602f452aaeeffcd9"
              ],
              "updateTime": "2021-02-21T09:54:44.242Z",
              "createTime": "2021-02-20T06:46:50.711Z",
              "_id": "6030ca8f93f0e159c8390f0c",
              "menuType": "2",
              "menuState": "1",
              "menuName": "新增",
              "menuCode": "user-create",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "600d525e602f452aaeeffcd9"
              ],
              "updateTime": "2021-02-21T09:54:50.464Z",
              "createTime": "2021-02-21T08:50:47.217Z",
              "_id": "603226d9257d15a8c54cf9f8",
              "menuType": "2",
              "menuState": "1",
              "menuName": "批量删除",
              "menuCode": "user-delete",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "600d525e602f452aaeeffcd9"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "603253e0a821c6bb59084541",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "user-query",
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["600d4075e218daaf4ec77e52"],
          "updateTime": "2021-02-04T09:52:40.576Z",
          "createTime": "2021-02-04T09:52:40.576Z",
          "_id": "601bc4f8a794e23c2e42efa9",
          "menuType": "1",
          "menuState": "1",
          "menuName": "菜单管理",
          "path": "/system/menu",
          "component": "/system/menu",
          "__v": 0,
          "children": [
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601bc4f8a794e23c2e42efa9"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60325400a821c6bb59084543",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "menu-query",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601bc4f8a794e23c2e42efa9"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "6032540fa821c6bb59084544",
              "menuType": "2",
              "menuState": "1",
              "menuName": "创建",
              "menuCode": "menu-create",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601bc4f8a794e23c2e42efa9"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60325400a821c6bb59084543",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "menu-query",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601bc4f8a794e23c2e42efa9"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "6032540fa821c6bb59084544",
              "menuType": "2",
              "menuState": "1",
              "menuName": "创建",
              "menuCode": "menu-create",
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["600d4075e218daaf4ec77e52"],
          "updateTime": "2021-02-04T09:52:40.576Z",
          "createTime": "2021-02-04T09:52:40.576Z",
          "_id": "601ca9a8a794e23c2e42efab",
          "menuType": "1",
          "menuState": "1",
          "menuName": "角色管理",
          "path": "/system/role",
          "component": "/system/role",
          "__v": 0,
          "children": [
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601ca9a8a794e23c2e42efab"
              ],
              "updateTime": "2021-02-21T12:38:19.650Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60325425a821c6bb59084545",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "role-query",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601ca9a8a794e23c2e42efab"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60325461a821c6bb59084546",
              "menuType": "2",
              "menuState": "1",
              "menuName": "创建",
              "menuCode": "role-create",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601ca9a8a794e23c2e42efab"
              ],
              "updateTime": "2021-02-21T12:38:19.650Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60325425a821c6bb59084545",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "role-query",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601ca9a8a794e23c2e42efab"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60325461a821c6bb59084546",
              "menuType": "2",
              "menuState": "1",
              "menuName": "创建",
              "menuCode": "role-create",
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["600d4075e218daaf4ec77e52"],
          "updateTime": "2021-02-04T09:52:40.576Z",
          "createTime": "2021-02-04T09:52:40.576Z",
          "_id": "601cb172a794e23c2e42efac",
          "menuType": "1",
          "menuState": "1",
          "menuName": "部门管理",
          "path": "/system/dept",
          "component": "/system/dept",
          "__v": 0,
          "children": [
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601cb172a794e23c2e42efac"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60325470a821c6bb59084547",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "dept-query",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601cb172a794e23c2e42efac"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "6032547da821c6bb59084548",
              "menuType": "2",
              "menuState": "1",
              "menuName": "创建",
              "menuCode": "dept-create",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601cb172a794e23c2e42efac"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60325470a821c6bb59084547",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "dept-query",
              "__v": 0
            },
            {
              "parentId": [
                "600d4075e218daaf4ec77e52",
                "601cb172a794e23c2e42efac"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "6032547da821c6bb59084548",
              "menuType": "2",
              "menuState": "1",
              "menuName": "创建",
              "menuCode": "dept-create",
              "__v": 0
            }
          ]
        }
      ]
    },
    {
      "parentId": [null],
      "updateTime": "2021-02-18T01:42:15.243Z",
      "createTime": "2021-02-04T06:56:46.506Z",
      "_id": "601b9eb25929c81a1f988bb0",
      "menuType": "1",
      "menuState": "1",
      "menuName": "审批管理",
      "path": "/audit",
      "icon": "el-icon-s-promotion",
      "__v": 0,
      "children": [
        {
          "parentId": ["601b9eb25929c81a1f988bb0"],
          "updateTime": "2021-02-19T14:50:00.555Z",
          "createTime": "2021-02-04T09:52:40.576Z",
          "_id": "601bc763a794e23c2e42efaa",
          "menuType": "1",
          "menuState": "1",
          "menuName": "休假申请",
          "path": "/audit/leave",
          "component": "/audit/leave",
          "__v": 0,
          "children": [
            {
              "parentId": [
                "601b9eb25929c81a1f988bb0",
                "601bc763a794e23c2e42efaa"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "603254a8a821c6bb59084549",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "leave-query",
              "__v": 0
            },
            {
              "parentId": [
                "601b9eb25929c81a1f988bb0",
                "601bc763a794e23c2e42efaa"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "603254baa821c6bb5908454a",
              "menuType": "2",
              "menuState": "1",
              "menuName": "申请休假",
              "menuCode": "leave-create",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "601b9eb25929c81a1f988bb0",
                "601bc763a794e23c2e42efaa"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "603254a8a821c6bb59084549",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "leave-query",
              "__v": 0
            },
            {
              "parentId": [
                "601b9eb25929c81a1f988bb0",
                "601bc763a794e23c2e42efaa"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "603254baa821c6bb5908454a",
              "menuType": "2",
              "menuState": "1",
              "menuName": "申请休假",
              "menuCode": "leave-create",
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["601b9eb25929c81a1f988bb0"],
          "updateTime": "2021-02-19T14:53:04.590Z",
          "createTime": "2021-02-04T09:52:40.576Z",
          "_id": "602fd045bf465a015fef54dc",
          "menuType": "1",
          "menuState": "1",
          "menuName": "待我审批",
          "path": "/audit/approve",
          "component": "/audit/approve",
          "__v": 0,
          "children": [
            {
              "parentId": [
                "601b9eb25929c81a1f988bb0",
                "602fd045bf465a015fef54dc"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60361f35a821c6bb5908454d",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "approve-query",
              "__v": 0
            }
          ],
          "action": [
            {
              "parentId": [
                "601b9eb25929c81a1f988bb0",
                "602fd045bf465a015fef54dc"
              ],
              "updateTime": "2021-02-21T11:06:19.345Z",
              "createTime": "2021-02-21T11:06:19.345Z",
              "_id": "60361f35a821c6bb5908454d",
              "menuType": "2",
              "menuState": "1",
              "menuName": "查看",
              "menuCode": "approve-query",
              "__v": 0
            }
          ]
        }
      ]
    }
  ],
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'查询失败'
}
```

#### 菜单创建/编辑/删除

**POST "/menu/operate"**

> request

```
{
  "_id",
  "action", // create: 创建 edit:编辑 delete:删除
  "menuType":1,//菜单类型 1:菜单 2:按钮
  "menuName":"系统管理",//菜单名称
  "menuCode":"",//菜单标识符，只有按钮类型才有，用于确定按钮权限
  "path":"/system",//菜单路由
  "icon":"el-icon-setting",//菜单图标
  "component":"",//组件地址
  "parentId":[null],//父菜单ID
}
```

> response

success

```json
{
  "code": 200,
  "data": {},
  "msg": "菜单创建/修改/删除成功"
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 部门列表

**GET "/dept/list"**

> request

```
{
  deptName
}
```

> response

success

```json
{
  "code": 200,
  "data": [
    {
      "parentId": [null],
      "updateTime": "2021-01-31T08:53:37.418Z",
      "createTime": "2021-01-31T08:53:37.418Z",
      "_id": "60167059c9027b7d2c520a61",
      "deptName": "橘子皮",
      "userId": "1000002",
      "userName": "admin",
      "userEmail": "admin@imooc.com",
      "__v": 0,
      "children": [
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-01-31T09:03:23.337Z",
          "createTime": "2021-01-31T09:03:23.337Z",
          "_id": "6016728fc6a4417f2d27506e",
          "deptName": "研发部门",
          "userId": "1000003",
          "userName": "jack",
          "userEmail": "jack@imooc.com",
          "__v": 0,
          "children": [
            {
              "parentId": [
                "60167059c9027b7d2c520a61",
                "6016728fc6a4417f2d27506e"
              ],
              "updateTime": "2021-02-01T13:05:06.188Z",
              "createTime": "2021-01-31T09:19:09.081Z",
              "_id": "60167621531124822b79e124",
              "deptName": "JAVA小组-1",
              "userId": "1000010",
              "userName": "Tim",
              "userEmail": "Tim@imooc.com",
              "__v": 0
            }
          ]
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-02-21T12:44:16.249Z",
          "createTime": "2021-01-31T09:03:23.337Z",
          "_id": "60167345c6a4417f2d27506f",
          "deptName": "前端部门",
          "userId": "1000004",
          "userName": "tom",
          "userEmail": "tom@imooc.com",
          "__v": 0
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-01-31T09:03:23.337Z",
          "createTime": "2021-01-31T09:03:23.337Z",
          "_id": "6016734ec6a4417f2d275070",
          "deptName": "测试部门",
          "userId": "1000005",
          "userName": "Lucy",
          "userEmail": "Lucy@imooc.com",
          "__v": 0
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-01-31T09:03:23.337Z",
          "createTime": "2021-01-31T09:03:23.337Z",
          "_id": "6016735ac6a4417f2d275071",
          "deptName": "UED部门",
          "userId": "1000006",
          "userName": "Jim",
          "userEmail": "Jim@imooc.com",
          "__v": 0
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-01-31T09:03:23.337Z",
          "createTime": "2021-01-31T09:03:23.337Z",
          "_id": "60167375c6a4417f2d275072",
          "deptName": "大数据部门",
          "userId": "1000007",
          "userName": "MaLi",
          "userEmail": "MaLi@imooc.com",
          "__v": 0
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-02-01T14:06:49.922Z",
          "createTime": "2021-02-01T14:06:49.922Z",
          "_id": "60180ce5b1eaed6c45fbebe5",
          "deptName": "市场部门",
          "userId": "1000011",
          "userName": "Baidu",
          "userEmail": "Baidu@imooc.com",
          "__v": 0
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-02-01T14:06:49.922Z",
          "createTime": "2021-02-01T14:06:49.922Z",
          "_id": "6018119bb1eaed6c45fbebe6",
          "deptName": "运营部门",
          "userId": "1000012",
          "userName": "TengXun",
          "userEmail": "TengXun@imooc.com",
          "__v": 0
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-02-01T14:06:49.922Z",
          "createTime": "2021-02-01T14:06:49.922Z",
          "_id": "601811dfb1eaed6c45fbebe7",
          "deptName": "运维部门",
          "userId": "1000014",
          "userName": "Apple",
          "userEmail": "Apple@imooc.com",
          "__v": 0
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-02-18T16:29:35.671Z",
          "createTime": "2021-02-18T16:29:35.671Z",
          "_id": "602f0e679aac702f1dc8b0f3",
          "deptName": "人事部",
          "userId": "1000011",
          "userName": "Baidu",
          "userEmail": "Baidu@imooc.com",
          "__v": 0
        },
        {
          "parentId": ["60167059c9027b7d2c520a61"],
          "updateTime": "2021-02-18T16:29:35.671Z",
          "createTime": "2021-02-18T16:29:35.671Z",
          "_id": "602f0e779aac702f1dc8b0f4",
          "deptName": "财务部",
          "userId": "1000013",
          "userName": "Ali",
          "userEmail": "Ali@imooc.com",
          "__v": 0
        }
      ]
    }
  ],
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 部门创建/编辑/删除

**POST "/dept/operate"**

> request

```
{
  "parentId":[null],//父对象Id，一级部门默认为null
  "deptName":"前端开发部",
  "userId":1000001,//负责人，用户ID
  "userName":"Jack",//部门负责人
  "userEmail":"jack@163.com",//同上
  "updateTime":ISODate("2021-01-17T13:32:06.381Z"),//更新时间
}
```

> response

success

```json
{
  "code": 200,
  "data": {},
  "msg": "部门创建/修改/删除成功"
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 角色列表

**GET "/roles/list"**

> request

```
{
  "roleName":"",//角色名称
}
```

> response

success

```json
{
  "code": 200,
  "data": {
    "page": {
      "pageNum": 1,
      "pageSize": 10,
      "total": 8
    },
    "list": [
      {
        "permissionList": {
          "checkedKeys": [
            "6030ca8f93f0e159c8390f0c",
            "603226d9257d15a8c54cf9f8",
            "603253e0a821c6bb59084541",
            "6032572ba821c6bb5908454b"
          ],
          "halfCheckedKeys": [
            "600d525e602f452aaeeffcd9",
            "600d4075e218daaf4ec77e52"
          ]
        },
        "_id": "60150cb764de99631b2c3cd3",
        "roleName": "产品经理",
        "remark": "产品人员使用",
        "createTime": "2021-01-30T07:37:27.793Z",
        "__v": 0
      },
      {
        "permissionList": {
          "checkedKeys": [
            "6030ca8f93f0e159c8390f0c",
            "603226d9257d15a8c54cf9f8",
            "603253e0a821c6bb59084541",
            "6032572ba821c6bb5908454b",
            "60325b51a821c6bb5908454c",
            "60325400a821c6bb59084543",
            "6032540fa821c6bb59084544",
            "603254a8a821c6bb59084549",
            "603254baa821c6bb5908454a"
          ],
          "halfCheckedKeys": [
            "600d525e602f452aaeeffcd9",
            "601bc4f8a794e23c2e42efa9",
            "601bc763a794e23c2e42efaa",
            "600d4075e218daaf4ec77e52",
            "601b9eb25929c81a1f988bb0"
          ]
        },
        "_id": "60180b07b1eaed6c45fbebdb",
        "roleName": "研发",
        "remark": "Javascript",
        "createTime": "2021-02-01T14:07:03.592Z",
        "__v": 0
      },
      {
        "permissionList": {
          "checkedKeys": [
            "603253e0a821c6bb59084541",
            "60325400a821c6bb59084543",
            "60325425a821c6bb59084545",
            "60325470a821c6bb59084547",
            "603254a8a821c6bb59084549"
          ],
          "halfCheckedKeys": [
            "600d4075e218daaf4ec77e52",
            "600d525e602f452aaeeffcd9",
            "601bc4f8a794e23c2e42efa9",
            "601ca9a8a794e23c2e42efab",
            "601cb172a794e23c2e42efac",
            "601b9eb25929c81a1f988bb0",
            "601bc763a794e23c2e42efaa"
          ]
        },
        "_id": "60180b59b1eaed6c45fbebdc",
        "roleName": "测试",
        "createTime": "2021-02-01T14:08:25.722Z",
        "__v": 0
      },
      {
        "permissionList": {
          "checkedKeys": [
            "60325470a821c6bb59084547",
            "6032547da821c6bb59084548",
            "603254a8a821c6bb59084549",
            "603254baa821c6bb5908454a"
          ],
          "halfCheckedKeys": [
            "601cb172a794e23c2e42efac",
            "601bc763a794e23c2e42efaa",
            "600d4075e218daaf4ec77e52",
            "601b9eb25929c81a1f988bb0"
          ]
        },
        "_id": "60180b5eb1eaed6c45fbebdd",
        "roleName": "JAVA",
        "createTime": "2021-02-01T14:08:30.757Z",
        "__v": 0
      },
      {
        "permissionList": {
          "checkedKeys": [
            "60325425a821c6bb59084545",
            "60325461a821c6bb59084546",
            "60325470a821c6bb59084547",
            "6032547da821c6bb59084548",
            "603254a8a821c6bb59084549",
            "603254baa821c6bb5908454a"
          ],
          "halfCheckedKeys": [
            "601ca9a8a794e23c2e42efab",
            "601cb172a794e23c2e42efac",
            "601bc763a794e23c2e42efaa",
            "600d4075e218daaf4ec77e52",
            "601b9eb25929c81a1f988bb0"
          ]
        },
        "_id": "60180b64b1eaed6c45fbebde",
        "roleName": "运维",
        "createTime": "2021-02-01T14:08:36.100Z",
        "__v": 0
      },
      {
        "permissionList": {
          "checkedKeys": [
            "6030ca8f93f0e159c8390f0c",
            "603226d9257d15a8c54cf9f8",
            "603253e0a821c6bb59084541",
            "6032572ba821c6bb5908454b",
            "60325b51a821c6bb5908454c"
          ],
          "halfCheckedKeys": [
            "600d525e602f452aaeeffcd9",
            "600d4075e218daaf4ec77e52"
          ]
        },
        "_id": "60180b69b1eaed6c45fbebdf",
        "roleName": "运营",
        "createTime": "2021-02-01T14:08:41.342Z",
        "__v": 0
      },
      {
        "permissionList": {
          "checkedKeys": [
            "60325400a821c6bb59084543",
            "6032540fa821c6bb59084544",
            "60325425a821c6bb59084545",
            "60325461a821c6bb59084546"
          ],
          "halfCheckedKeys": [
            "601bc4f8a794e23c2e42efa9",
            "601ca9a8a794e23c2e42efab",
            "600d4075e218daaf4ec77e52"
          ]
        },
        "_id": "60180b76b1eaed6c45fbebe0",
        "roleName": "市场",
        "createTime": "2021-02-01T14:08:54.316Z",
        "__v": 0
      },
      {
        "permissionList": {
          "checkedKeys": [
            "6030ca8f93f0e159c8390f0c",
            "603226d9257d15a8c54cf9f8",
            "603253e0a821c6bb59084541",
            "6032572ba821c6bb5908454b",
            "60325b51a821c6bb5908454c",
            "60325400a821c6bb59084543",
            "6032540fa821c6bb59084544",
            "60325425a821c6bb59084545",
            "60325461a821c6bb59084546",
            "60325470a821c6bb59084547",
            "6032547da821c6bb59084548",
            "603254a8a821c6bb59084549",
            "603254baa821c6bb5908454a",
            "602fd045bf465a015fef54dc"
          ],
          "halfCheckedKeys": [
            "600d4075e218daaf4ec77e52",
            "600d525e602f452aaeeffcd9",
            "601bc4f8a794e23c2e42efa9",
            "601ca9a8a794e23c2e42efab",
            "601cb172a794e23c2e42efac",
            "601b9eb25929c81a1f988bb0",
            "601bc763a794e23c2e42efaa"
          ]
        },
        "_id": "60180b80b1eaed6c45fbebe1",
        "roleName": "管理层",
        "createTime": "2021-02-01T14:09:04.759Z",
        "__v": 0
      }
    ]
  },
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 角色名称列表

> (创建用户时，需要设置对应角色)

**GET "/roles/allList"**

> request

```
{}
```

> response

success

```json
{
  "code": 200,
  "data": [
    {
      "_id": "60150cb764de99631b2c3cd3",
      "roleName": "产品经理"
    },
    {
      "_id": "60180b07b1eaed6c45fbebdb",
      "roleName": "研发"
    },
    {
      "_id": "60180b59b1eaed6c45fbebdc",
      "roleName": "测试"
    },
    {
      "_id": "60180b5eb1eaed6c45fbebdd",
      "roleName": "JAVA"
    },
    {
      "_id": "60180b64b1eaed6c45fbebde",
      "roleName": "运维"
    },
    {
      "_id": "60180b69b1eaed6c45fbebdf",
      "roleName": "运营"
    },
    {
      "_id": "60180b76b1eaed6c45fbebe0",
      "roleName": "市场"
    },
    {
      "_id": "60180b80b1eaed6c45fbebe1",
      "roleName": "管理层"
    }
  ],
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 角色创建/编辑/删除

**POST "/roles/operate"**

> request

```
{
	"_id":"",
	"action":"", // create:创建 edit:编辑 delete:删除
  "roleName":"产品经理",//角色名称
  "remark":"产品专用",//备注信息
}
```

> response

success

```json
{
  "code": 200,
  "data": {},
  "msg": "角色创建/修改/删除成功"
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 角色设置权限

**POST "/roles/update/permission"**

> request

```
{
	"_id":"",
  "permissionList":{
    "checkedKeys":[ObjectId("")],//选中的子菜单
    "halfCheckedKeys":[ObjectId("")],//半选中的父菜单
  },//权限列表
}
```

> response

success

```json
{
  "code": 200,
  "data": {},
  "msg": "角色权限更新成功"
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 审批列表

> 申请列表和审核列表接口公用，通过 type 区分

**GET "/leave/list"**

> request

```
{
	"type":"",// approve:审核  默认用户审批列表
  "applyState":"",
  "pageNum":"",
  "pageSize":"",
}
```

> response

success

```json
{
  "code": 200,
  "data": {
    "page": {
      "pageNum": 1,
      "pageSize": 10,
      "total": 4
    },
    "list": [
      {
        "applyUser": {
          "userId": "1000002",
          "userName": "admin"
        },
        "applyState": 4,
        "_id": "603081dd525ae1359dd7e2fb",
        "applyType": 1,
        "startTime": "2021-02-17T16:00:00.000Z",
        "endTime": "2021-02-18T16:00:00.000Z",
        "leaveTime": "2天",
        "reasons": "测试",
        "orderNo": "XJ202102200",
        "auditUsers": "tom,Baidu,Ali",
        "curAuditUserName": "Ali",
        "auditFlows": [
          {
            "_id": "603081dd525ae1359dd7e2fc",
            "userId": "1000004",
            "userName": "tom",
            "userEmail": "tom@imooc.com"
          },
          {
            "_id": "603081dd525ae1359dd7e2fd",
            "userId": "1000011",
            "userName": "Baidu",
            "userEmail": "Baidu@imooc.com"
          },
          {
            "_id": "603081dd525ae1359dd7e2fe",
            "userId": "1000013",
            "userName": "Ali",
            "userEmail": "Ali@imooc.com"
          }
        ],
        "auditLogs": [
          {
            "_id": "603082f316663b36f713b16b",
            "userId": "1000004",
            "userName": "tom",
            "createTime": "2021-02-20T03:33:07.175Z",
            "remark": "tongyi",
            "action": "审核通过"
          },
          {
            "_id": "6030b1df93f0e159c8390f01",
            "userId": "1000011",
            "userName": "Baidu",
            "createTime": "2021-02-20T06:53:19.493Z",
            "remark": "同意",
            "action": "审核通过"
          },
          {
            "_id": "6030b1fb93f0e159c8390f04",
            "userId": "1000013",
            "userName": "Ali",
            "createTime": "2021-02-20T06:53:47.955Z",
            "remark": "OK",
            "action": "审核通过"
          }
        ],
        "createTime": "2021-02-20T03:28:29.850Z",
        "__v": 0
      }
    ]
  },
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 待审批通知数量

**GET "/leave/count"**

> request

```
{}
```

> response

success

```json
{
  "code": 200,
  "data": 3,
  // 通知数量
  "msg": ""
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 创建申请单

**POST "/leave/operate"**

> request

```
{
	// 参照审批流 申请  数据结构
	action: "" //create:创建 edit:编辑 delete:删除
}
```

> response

success

```json
{
  "code": 200,
  "data": {},
  "msg": "创建/修改/删除成功"
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```

#### 审核

**POST "/leave/approve"**

> request

```
{
	_id,
	remark,
	action: "" //create:创建 edit:编辑 delete:删除
}
```

> response

success

```json
{
  "code": 200,
  "data": {},
  "msg": "审核通过/审核拒绝"
}
```

fail

```
{
	code:30001,
	data:'',
	msg:'操作失败'
}
```
