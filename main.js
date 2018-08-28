const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = canvas.width;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;
const PADDLE_SPEED = 5;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 20;

const input = new Input();
const ball = new Ball(400, 300, 10, 'red');
const paddle = new Paddle(400, 550, 80, 10, 'deepskyblue');
const blocks = [];

let score = 0;

ctx.fillStyle = "white";
for(let ii = 0; ii < 5; ii++) {
    for (let i = 0; i < 13; i++) {
        blocks.push(new Block(70 + (i * 55), 50 + (ii * 25), BLOCK_WIDTH, BLOCK_HEIGHT, "lime"));
    }
}
window.setInterval(game_tick, SPF);

function game_tick() {
    // 入力状況に応じた呼び出し
    if (input.space) {
        ball.start(5);
    }
    if (input.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (input.right) {
        paddle.move(PADDLE_SPEED);
    }
    if(input.up){
        location.reload();
    }

    // ボールの移動
    ball.move();
    // ボールとブロックの当たり判定
    paddle.collide(ball);
    // ボールとブロックの当たり判定
    blocks_collide();

    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    ctx.fillText("score", 10, 10);
    ctx.fillText(score.toString(), 50, 10);
    if(score >= 650){
        ctx.fillText("クリア", 400, 250);
        ctx.fillText("tap upArrow to replay", 400, 300);
    }
    if(ball.top >= 600 && score < 650) {
        ctx.fillText("ミス", 400, 250);
        ctx.fillText("tap upArrow to replay", 400, 300);
    }
    paddle.draw(ctx);
    ball.draw(ctx);
    blocks.forEach((block) => block.draw(ctx));
}

function blocks_collide() {
    // 動作確認用のサンプルコード
    for(let i = 0; i < blocks.length; i++) {
        if (blocks[i] && blocks[i].collide(ball)) {
            blocks.splice(i, 1);
            score += 10;
        }
    }
}
