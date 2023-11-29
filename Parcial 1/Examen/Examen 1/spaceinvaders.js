const grid = document.querySelector(".grid-juego")
let playerIndex = 296-18;
let direccion = 1;
const ancho = 18;
let alienRoutine;
let alienmorido = [];

for(let i = 0; i < 324; i++) {
    const cuadro = document.createElement('div')
    grid.appendChild(cuadro)
}

const cuadricula = Array.from( document.
querySelectorAll('.grid-juego div'));

const aliens = [
0 , 1, 2, 3, 4, 5,6,7 ,8 ,9 ,
18,19,20,21,22,23,24,25,26,27,
36,37,38,39,40,41,42,43,44,45 
]
    
cuadricula[playerIndex].classList.add('player');

function draw(){
    for (let i = 0; i < aliens.length; i++){
        if(!alienmorido.includes(i)){
            cuadricula[aliens[i]].classList.add("invader");
        }
    }
}

draw();

function remove(){
    for (let i =0; i < Array.lenght; i++){
        cuadricula[aliens[i]].classList.remove("invader");
    }
}

function movePlayer(e){
    cuadricula[playerIndex].classList.remove("player");
    switch(e.key){
      case 'ArrowLeft':
        if(playerIndex % ancho !== 0) playerIndex-=1;
          break;
        case 'ArrowRight':
          if(playerIndex % ancho < ancho-1) playerIndex+=1;
          break;
    }
    cuadricula[playerIndex].classList.add('player');
}
document.addEventListener('keydown', movePlayer);

function moveInvaders(){
    const borderIzq = aliens[0] % ancho === 0
    const borderDer = aliens[aliens.lenght - 1] % ancho ===
    ancho-1;

    remove();

    if(borderDer && direccion==1){
        for (let i = 0; i<aliens.length; i++){
            aliens[i] += ancho +1;
            direccion = -1;
        }
    }
    if(borderIzq && direccion==-11){
        for (let i = 0; i<aliens.length; i++){
            aliens[i] += ancho -1;
            direccion = 1;
        }
    }
    for (let i = 0; i<aliens.length; i++){
        aliens[i] += direccion;
    }

    draw();

    if(cuadricula[playerIndex].classList.contains('invader')){
        console.log("GAME OVER");
        clearInterval(alienRoutine);
    }
    for(let i = 0; i <aliens.lenght; i++){
        if(aliens[i]>cuadricula.length){
            console.log("GAME OVER, they reached");
            clearInterval(alienRoutine);
        } 
    }
    if(alienmorido.lenght === aliens.length){
        console.log("WIN");
        clearInterval(alienRoutine);
    }

    }

alienRoutine=setInterval(moveInvaders,200);

function shoot(e){
    let laserRoutine;
    let laserIndex = playerIndex;

    function moveLaser(){
        if(laserIndex <= 0 || laserIndex - ancho <=0){
            cuadricula[laserIndex]. classList.remove('laser');
            clearInterval(laserRoutine)
            return;
        }
        cuadricula[laserIndex].classList.remove('laser');
        laserIndex -= ancho;
        cuadricula[laserIndex].classList.add('laser');
        
        if(cuadricula[laserIndex].classList.contains('invader')){
         cuadricula[laserIndex].classList.contains('laser');
         cuadricula[laserIndex].classList.contains('invader');
         clearInterval(laserRoutine);

            const alienAsesinado = aliens.indexOf(laserIndex);
            alienmorido.push(alienAsesinado);
        }
    }
    if(e.key =='ArrowUp'){
        laserRoutine = setInterval(moveLaser, 80);
    }



}

document.addEventListener('keydown', shoot);