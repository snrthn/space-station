/**
 * 工具箱
 */

/**
 * 处理 Webpack 环境变量
 * @param {Object} obj 
 */
exports.handleEnvConst = function (obj) {
    if (!(obj instanceof Object)) return {};
    let result = {};
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            result[key] = '\'' + obj[key] + '\'';
        } else {
            result[key] = obj[key]
        }
    }
    return result;
}