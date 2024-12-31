const svgCaptcha = require('svg-captcha');
// 验证码生成svg
function generateCaptcha(req, res) {
    try {
        // 生成验证码
        const captcha = svgCaptcha.create({
            size: 4, // 验证码长度
            noise: 2, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景颜色，则默认有
            background: '#ffffff' // 验证码图片背景颜色
        });
        // 将验证码文本保存到session中，以便之后验证
        req.session.captcha = captcha.text;
        // 设置响应头
        res.setHeader('Content-Type', 'image/svg+xml');
        // 发送svg图片
        res.send(captcha.data);
    }catch (error) {
        res.status(500).json({
            status: false,
            message: '获取验证码失败',
            errors:[error.message]
        })
    }

}

// 验证码生成base64
function generateImgBase64(req, res) {
    try {
        // 生成验证码
        const captcha = svgCaptcha.create({
            size: 4, // 验证码长度
            noise: 2, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景颜色，则默认有
            background: '#ffffff' // 验证码图片背景颜色
        });

        // 将验证码文本保存到session中，以便之后验证
        req.session.captcha = captcha.text;
        // 将SVG字符串转换为Base64编码
        const base64 = Buffer.from(captcha.data).toString('base64');

        // 返回Base64编码的验证码图片
        res.json({
            code: 200,
            status: true,
            message: '获取验证码成功',
            data:{
                base64Code: `data:image/svg+xml;base64,${base64}`
            }
        });
    }catch(error) {
        res.status(500).json({
            status: false,
            message: '获取验证码失败',
            errors:[error.message]
        })
    }

}

// 生成随机字符串
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// 成功处理函数
function successHandler(res, data, message) {
    res.json({
        code: 200,
        status: true,
        message: message,
        data: data
    })
}

// 失败处理函数
function errorHandler(res, message, errors) {
    res.status(500).json({
        status: false,
        message: message,
        errors: errors
    })
}

module.exports = {
    generateCaptcha,
    generateImgBase64,
    successHandler,
    errorHandler,
}
