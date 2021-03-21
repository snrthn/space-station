/**
 * @files 处理环境变量
 * @author yanghuning 2021.03.21
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