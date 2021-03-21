/**
 * @files 处理CSS文件中的URL
 * @author yanghuning 2021.03.21
 */

/**
 * @param {String} source 资源
 */
module.exports = function (source) {
    let result = null;
    if (/^https?:\/\//.test(this.query.publicPath)) {
        result = source;
    } else {
        result = source.replace(/___CSS_LOADER_URL_REPLACEMENT_0___\s?= /g, '___CSS_LOADER_URL_REPLACEMENT_0___ = ' + '\'' + this.query.dirPath + '\'' + ' +');
    }
    return result;
}