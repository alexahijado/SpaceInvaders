class Player {
    constructor(){
        this.width = 5;
        this.height = 5;
        this.x = 50 - (this.width / 2);
        this.y = 0;
        this.domElement = null;

        this.createDomElement();
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
        this.x -= 2;
        this.domElement.style.left = this.x + "vw";
    }
    moveRight(){
        this.x += 2;
        this.domElement.style.left = this.x + "vw";
    }

    moveUp(){
        this.y -= 2;
        this.domElement.style.up = this.y + "vh";
    }

    moveDown(){
        this.y -= 2;
        this.domElement.style.bottom = this.y + "vh";
    }
}

class Enemy {
    constructor(){
        this.width = 5;
        this.height = 5;
        this.x = Math.floor(Math.random() * (100 - this.width + 1));
        this.y = 100;
        this.domElement = null;

        this.createDomElement();
    }

    moveDown(){
        this.y -= 0.5;
        this.domElement.style.bottom = this.y + "vh";
    }
}

class Game {
    constructor(){
        this.player = new Player;
        this.enemiesArr = []
    }

    
}