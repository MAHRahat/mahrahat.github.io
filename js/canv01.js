var lcanvas;
var ctx;
var rad;
var shells;
var SHELLS_TOTAL;

function init()
{
	lcanvas = document.getElementById("logincanvas");
	lcanvas.width = window.innerWidth;
	lcanvas.height = window.innerHeight;
	ctx = lcanvas.getContext('2d');
	rad = 2;
	SHELLS_TOTAL = 100;
	ctx.lineWidth = 2;
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0, 0, lcanvas.width, lcanvas.height);
	shells = [];
	for (i = 0; i < SHELLS_TOTAL; i++)
	{
		shells.push(createShell());
	}
	loop();
	setInterval(loop, 10);
}

function createShell()
{
	var shell = {
		position: {x: Math.random() * lcanvas.width, y: Math.random() * lcanvas.height},
		x: 0,
		y: 0,
		dx: Math.random() < 0.5 ? 1 : -1,
		dy: 0,
		vi: Math.floor(Math.random() * 5) - 10,
		vf: 0,
		color: "#" + Math.floor(Math.random() * 256 * 256 * 256)
	};
	shell.x = shell.position.x;
	shell.y = shell.position.y;
	return shell;
}

function loop()
{
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0, 0, lcanvas.width, lcanvas.height);
	for (i = 0; i < SHELLS_TOTAL; i++)
	{
		var shell = shells[i];
		var lastPos = {x: shell.position.x, y: shell.position.y};
		shell.vf = shell.vi + 0.1;
		shell.dy = 0.5 * (shell.vi + shell.vf);
		shell.vi = shell.vf;
		shell.position.x += shell.dx;
		shell.position.y += shell.dy*0.35;
		ctx.beginPath();
		ctx.strokeStyle = shell.color;
		ctx.fillStyle = shell.color;
		ctx.moveTo(lastPos.x, lastPos.y);
		ctx.lineTo(shell.position.x, shell.position.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(shell.position.x, shell.position.y, rad, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
		if (shell.position.y >= shell.y || shell.position.y <= -50 || shell.position.y >= lcanvas.height + 50 || shell.position.x <= -50 || shell.position.x >= lcanvas.width + 50)
		{
			shells[i] = createShell();
		}
	}
}
