/**
 * @files 封装request对象
 * @author yanghuning
 * @date 2021-07-15
 */

/**
 * 发起request网络请求
 * @param {object} options 参数对象
 * @param {string} options.method 请求方法
 * @param {string} options.url 请求路径
 * @param {boolean} options.async 同步异步
 * @param {object} options.headers 请求头
 * @param {object} options.params URL参数
 * @param {object} options.data 请求体
 * @param {function} options.success 成功回调
 * @param {function} options.fail 异常回调
 */

request.reqInterceptor = function (config) {

    console.log('请求拦截器已捕获');
    console.log(config);

    return config;
}

request.resInterceptor = function (result) {

    console.log('响应拦截器已捕获');
    console.log(result);

    return result;
}

function request (options) {

    // 定义请求对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        // XMLHttpRequest对象
        xhr = new XMLHttpRequest();
    } else {
        // 微软低版本IE以下使用 Microsoft.XMLHttp 组件
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 判断空参数
    if (!options) options = {};

    // 设置请求拦截器
    var fnSelf = request; // 引用request自身

    if (fnSelf.reqInterceptor && Object.prototype.toString.call(fnSelf.reqInterceptor) === '[object Function]') {
        options = fnSelf.reqInterceptor(options);
        if (!options) return;
    }

    // 请求方法
    var method = options.method || 'GET';

    // 基础路径
    var baseUrl = new RegExp('^(http|https)://').test(options.url) ? '' : (new RegExp('/$').test(process.env.BASE_API) ? process.env.BASE_API : process.env.BASE_API + '/');

    // 请求路径
    var reqPath = baseUrl + (new RegExp('^/').test(options.url) ? options.url.substr(1) : options.url) 

    // 转化URL参数
    var urlParams = '';
    if (options.params && Object.prototype.toString.call(options.params) === '[object Object]') {
        urlParams = options.url.indexOf('?') !== -1 ? '&' : '?';
        for (var key in options.params) {
            urlParams += key + '=' + options.params[key].toString() + '&';
        }
        urlParams = urlParams.substr(0, urlParams.length - 1);
    }

    // 同步异步
    var isAsync = options.async === undefined ? true : options.async;
    
    xhr.open(method, reqPath.replace(/\/+/g, '/') + urlParams, !!options.async || isAsync);

    // 设置请求头
    if (options.headers && Object.prototype.toString.call(options.headers) === '[object Object]') {
        for (var key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
    }

    // 发送请求参数
    if (!options.method || options.method.toUpperCase() === 'GET') {
        xhr.send();
    } else {
        var data = options.data || {};
        if (options.headers && options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            var dataStr = '';
            for (var key in data) {
                dataStr += key + '=' + data[key] + '&';
            }
            if (dataStr) dataStr = dataStr.substr(0, dataStr.length - 1);
            xhr.send(dataStr);
        } else {
            xhr.send(JSON.stringify(data));
        }
    }

    // 监听请求动态
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
            // 请求正常返回
            var res = null;
            try {
                res = JSON.parse(xhr.responseText);
            } catch (e) {
                res = xhr.responseText;
            }

            if (fnSelf.resInterceptor && Object.prototype.toString.call(fnSelf.resInterceptor) === '[object Function]') {
                // 设置响应拦截器
                var result = fnSelf.resInterceptor(res);
                if (result) options.success(result);
            } else if (options.success && Object.prototype.toString.call(options.success) === '[object Function]') {
                options.success(res);
            }
        }
        
        if (xhr.readyState === 4 && (xhr.status >= 400)) {
            // 请求异常返回
            var res = null;
            try {
                res = JSON.parse(xhr.responseText);
            } catch (e) {
                res = xhr.status + ' ' + xhr.statusText;
            }
            
            if (fnSelf.resInterceptor && Object.prototype.toString.call(fnSelf.resInterceptor) === '[object Function]') {
                // 设置响应拦截器
                var result = fnSelf.resInterceptor(res);
                if (result) options.success(result);
            } else if (options.fail && Object.prototype.toString.call(options.fail) === '[object Function]') {
                options.fail(res);
            }
        }

        if (xhr.readyState === 4 && (!xhr.status || xhr.status === 0)) {
            // 请求网络异常
            var errStr = {
                message: '网络异常'
            }
            if (fnSelf.resInterceptor && Object.prototype.toString.call(fnSelf.resInterceptor) === '[object Function]') {
                // 设置响应拦截器
                var result = fnSelf.resInterceptor(errStr);
                if (result) options.fail(result);
            } else if (options.fail && Object.prototype.toString.call(options.fail) === '[object Function]') {
                options.fail(errStr);
            }
        }
    }
}

export default request;