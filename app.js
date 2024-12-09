/**
 * Проект: Волк, Овца и Капуста
 * 
 * Суть проекта:
 * Вам необходимо перевезти всех участников игры (волка, овцу и капусту) на правый берег так, чтобы соблюдались несколько условий:
 *  1. Волк НЕ может остаться вдвоем с овцой
 *  2. Овца НЕ может остаться вдвоем с капустой
 *  3. Перевозка в лодке осуществляется ПО ОДНОМУ
 * 
 * Нюансы:
 *  1. Нельзя поместить в лодку персонажа, если позиция лодки != позиции персонажа
 *  2. Нельзя высадить персонажа на берег, если позиция берега != позиции лодки
 */




const wolf = document.querySelector('.wolf');
const lamb = document.querySelector('.lamb');
const cabbage = document.querySelector('.cabbage');
const board = document.querySelector('.board');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const map = document.querySelector('.map');

const actors = ['wolf', 'lamb', 'cabbage'];
let wolfPosition = 'left';
let lambPosition = 'left';
let cabbagePosition = 'left';
let boardPosition = 'left'; 

draw();

function draw() {
    actors.forEach(actor => {
        document.querySelector('.left').appendChild(createActor(actor));
    });
}

function createActor(actor) {
    const actorItem = document.createElement('div');
    actorItem.className = actor;
    return actorItem;
}

function moveToBoard(actor) {
    if (getPosition(actor) === boardPosition && boardPosition === 'left') {
        updatePosition(actor, 'board');
        moveActorToBoard(actor);
    }
}

function moveToRight(actor) {
    if (boardPosition === 'left') {
        updatePosition(actor, 'right');
        moveActorToRight(actor);
       boardPosition = 'right';
    }
}

function updatePosition(actor, newPosition) {
    if (actor === 'wolf') {
        wolfPosition = newPosition;
    } else if (actor === 'lamb') {
        lambPosition = newPosition;
    } else if (actor === 'cabbage') {
        cabbagePosition = newPosition;
    }
}

function getPosition(actor) {
    if (actor === 'wolf') return wolfPosition;
    if (actor === 'lamb') return lambPosition;
    if (actor === 'cabbage') return cabbagePosition;
}

function moveActorToBoard(actor) {
    const actorElement = map.querySelector(`.${actor}`);
    actorElement.remove();
    document.querySelector('.board').appendChild(actorElement);
    actorElement.addEventListener('click', function() {
        moveToRight(actor);
    });
}

function moveActorToRight(actor) {
    const actorElement = board.querySelector(`.${actor}`);
    actorElement.remove();
    document.querySelector('.right').appendChild(actorElement);
    actorElement.addEventListener('click', function() {
        moveToBoard(actor);
    });
}

function checkWin() {
    if (wolfPosition === 'right' && lambPosition === 'right' && cabbagePosition === 'right') {
        alert('Вы выиграли! Все успешно перевезены на правый берег!');
    }
}


function isValidState() {
    if ((wolfPosition === lambPosition && wolfPosition !== boardPosition) || 
        (lambPosition === cabbagePosition && lambPosition !== boardPosition)) {
        alert(' Волк не может оставаться наедине с овцой и овца не может оставаться наедине с капустой.');
        resetPositions();
    }
}


actors.forEach(actor => {
    const actorElement = document.querySelector(`.${actor}`);
    actorElement.addEventListener('click', function() {
        if (getPosition(actor) === 'left') {
            moveToBoard(actor);
        } else if (getPosition(actor) === 'board') {
            moveToRight(actor);
        }
        isValidState();
        checkWin();
    });
});
