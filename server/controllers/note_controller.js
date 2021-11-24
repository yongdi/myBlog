import Note from '../models/note';
const ch = require('./cache');

/*export async function init() {
    const n = await Note.count().catch(err => {
        console.log(err);
    });

    if (n > 0) {
        return;
    }

    const node = new Note({
        key: '1',
        message: 'default',
    });
    await node.save().catch(err => {
        console.log(err);
    });
}*/

export async function init() {
    ch.cache.set(ch.keyNode, 'hello world')
}

/*export async function createNote(ctx) {
    const msg = ctx.request.body.msg;
    // console.log('request create ' + msg);
    if (msg === '') {
        ctx.throw(400, 'msg不能为空');
    }
    const updated = await Note.findOneAndUpdate({key: '1'},
        {
            $set: {message: msg},
        },
        {
            new: true, // 返回最新
        }).catch(err => {
        ctx.throw(500, '服务器错误');
    });
    ctx.body = {
        success: true,
        message: updated.message,
    };
}*/
export async function createNote(ctx) {
    const msg = ctx.request.body.msg;
    ch.cache.set(ch.keyNode, msg)
    ctx.body = {
        success: true,
        message: msg,
    };
}

/*export async function getNote(ctx) {
    const note = await Note.findOne({key: '1'}).catch(err => {
        ctx.throw(500, '服务器内部错误');
    });
    // console.log('server find pk: ' + note.message);
    ctx.body = {
        success: true,
        message: note.message,
    };
}*/

export async function getNote(ctx) {
    let v = ch.cache.get(ch.keyNode)
    // console.log('server find pk: ' + note.message);
    ctx.body = {
        success: true,
        message: v,
    };
}
