const bulletsArr = []
class Player {
    constructor(){
        this.width = 5;
        this.height = 10;
        this.x = 50 - (this.width / 2);
        this.y = 0;
        this.domElement = null;


        this.createDomElement();
        this.addEventListeners();
    }
    
    createDomElement(){
        this.domElement = document.createElement("div");

        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";

        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.domElement);
    }
    
    moveLeft(){
        this.x -= 5;
        this.domElement.style.left = this.x + "vw";
    }
    moveRight(){
        this.x += 5;
        this.domElement.style.left = this.x + "vw";
    }

    moveUp(){
        this.y += 5;
        this.domElement.style.bottom = this.y + "vh";
    }

    moveDown(){
        this.y -= 5;
        this.domElement.style.bottom = this.y + "vh";
    }

    shooting(){
        bulletsArr.push(new Bullet(this.x, this.y))
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
        this.width = 5;
        this.height = 5;
        this.x = Math.floor(Math.random() * (100 - this.width + 1));
        this.y = 100;
        this.domElement = null;
        this.createDomElement();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.id = "enemy";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";

        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.domElement);
    }

    moveDown() {
        this.y -= 0.5;
        this.domElement.style.bottom = this.y + "vh";
    }
}

let enemiesArr = []
function createEnemies (){
    setInterval(() => {
        const newEnemy = new Enemy();
        enemiesArr.push(newEnemy);
    }, 2000);

    setInterval(() => {
        enemiesArr.forEach((element, index) => {
            element.moveDown();
            if (element.y < 0 - element.height) {
                enemiesArr.splice(index, 1);
                element.domElement.remove();
            }
        });
    }, 100);
    bulletCollision = setInterval(() => {
        enemiesArr.forEach((enemy) => {
            bulletsArr.forEach((bullet) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    enemy.domElement.remove();
                }
            });
        });
    }, 100);
}

createEnemies();

function collision() {
    setInterval(() => {
        enemiesArr.forEach(function(enemy){
            if (
                player.x < enemy.x + enemy.width &&
                player.x + player.width > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y
            ) {
                location.href = "./gameover.html";
            }
        }, 1);
        })  
};

collision();


bulletInterval = setInterval(() => {
    bulletsArr.forEach((bullet, i) => {
        bullet.y += 5
        bullet.domElement.style.bottom = bullet.y + "vh"
        if (bullet.y > 100) {
            bulletsArr.splice(i, 1)
        }
    })
}, 100)

class Bullet {
    constructor(x, y) {
        this.width = 1;
        this.height = 1;
        this.x = x
        this.y = y
        this.domElement = null;
        
        this.createDomElement();
        
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.id = "bullet";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.backgroundColor = "red"
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";
        console.log(this.domElement)
        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.domElement);
    }



}