const router = require('koa-router')();
const model = require('../mysql/mysql')
const sha1 = require('sha1')
const tools = require('../tools/tools')
const createToken = require('../tools/createToken')
// const { uploadFile } = require('../tools/upload')
const { success, fail, tokenInvalid } = require('../config/config').codeOption

router.prefix('/api/user')
router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body
    const userInfo = await model.getUser(username)
    if (!userInfo.length) {
        return ctx.body = {
            code: fail,
            msg: '无此用户'
        }
    }
    console.log(userInfo)
    if (userInfo[0].password !== sha1(password)) {
        return ctx.body = {
            code: fail,
            msg: '密码错误'
        }
    }
    //用户和密码都正确
    ctx.body = {
        code: 1,
        data: userInfo[0],
        token: createToken({ username })
    }
})
router.put('/signup', async (ctx) => {
    const { username, password, repeatPwd } = ctx.request.body
    console.log(username, password, repeatPwd)
    if (password !== repeatPwd) {
        return ctx.body = {
            code: fail,
            data: '两次密码不一致'
        }
    }
    const userInfo = await model.getUser(username)
    if (userInfo.length) {
        return ctx.body = {
            code: fail,
            msg: '已注册'
        }
    }
    await model.signup([username, sha1(password), tools.guid()]).then(res => {
        ctx.body = {
            code: success,
            data: 'success'
        }
    }).catch(err => {
        ctx.body = {
            code: fail,
            msg: JSON.stringify(err)
        }
    })
})
router.post('/bindPhone', async (ctx) => {
    const { phone, userid } = ctx.request.body
    await model.bindPhone(userid, phone).then(res => {
        ctx.body = {
            code: success,
            data: 'success'
        }
    }).catch(err => {
        ctx.body = {
            code: fail,
            msg: JSON.stringify(err)
        }
    })
})
// router.post('/uploadAvatar',async (ctx)=>{

// })
module.exports = router
