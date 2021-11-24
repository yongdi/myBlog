import User from '../models/user.js';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import config from '../configs/';
const theCache = require('./cache');

export async function initUser() {
    let user = await User.find().exec().catch(err => {
        console.log(err);
    });
    if (user.length === 0) {
        // 目前还没做修改密码的功能，因为是单用户系统觉得需求不大
        // 如果想更换用户名／密码，先将数据库原有user删除(drop)
        // 配置中加入用户名密码，重启服务即可
        user = new User({
            name: 'hjm',
            username: config.admin.user,
            password: md5(config.admin.pwd).toUpperCase(),
            avatar: '',
            createTime: new Date(),
        });
        await user.save().catch(err => {
            console.log(err);
        });
    }
}

export async function login(ctx) {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;

    const fail_key = theCache.keyLogin + 'fail' + username,
            ban_key = theCache.keyLogin + 'ban' + username

    if (theCache.cache.has(ban_key))
        ctx.throw(403, '请勿暴力破解!')

    let user = await User.findOne({
        username,
    }).exec();
    if (user !== null) {
        if (user.password === password) {
            const token = jwt.sign({
                uid: user._id,
                name: user.name,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 hours
            }, config.jwt.secret);
            ctx.body = {
                success: true,
                uid: user._id,
                name: user.name,
                token: token,
            };
        } else {
            anti_crack(fail_key, ban_key)

            ctx.throw(401, '密码错误');
        }
    } else {
        anti_crack(fail_key, ban_key)

        ctx.throw(401, '用户名错误');
    }
}

/**
 * 记录破解
 * @param {type} fail_key
 * @param {type} ban_key
 * @returns {undefined}
 */
var anti_crack = (fail_key, ban_key) => {
    // 增加失败次数
    let fails = theCache.cache.get(fail_key)
    if (!fails)
        fails = 0
    fails++
    theCache.cache.set(fail_key, fails, 60)
    
    // 超过阈值，封禁10分钟
    if (fails >= 3)
        theCache.cache.set(ban_key, 1, 300)
}
