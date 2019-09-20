let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let arrayCanvas = [
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 2, 0, 1, 1, 1, 1], 
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 2, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 2, 0],
    [-1, 1, 1, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0], 
    [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2, 0, 1, 1],
    [0, 1, 1, 2, 1, 1, 1, 0, 1, 0, 0, 1, 2, 1, 3],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]
];

let arrayCanvas2 = [
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 2, 0, 1, 1, 1, 1], 
    [3, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 2, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 2, 0],
    [0, 1, 1, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0], 
    [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2, 0, 1, 1],
    [0, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0]
];

let size = 40;

let j = 0; //y
let i = 0; //x

let player = -1;
let goal = 3;
let flames = 2;

//Tomt array til test af flammer
let indx=[];
let msg;

//Score
let scoreText = document.querySelector('#score');
let score = 26;
let point = 1;
let firePoint = 15;

//Tile images variabler
let dragon=new Image();
dragon.src='illustrationer/dragon.png';

// let dragonLeft=new Image();
// dragonLeft.src='illustrationer/dragon_left.png';

let tree=new Image();
tree.src='illustrationer/tree.png';

let grass=new Image();
grass.src='illustrationer/grass.png';

let sheep=new Image();
sheep.src='illustrationer/sheep.png';

let fire=new Image();
fire.src='illustrationer/fire.png';

let treefire=new Image();
treefire.src='illustrationer/treefire.png';

//Audio variabler
let goalSound= new Audio('lyde/sheep.mp3');
let bite= new Audio('lyde/dragonBite.mp3');
let hungry = new Audio('lyde/stomachGrowling.mp3');
let fireSound = new Audio('lyde/fire.mp3');


function createMaze() {
    for(j = 0; j<arrayCanvas.length; j++){
        for(i = 0; i<arrayCanvas[j].length; i++){
            if(arrayCanvas[j][i] == 1){
                ctx.drawImage(tree, i*size, j*size, size, size);
                //Istedet for nedstående måde at farve på, så har jeg brugt drawImage funktion
                // ctx.fillStyle = "red";
                // ctx.fillRect(i*size, j*size, size, size);
            }else if (arrayCanvas[j][i] == -1){
                player = { j, i };
                ctx.drawImage(dragon, i*size, j*size, size, size);
            }else if (arrayCanvas[j][i] == goal){
                ctx.drawImage(sheep, i*size, j*size, size, size);
            } else if (arrayCanvas[j][i] == 0){
                ctx.drawImage(grass, i*size, j*size, size, size);
            } else if (arrayCanvas[j][i] == 2){
                ctx.drawImage(fire, i*size, j*size, size, size);
            }
        }
    }
}

window.addEventListener("keydown", function(event){
    playSound()
    //swoosh.play();
    defaultScore();
    switch (event.keyCode) {
        case 38: //Key up
            if (arrayCanvas[player.j - 1][player.i] == 0) {
                arrayCanvas[player.j - 1][player.i] = -1;
                arrayCanvas[player.j][player.i] = 0; 

            } else if (arrayCanvas[player.j - 1][player.i] == 1){
                forestFire();
            } else if (arrayCanvas[player.j - 1][player.i] == 2) {
                bite.play();
                arrayCanvas[player.j - 1][player.i] = -1; 
                arrayCanvas[player.j][player.i] = 0; 
                flameScore();
            } else if (arrayCanvas[player.j - 1][player.i] == 3) {
                checkFlames();
                arrayCanvas[player.j - 1][player.i] = -1; 
                arrayCanvas[player.j][player.i] = 0;
            }
                createMaze();
        break;
        case 37: //key left
        if (arrayCanvas[player.j][player.i - 1] == 0) {

            arrayCanvas[player.j][player.i - 1] = -1;
            arrayCanvas[player.j][player.i] = 0;
        } else if (arrayCanvas[player.j][player.i - 1] == 1) {
            forestFire();
        } else if (arrayCanvas[player.j][player.i - 1] == 2) {
            bite.play();
            arrayCanvas[player.j][player.i - 1] = -1;
            arrayCanvas[player.j][player.i] = 0; 
            flameScore();
        } else if (arrayCanvas[player.j][player.i - 1] == 3) {
            checkFlames();

            arrayCanvas[player.j][player.i - 1] = -1; 
            arrayCanvas[player.j][player.i] = 0;
        }
            createMaze();
        break;
        case 39: //key right
        if (arrayCanvas[player.j][player.i + 1] == 0) {
            arrayCanvas[player.j][player.i + 1] = -1;
            arrayCanvas[player.j][player.i] = 0;

        } else if (arrayCanvas[player.j][player.i + 1] == 1) {
            forestFire();
        } else if (arrayCanvas[player.j][player.i + 1] == 2) {
            bite.play();
            arrayCanvas[player.j][player.i + 1] = -1; 
            arrayCanvas[player.j][player.i] = 0; 
            flameScore();
        } else if (arrayCanvas[player.j][player.i + 1] == 3) {
            checkFlames();

            arrayCanvas[player.j][player.i + 1] = -1;
            arrayCanvas[player.j][player.i] = 0; 
        }
            createMaze();
        break;
        case 40: //key down
        if (arrayCanvas[player.j + 1][player.i] == 0) {
            arrayCanvas[player.j + 1][player.i] = -1; 
            arrayCanvas[player.j][player.i] = 0;

        } else if (arrayCanvas[player.j + 1][player.i] == 1) {
            forestFire();
        } else if (arrayCanvas[player.j + 1][player.i] == 2) {
            bite.play();
            arrayCanvas[player.j + 1][player.i] = -1;
            arrayCanvas[player.j][player.i] = 0;
            flameScore();
        } else if (arrayCanvas[player.j + 1][player.i] == 3) {
            checkFlames();
            arrayCanvas[player.j + 1][player.i] = -1; 
            arrayCanvas[player.j][player.i] = 0; 
        }
            createMaze();
        break;
        default:
            console.log(event.keyCode);
    }
})

//Funktion der tjekker om der findes et 2 tal (flamme) i arrayet
//Hvis der er, så taber man
function checkFlames(){
    for(j = 0; j<arrayCanvas.length; j++){
        for(i = 0; i<arrayCanvas[j].length; i++){
            if (arrayCanvas[j][i] === flames){
            indx = [j,i]; break;
            }
        }
    }
    if(typeof indx[0] == "undefined" || typeof indx[1] == "undefined"){
        goalSound.play();
        score += point;
        msg = "Din drage er mæt! Din score er: " + score;
        alert(msg);
        location.reload(); 
    } else {
        hungry.play();
        msg="Du skal bruge mere ild, for at spise fåret!";
        endGame();
    }
}

//Denne function virker ikke
function forestFire() {
    fireSound.play();
    tree.src = treefire.src;
    createMaze();
    
    msg = "Du startede en skovbrænd!"
    setTimeout(endGame, 200);
}

//funktion der siger -1 hver gang man trykker på en keyboard tast
function defaultScore(){
    score -= point;
    scoreText.innerHTML = score;
    if (score <= 0) {
        msg = "Du har ikke flere træk tilbage"
        endGame();
    }
}

//funktion der siger +15 når man går ind i en flamme
function flameScore() {
    score += firePoint;
    scoreText.innerHTML = score;
}

function playSound(){
    let soundPlace = document.querySelector('#swoosh');
    soundPlace.setAttribute("src", "lyde/swoosh.mp3");
    soundPlace.play();
}

function endGame() {
    alert(msg);
    location.reload();
}





window.addEventListener("load", createMaze);
window.addEventListener("load", defaultScore);
