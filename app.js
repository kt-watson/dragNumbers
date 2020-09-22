window.addEventListener('load', init);

const offset = 64;
const papa1 = new Audio('papa1.mp3');
const pa1 = new Audio('pa1.mp3');
const trumpet1 = new Audio('trumpet1.mp3');

function init(){

    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    //ゲーム開始ボタンのクリックイベント
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click',function(e){
        const top = document.getElementById('top'); 
        top.style.display="none";
    });

    //マウスストーカー用のdivを取得
    const stalker = document.getElementById('stalker'); 

    const drager = document.getElementById('drager'); 

    //上記のdivタグをマウスに追従させる処理
    document.addEventListener('mousemove', async function (e) {
        stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
        let nowNumber = Number(drager.textContent);
        let cross = await judgeBall(e.clientX,e.clientY,nowNumber);
        if (cross === 'cross') {
            papa1.play();
            drager.textContent = nowNumber + 1;
            if (nowNumber === 10){
                trumpet1.play();
                const end = document.getElementById('end'); 
                end.style.display="flex";
            }
        }
    });

    //appのdivを取得
    const app = document.getElementById("app");

    for (let step = 1; step <= 10; step++) {
        let newBall = document.createElement("div"); 
        newBall.classList.add("ball");
        let newNumber = document.createElement("div");
        let numberText = document.createTextNode(step);
        newNumber.classList.add("number");
        newNumber.appendChild(numberText);
        newBall.appendChild(newNumber);
        app.appendChild(newBall);
        let randomX = getRandomInt(100,width - 100);
        let randomY = getRandomInt(100,height- 100);
        newBall.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
      }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

async function judgeBall(x,y,number){
    return new Promise((resolve, reject) => {
        let ballList = document.getElementsByClassName("ball");
        Array.prototype.forEach.call(ballList,function(ball) {
            let matrix = new WebKitCSSMatrix(ball.style.transform);
            let x_ball = matrix.e;
            let y_ball = matrix.f;
            let number_ball = Number(ball.textContent);
    
            if (x > (x_ball - offset) && x < (x_ball + offset) && y > (y_ball - offset) && y < (y_ball + offset) && number_ball === number ){
                console.log("cross");
                ball.style.display="none";
                resolve('cross');
            }
          });
          resolve('notCross');
    });
}