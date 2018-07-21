const mysql = require('mysql');
const config = require('../config/config')
//sql 连接池
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})
//sql 查询
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}
//建表
const createTable = (sql) => {
    return query(sql, [])
}

//添加商品分类
const addCategory = (value) => {
    const _sql = `INSERT INTO category(cate,cateId) values(?,?);`
    return query(_sql, value)
}
//添加商品
const addGood = (value) => {
    const _sql = `INSERT INTO goods(cate,cateId,goodId,goodName,desction,imgs,detailImg,price,isHot,isNew) values(?,?,?,?,?,?,?,?,?,?);`
    return query(_sql, value)
}
//获取所有商品
const getAllGoods = () => {
    const _sql = `SELECT * FROM goods;`
    return query(_sql, [])
}
//获取商品分类
const getCates = () => {
    const _sql = `SELECT * FROM category;`
    return query(_sql, [])
}
//获取最新商品
const getNewGoods = () => {
    const _sql = `SELECT * FROM goods where isNew=1;`
    return query(_sql, [])
}
//获取热卖商品
const getHotGoods = () => {
    const _sql = `SELECT * FROM goods where isHot=1;`
    return query(_sql, [])
}
//根据分类获取
const getGoodsByCate = (cateId) => {
    const _sql = `SELECT * FROM goods where cateId="${cateId}";`
    return query(_sql, [])
}
//根据id获取商品
const getGoodById = (goodId) => {
    const _sql = `SELECT * FROM goods where  goodId="${goodId}";`
    return query(_sql, [])
}
const searchGood = (keyword) => {
    const _sql = `SELECT * FROM goods where cate LIKE "%${keyword}%" OR goodName LIKE "%${keyword}%";`
    return query(_sql, [])
}
//添加banner
const addBanner = (value) => {
    const _sql = `INSERT INTO banner(imgId,url) values(?,?);`
    return query(_sql, value)
}
const getHomeBanner = () => {
    const _sql = `SELECT * FROM banner;`
    return query(_sql, [])
}
//添加评论
const addComment = (value) => {
    const _sql = `INSERT INTO comments(goodId,avatar,name,rateScore,comment,time) values(?,?,?,?,?,?);`
    return query(_sql, value)
}
const getComment = (goodId) => {
    const _sql = `SELECT * FROM comments where goodId="${goodId}";`
    return query(_sql, [])
}
const getOrders = (userid) => {
    const _sql = `SELECT * FROM orders where userid="${userid}";`
    return query(_sql, [])
}
const getOrderItem = (orderId) => {
    const _sql = `SELECT * FROM order_item where orderId=${orderId};`
    return query(_sql, [])

}
const addOrder = (value) => {
    const _sql = `INSERT INTO orders(userid,orderId,status) values(?,?,?);`
    return query(_sql, value)
}
const addOrderItem = (value) => {
    const _sql = `INSERT INTO order_item(orderId,goodId,price,number) values(?,?,?,?);`
    return query(_sql, value)
}
const signup = (value) => {
    const _sql = `INSERT INTO user(username,password,userid) values(?,?,?);`
    return query(_sql, value)
}
const getUser = (username) => {
    const _sql = `SELECT * FROM user where username="${username}";`
    return query(_sql, [])
}
const bindPhone = (userid, phone) => {
    const _sql = `UPDATE user SET phone="${phone}" where userid="${userid}";`
    return query(_sql, [userid, phone])
}
module.exports = {
    createTable,
    addCategory,
    getCates,
    addGood,
    getNewGoods,
    getHotGoods,
    getGoodsByCate,
    getGoodById,
    searchGood,
    getAllGoods,
    addBanner,
    getHomeBanner,
    addComment,
    getComment,
    getOrders,
    getOrderItem,
    addOrder,
    addOrderItem,
    signup,
    getUser,
    bindPhone
}