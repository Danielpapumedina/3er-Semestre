const grid = document.querySelector(".grid-juego")
let playerIndex = 296-18;
let direccion = 1;
const ancho = 18;
let score = 0;

let coinIndex = Math.floor(Math.random() * (ancho-1));
let coinRoutine;

for(let i = 0; i < 324; i++) {
    const cuadro = document.createElement('div')
    grid.appendChild(cuadro)
}

const cuadricula = Array.from( document.
querySelectorAll('.grid-juego div'));


cuadricula[playerIndex].classList.add('player');


// function remove(){
//     for (let i =0; i < Array.lenght; i++){
//         cuadricula[aliens[i]].classList.remove("invader");
//     }
// }

function movePlayer(e){
    // console.log("tecla");
    cuadricula[playerIndex].classList.remove("player");
    console.log(e.key);
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

function drawCoin(){
   
    cuadricula[coinIndex].classList.remove("coin");

    if(coinIndex + ancho <= 324){
        coinIndex = coinIndex + ancho;
        cuadricula[coinIndex].classList.add("coin");
        
    }        
    else{
        console.log("se salio",coinIndex);
        cuadricula[coinIndex].classList.remove("coin");
        clearInterval(coinRoutine);
    }

    if(cuadricula[coinIndex].classList.contains("player")){
        score++;
        console.log(score);
        cuadricula[coinIndex].classList.remove("coin");
        clearInterval(coinRoutine);
    }
    
}

coinRoutine = setInterval(drawCoin, 100);
// drawCoin();

// function moveInvaders(){
//     const borderIzq = aliens[0] % ancho === 0
//     const borderDer = aliens[aliens.lenght - 1] % ancho ===
//     ancho-1;

//     remove();

//     if(borderDer && direccion==1){
//         for (let i = 0; i<aliens.length; i++){
//             aliens[i] += ancho +1;
//             direccion = -1;
//         }
//     }
//     if(borderIzq && direccion==-11){
//         for (let i = 0; i<aliens.length; i++){
//             aliens[i] += ancho -1;
//             direccion = 1;
//         }
//     }
//     for (let i = 0; i<aliens.length; i++){
//         aliens[i] += direccion;
//     }

//     draw();

//     if(cuadricula[playerIndex].classList.contains('invader')){
//         console.log("GAME OVER");
//         clearInterval(alienRoutine);
//     }
//     for(let i = 0; i <aliens.lenght; i++){
//         if(aliens[i]>cuadricula.length){
//             console.log("GAME OVER, they reached");
//             clearInterval(alienRoutine);
//         } 
//     }
//     if(alienmorido.lenght === aliens.length){
//         console.log("WIN");
//         clearInterval(alienRoutine);
//     }

//     }

// alienRoutine = setInterval(moveInvaders,200);

// function shoot(e){
//     let laserRoutine;
//     let laserIndex = playerIndex;

//     function moveLaser(){
//         if(laserIndex <= 0 || laserIndex - ancho <=0){
//             cuadricula[laserIndex]. classList.remove('laser');
//             clearInterval(laserRoutine)
//             return;
//         }
//         cuadricula[laserIndex].classList.remove('laser');
//         laserIndex -= ancho;
//         cuadricula[laserIndex].classList.add('laser');
        
//         if(cuadricula[laserIndex].classList.contains('invader')){
//          cuadricula[laserIndex].classList.contains('laser');
//          cuadricula[laserIndex].classList.contains('invader');
//          clearInterval(laserRoutine);

//             const alienAsesinado = aliens.indexOf(laserIndex);
//             alienmorido.push(alienAsesinado);
//         }
//     }
//     if(e.key =='ArrowUp'){
//         laserRoutine = setInterval(moveLaser, 80);
//     }



// }

// document.addEventListener('keydown', shoot);