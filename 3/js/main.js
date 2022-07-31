var name = "马冬梅";
var flag = false;

function getParam(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }

    return null;
}

var count = 0;

function show() {
    if (flag) {
        return;
    }

    var nowDate = new Date();
    var h = nowDate.getHours();
    var m = nowDate.getMinutes();
    if (h == 5 && m == 20) {
        flag = true;
        document.getElementById('bgm').play();
        $('.out').fadeOut(5000, function () {
            $('#scene').fadeIn(2000, function () {
                $('#i').text('I');
                $('#love').text('Love');
                $('#you').text('You');
                count++;
                showName();
            });
        });
    }

    setTimeout(show, 1500);
}

function showName() {
    if (count > 1) {
        return;
    }

    var canvas = document.querySelector("#scene"),
        ctx = canvas.getContext("2d"),
        particles = [],
        amount = 0,
        mouse = {
            x: 0,
            y: 0
        },
        radius = 0.7; //Init radius of the force field

    var colors = ["rgba(26, 188, 156, .6)", "rgba(46, 204, 113, .4)", "rgba(52, 152, 219, .4)", "rgba(52, 152, 219, .4)", "rgba(241, 196, 15, .6)", "rgba(231, 76, 60, .4)"];

    var colorsTwo = ["rgba(26, 188, 156, 1)", "rgba(46, 204, 113, 1)", "rgba(52, 152, 219, 1)", "rgba(52, 152, 219, 1)", "rgba(241, 196, 15, 1)", "rgba(231, 76, 60, 1)"];

    var initSize = Math.floor(Math.random() * .6) + 1;
    var hoverSize = initSize + .7;

    var ww = canvas.width = window.innerWidth;
    var wh = canvas.height = window.innerHeight;

    function Particle(x, y) {
        this.x = Math.random() * ww;
        this.y = Math.random() * wh;
        this.dest = {
            x: x,
            y: y
        };
        //this.r = Math.random() * 1; // the size of bubbles
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random() * 0.015 + 0.94; // force of bounce, just try to change 0.015 to 0.5

        //this.color = colors[Math.floor(Math.random() * 10)];
        //this.colorTwo = colorsTwo[Math.floor(Math.random() * 10)];

    }

    Particle.prototype.render = function () {

        this.accX = (this.dest.x - this.x) / 200; //acceleration for X
        this.accY = (this.dest.y - this.y) / 200; //acceleration for Y
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        var a = this.x - mouse.x;
        var b = this.y - mouse.y;

        var distance = Math.sqrt(a * a + b * b);
        if (distance < (radius * 70)) {
            this.accX = (this.x - mouse.x) / 20; //acceleration on mouseover X, smaller faster
            this.accY = (this.y - mouse.y) / 20; //acceleration on mouseover Y, smaller faster
            this.vx += this.accX;
            this.vy += this.accY;
            //ctx.fillStyle = this.colorTwo;
        }

        if (distance < (radius * 70)) {
            this.colorTwo = colorsTwo[Math.floor(Math.random() * 10)];
            ctx.fillStyle = this.colorTwo;
            this.r = hoverSize; // the size of bubbles
        }

        if (distance > (radius * 70)) {
            this.colorOne = colors[Math.floor(Math.random() * 10)];
            ctx.fillStyle = this.colorOne;
            this.r = initSize
        }

    }

    function onMouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function initScene() {
        ww = canvas.width = window.innerWidth;
        wh = canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold " + (ww / 10) + "px sans-serif"; // Size of the text
        ctx.textAlign = "center";
        ctx.fillText(name, ww / 2, wh / 2); //Centering

        var data = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];
        for (var i = 0; i < ww; i += Math.round(ww / 400)) { //400 here represents the amount of particles
            for (var j = 0; j < wh; j += Math.round(ww / 400)) {
                if (data[((i + j * ww) * 4) + 3] > 250) {
                    particles.push(new Particle(i, j));
                }
            }
        }
        amount = particles.length;

    }

    function onMouseClick() {
        radius = 4; //onclick expand radius

    }

    function offMouseClick() {
        radius = 0.5; //offClick init radius
    }

    function delayedInitRadius() {
        setTimeout(offMouseClick, 500); //delay for offClick init radius
    }

    function render(a) {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < amount; i++) {
            particles[i].render();
        }
    };

    window.addEventListener("resize", initScene);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseClick);
    window.addEventListener("mouseup", delayedInitRadius);
    initScene();
    requestAnimationFrame(render);
}

$(function () {
    var val = getParam('for');
    name = val == null || val.trim().length < 1 ? name : val;
    show();
});
