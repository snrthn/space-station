
console.log('中华人民共和国');

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

let url = require('../assets/images/start.jpg');

boat.src = url;

document.getElementById('player').src = require('../assets/media/20210325.mp3');