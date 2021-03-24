var DIR = {
    DIR_LEFT: 1,
    DIR_TOP: 2,
    DIR_RIGHT: 3,
    DIR_BOTTOM: 4
};
//地图大小
var mapSize = {
    width: 900,
    height: 500
}
// 每个盒子的大小
var box = {
    width: 50,
    height: 50
}
var nums = {
    wNum: mapSize['width'] / box['width'],//18
    hNum: mapSize['height'] / box['height'],//10
}
//snake 身体
var snake = []

//其余
var others = []

var dir = DIR.DIR_RIGHT

var s = 0

function initMap() {
    var map = document.getElementById('map')
    map.style.width = mapSize['width'] + 'px'
    map.style.height = mapSize['height'] + 'px'
    var Span = null;
    for (let i = 1; i <= nums['hNum'] * nums['wNum']; i++) {
        Span = document.createElement('span')
        Span.style.width = box['width'] + 'px'
        Span.style.height = box['height'] + 'px'
        Span.id = i
        map.appendChild(Span)
        if (i <= 3) {
            Span.className = 'snake'
            snake.push(Span)
        } else {
            others.push(Span)
        }
    }
}
function food() {
    var index = Math.floor(Math.random() * others.length);
    others[index].className = 'food';
}
function move() {
    var headId
    switch (dir) {
        case DIR.DIR_LEFT:
            // wNum:宽18 hNum：高10
            headId = parseInt(snake[snake.length - 1].id) - 1;
            if (headId % nums.wNum == 0) headId += nums.wNum;
            break;
        case DIR.DIR_TOP:
            headId = parseInt(snake[snake.length - 1].id) - nums.wNum;
            if (headId < 1) headId += nums.wNum * nums.hNum;
            break;
        case DIR.DIR_RIGHT:
            headId = parseInt(snake[snake.length - 1].id) + 1;
            if (headId % nums.wNum == 1) headId -= nums.wNum;
            break;
        case DIR.DIR_BOTTOM:
            headId = parseInt(snake[snake.length - 1].id) + nums.wNum;
            if (headId > nums.wNum * nums.hNum) headId -= nums.wNum * nums.hNum;
            break;
        default: break;
    }

    var head = document.getElementById(headId);//找到蛇头部
    // span标签
    // console.log(head)
    // Game Over
    for (var i = 1; i < snake.length; i++) {
        if (headId == snake[i].id) {
            alert("Game Over!");
        }
    }
    // 蛇头在others中的索引
    var index
    for (let i = 1; i < others.length; i++) {
        if (headId == others[i].id) {
            index = i
            break
        }
    }
    others.splice(index, 1)
    // console.log(snake);
    snake.push(head)
    // snake中有3个span标签
    // console.log(snake);
    if (head.className == 'food') {
        s = s + 1
        score.innerHTML = s
        food()
    } else {
        snake[0].className = ''
        // 前面不是食物，尾部变为白色
        others.push(snake.shift())
    }
    head.className = 'snake'
    // 头部变为snake的颜色
}

window.onload = function () {
    var score = document.getElementById('score')
    // var score = document.getElementById('score')
    console.log(score)
    initMap()
    food()
    setInterval(move, 1000);
    document.onkeyup = function (event) {
        switch (event.code) {
            case "ArrowLeft": { if (dir == DIR.DIR_RIGHT) break; else { dir = DIR.DIR_LEFT; break; } }
            case "ArrowUp": { if (dir == DIR.DIR_BOTTOM) break; else { dir = DIR.DIR_TOP; break; } }
            case "ArrowRight": { if (dir == DIR.DIR_LEFT) break; else { dir = DIR.DIR_RIGHT; break; } }
            case "ArrowDown": { if (dir == DIR.DIR_TOP) break; else { dir = DIR.DIR_BOTTOM; break; } }
            default: break;
        }
    }
}