
import request from '../api/request';

// 发送一个网络请求
request({
    url: '/test?use=911',
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
        a: 100,
        b: 200
    },
    data: {
        msg: '这是一个请求体参数'
    },
    success: function (res) {
        console.log(res);
    },
    fail: function (err) {
        console.log(err);
    }
});

let spaceBoat = document.getElementById('spaceBoat');

spaceBoat.src = require('../assets/media/space.mp4');

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

function * demo () {
    yield 'MMB';
}

let d = demo();

console.log(d);