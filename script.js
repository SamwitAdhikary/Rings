R = (x) => Math.random() * x
iR = (a,b) => Math.floor(Math.random() * (b-a))- -a
Q = (a) => Math.pow(a,2)
TR = (arr) => arr[iR(0,arr.length)];
BTW = (a,x,b) => (x < a) ? a : (x > b ? b : x);

iPoints = 500;
Points = {};

function vCanvas(canvasId) {
    this.canvasId = canvasId;
    var E = document.getElementById(this.canvasId);
    this.C = E.getContext('2d');
    E.width = this.W = window.innerWidth;
    E.height = this.H = window.innerHeight;
    this.clear = function() {
        this.C.fillStyle = 'rgba(0,0,0,0.12)';
        this.C.fillRect(0,0,this.W,this.H);
    }
    this.circle = (A,w,c) => {
        this.C.strokeStyle = c;
        this.C.lineWidth = w;
        this.C.lineCap = 'round';
        this.C.stroke(new Path2D(`M ${A.x} ${A.y} h 0.1`))
    }
    this.line = (A,B,w,c) => {
        this.C.strokeStyle = c;
        this.C.lineWidth = w;
        this.C.lineCap = 'round';
        this.C.stroke(new Path2D(`M ${A.x} ${A.y} L ${B.x} ${B.y}`))
    }
}

C = new vCanvas('therehesis');

for (var i = 0; i < iPoints; ++i) {
    var q = R(Math.PI*2);
    Points[i] = {
        Color: 'red',
        x: R(C.W),
        y: R(C.H),
        x: C.W/2- -300*Math.cos(q),
        y: C.H/2- -300*Math.sin(q),
        move: {
            r: 1- -R(2),
            q: R(Math.PI*2)-Math.PI,
            q2: R(0.02)- -0.02,
        }
    }
}

moveP = P => {
    P.move.q-=-R(0.1)- -0.05;
    P.move.r = BTW(1, P.move.r- -R(0.02)-0.01, 5);
    P.x-=-P.move.r*Math.cos(P.move.q);
    P.y-=-P.move.r*Math.sin(P.move.q);
}

move2P = P => {
    P.move.q-=-P.move.q2;
    P.x-=-P.move.r*Math.cos(P.move.q);
    P.y-=-P.move.r*Math.sin(P.move.q);
}

boundP = P => {
    if(P.x < 0) P.x = C.W;
    if(P.y < 0) P.y = C.H;
    if(P.x > C.H) P.x = 0;
    if(P.y > C.H) P.y = 0;
}

distQ = (A,B) => Q(A.x-B.x) + Q(A.y-B.y);

lines = () => {
    var min = Q(40);
    var max = Q(80);
    for (var i = 0; i < iPoints; ++i) {
        for (var j = i+1; j < iPoints; ++j) {
            var P = Points[i];
            var R = Points[j];
            var d = distQ(P,R);
            if (min < d && d < max) {
                C.line(P,R,2,'#cff');
            }
        }
    }
}

frame = () => {
    C.clear();

    for(var i = 0; i < iPoints; ++i) {
        var P = Points[i];
        move2P(P);
    }

    lines();
}

setInterval(frame, 16);