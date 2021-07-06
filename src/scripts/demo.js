
// 测试接口
fetchData();

function fetchData () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', process.env.BASE_API + 'test', true),
    xhr.send();
    xhr.onload = function () {
        var res = null;
        try {
            res = JSON.parse(xhr.responseText);
        } catch (e) {
            res  = xhr.responseText;
        }
        console.log(res);
    };
    xhr.onerror = function () {
        var res = null;
        try {
            res = JSON.parse(xhr.responseText);
        } catch (e) {
            res  = xhr.responseText;
        }
        console.log(res);
    }
}

let boat = document.getElementsByClassName('space-boat')[0];

let url = require('../assets/images/start.png');

boat.src = url;

document.getElementById('player').src = require('../assets/media/20210325.mp3');

const a = 50;
const b = 80;

const c = (x, y) => x + y;

console.log(c(a, b));

let obj1 = {
    city1: '北京'
}

let obj2 = {
    city2: '上海'
}

let obj3 = {
    ...obj1,
    ...obj2
}

console.log(obj3);