const bulletsArr = [];
let points = 0;
let lives = 3;
let ammo = 10;
class Player {
    constructor(){
        this.width = 50;
        this.height = 70;
        this.x = 900 - (this.width / 2);
        this.y = 0;
        this.domElement = null;
        this.boardWidth = 1920;
        this.boardHeight = 900;
        this.createDomElement();
        this.addEventListeners();
    }
    
    createDomElement(){
        this.domElement = document.createElement("div");

        this.domElement.id = "player";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";

        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.domElement);
    }
    
    moveLeft(){
        this.x -= 20;
        if (this.x > 0) {
            this.domElement.style.left = this.x + "px";
        }
        
    }
    moveRight(){
        this.x += 20;
        this.domElement.style.left = this.x + "px";
    }

    moveUp(){
        this.y += 20;
        this.domElement.style.bottom = this.y + "px";        
    }

    moveDown(){
        this.y -= 20;
        if(this.y < this.boardHeight - this.y){
            this.domElement.style.bottom = this.y + "px";
        }
        
    }

    shooting() {
        if (ammo > 0) {
            bulletsArr.push(new Bullet(this.x, this.y));
            let mySound = new Audio('./audio/laser.mp3');
            mySound.play();
            ammo = ammo - 5;
            ammoDisplay.textContent = `Ammo: ${ammo}`;
        }
    }
    
    addEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                player.moveLeft();
            } else if (event.key === "ArrowRight") {
                player.moveRight();
            }
            else if (event.key === " ") {
                player.shooting()
            }
            else if (event.key === "ArrowUp") {
                player.moveUp();
            }
            else if (event.key === "ArrowDown") {
                player.moveDown();
            }
        });
    }
    
}
const player = new Player ();


class Enemy {
    constructor() {
        this.width = 50;
        this.height = 30;
        this.x = Math.floor(Math.random() * (900 - this.width + 1));
        this.y = 900;
        this.domElement = null;
        this.createDomElement();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.id = "enemy";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";

        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.domElement);
    }

    moveDown() {
        this.y -= 5;
        this.domElement.style.bottom = this.y + "px";
    }
}

let enemiesArr = []
function createEnemies (){
    setInterval(() => {
        const newEnemy = new Enemy();
        enemiesArr.push(newEnemy);
    }, 3000);

    setInterval(() => {
        enemiesArr.forEach((element, index) => {
            element.moveDown();
            if (element.y < 0 - element.height) {
                enemiesArr.splice(index, 1);
                element.domElement.remove();
                lives--; 
                livesDisplay.textContent = `Lives: ${lives}`;
                if (lives === 0) {
                    location.href = `./gameover.html?score=${points}`;
                }
            }
        });
    }, 200);
}

createEnemies();


function createPointsDisplay() {
    const pointsDisplay = document.createElement("div");
    pointsDisplay.id = "points-display";
    pointsDisplay.textContent = `Points: ${points}`;
        
    const parentElement = document.getElementById("board");
    parentElement.appendChild(pointsDisplay);
    return pointsDisplay;
}
const pointsDisplay = createPointsDisplay();

function createLivesDisplay() {
    const livesDisplay = document.createElement("div");
    livesDisplay.id = "lives-display";
    livesDisplay.textContent = `Lives: ${lives}`;
        
    const parentElement = document.getElementById("board");
    parentElement.appendChild(livesDisplay);
    return livesDisplay;
}
const livesDisplay = createLivesDisplay();

function createAmmoDisplay() {
    const ammoDisplay = document.createElement("div");
    ammoDisplay.id = "ammo-display";
    ammoDisplay.textContent = `Ammo: ${ammo}`;
        
    const parentElement = document.getElementById("board");
    parentElement.appendChild(ammoDisplay);
    return ammoDisplay;
}
const ammoDisplay = createAmmoDisplay();

setInterval(() => {
    function collision() {
        enemiesArr.forEach(function(enemy, index){
            if (
                player.x < enemy.x + enemy.width &&
                player.x + player.width > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y
            ) {
                lives--; 
                livesDisplay.textContent = `Lives: ${lives}`;
                if (lives === 0) {
                    
                    location.href = `./gameover.html?score=${points}`;
                }
                enemy.domElement.remove();
                enemiesArr.splice(index, 1);
            }
        })
    };
    collision();
}, 100); 





bulletInterval = setInterval(() => {
    bulletsArr.forEach((bullet, i) => {
        bullet.y += 100
        bullet.domElement.style.bottom = bullet.y + "px"
        if (bullet.y > 900) {
            bulletsArr.splice(i, 1)
        }
    });
    function bulletCollision() {
        enemiesArr.forEach((enemy, enemyIndex) => {
            bulletsArr.forEach((bullet, bulletIndex) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    enemy.domElement.remove();
                    enemiesArr.splice(enemyIndex, 1);
                    bullet.domElement.remove();
                    bulletsArr.splice(bulletIndex, 1);
                    points = points + 10
                        if (pointsDisplay){
                            pointsDisplay.textContent = `Points: ${points}`;
                        }
                        if (livesDisplay) {
                            livesDisplay.textContent = `Lives: ${lives}`;
                        }
                        if (ammoDisplay) {
                            ammoDisplay.textContent = `Ammo: ${ammo}`;
                        }
                    ammo = ammo + 20;
                    ammoDisplay.textContent = `Ammo: ${ammo}`;
            }});
        });
    }
    bulletCollision();

}, 100)

class Bullet {
    constructor(x, y) {
        this.width = 5;
        this.height = 20;
        this.x = x
        this.y = y
        this.domElement = null;
        
        this.createDomElement();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.id = "bullet";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.backgroundColor = "red"
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";
        console.log(this.domElement)
        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.domElement);
    }
}