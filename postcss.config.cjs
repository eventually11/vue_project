// postcss.config.cjs
const postcssPxtorem = require('postcss-pxtorem');

module.exports = {
    plugins: [
        postcssPxtorem({
            rootValue: 16, // 根据设计稿设置
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            unitPrecision: 5, // 转换后的精度
        })
    ]
};
