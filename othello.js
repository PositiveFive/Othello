let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext('2d');


context.fillStyle = 'green';
context.fillRect(0, 0, 512, 512);
for(let i = 1; i < 9; i++) {
    context.moveTo(i*64, 0);
    context.lineTo(i*64, 512);
    context.stroke();
    context.moveTo(0, i*64);
    context.lineTo(512, i*64);
    context.stroke();
}


const model = {
  board : [[' ',' ',' ',' ',' ',' ',' ',' '], [' ',' ',' ',' ',' ',' ',' ',' '], [' ',' ',' ',' ',' ',' ',' ',' '], [' ',' ',' ','W','B',' ',' ',' '], [' ',' ',' ','B','W',' ',' ',' '], [' ',' ',' ',' ',' ',' ',' ',' '], [' ',' ',' ',' ',' ',' ',' ',' '], [' ',' ',' ',' ',' ',' ',' ',' ']],
  next: 'B',
  count: 0,
  numW: 0,
  numB: 0  
}

function nextTurn() {
    switch(model.next) {
    case 'B':
        model.next = 'W';
        return;
    case 'W':
        model.next = 'B';
        return;
    }
}

function updateDisplay() {
    console.log("display updated");
    model.count = 0;
    model.numB = 0
    model.numW = 0
    for(let i = 1; i < 9; i++) {
        for(let j = 1; j < 9; j++) {
            switch(model.board[i-1][j-1]) {
            case 'B':
                model.numB++
                context.fillStyle = 'black'
                context.beginPath();
                context.arc(i*64-32, j*64-32, 25, 0, 2 * Math.PI);
                context.fill();
                break;
            case 'W':
                model.numW++
                context.fillStyle = 'white'
                context.beginPath();
                context.arc(i*64-32, j*64-32, 25, 0, 2 * Math.PI);
                context.fill();
                break;
            default:
                if(isValidMove(model.next, i-1, j-1)) {
                    model.count++
                    context.fillStyle = 'DarkCyan';
                    context.beginPath();
                    context.arc(i*64-32, j*64-32, 25, 0, 2 * Math.PI);
                    context.fill();
                }
                else {
                    context.fillStyle = 'green';
                    context.beginPath();
                    context.arc(i*64-32, j*64-32, 26, 0, 2 * Math.PI);
                    context.fill();
                }

                break;
            }
        }
    }
}
updateDisplay();

function checkN(player, x, y, first) {
    if(x < 0 || x > 7 || y < 0 || y > 8) {
        return false;
    }
    if(model.board[x][y] == ' ') {
        return false;
    }
    else if(model.board[x][y] == player && first) {
        return false;
    }
    else if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        return checkN(player, x, y - 1, false);
    }
}

function checkS(player, x, y, first) {
    if(x < 0 || x > 7 || y < 0 || y > 8) {
        return false;
    }
    if(model.board[x][y] == ' ') {
        return false;
    }
    else if(model.board[x][y] == player && first) {
        return false;
    }
    else if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        return checkS(player, x, y + 1, false);
    }
}

function checkW(player, x, y, first) {
    if(x < 0 || x > 7 || y < 0 || y > 8) {
        return false;
    }
    if(model.board[x][y] == ' ') {
        return false;
    }
    else if(model.board[x][y] == player && first) {
        return false;
    }
    else if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        return checkW(player, x - 1, y, false);
    }
}

function checkE(player, x, y, first) {
    if(x < 0 || x > 7 || y < 0 || y > 8) {
        return false;
    }
    if(model.board[x][y] == ' ') {
        return false;
    }
    else if(model.board[x][y] == player && first) {
        return false;
    }
    else if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        return checkE(player, x + 1, y, false);
    }
}

function checkSE(player, x, y, first) {
    if(x < 0 || x > 7 || y < 0 || y > 8) {
        return false;
    }
    if(model.board[x][y] == ' ') {
        return false;
    }
    else if(model.board[x][y] == player && first) {
        return false;
    }
    else if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        return checkSE(player, x + 1, y + 1, false);
    }
}

function checkNE(player, x, y, first) {
    if(x < 0 || x > 7 || y < 0 || y > 8) {
        return false;
    }
    if(model.board[x][y] == ' ') {
        return false;
    }
    else if(model.board[x][y] == player && first) {
        return false;
    }
    else if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        return checkNE(player, x + 1, y - 1, false);
    }
}

function checkSW(player, x, y, first) {
    if(x < 0 || x > 7 || y < 0 || y > 8) {
        return false;
    }
    if(model.board[x][y] == ' ') {
        return false;
    }
    else if(model.board[x][y] == player && first) {
        return false;
    }
    else if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        return checkSW(player, x - 1, y + 1, false);
    }
}

function checkNW(player, x, y, first) {
    if(x < 0 || x > 7 || y < 0 || y > 8) {
        return false;
    }
    if(model.board[x][y] == ' ') {
        return false;
    }
    else if(model.board[x][y] == player && first) {
        return false;
    }
    else if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        return checkNW(player, x - 1, y - 1, false);
    }
}

function addS(player, x, y) {
    if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        model.board[x][y] = player;
        return addS(player, x, y + 1);
    }
}

function addN(player, x, y) {
    if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        model.board[x][y] = player;
        return addN(player, x, y - 1);
    }
}

function addW(player, x, y) {
    if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        model.board[x][y] = player;
        return addW(player, x - 1, y);
    }
}

function addE(player, x, y) {
    if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        model.board[x][y] = player;
        return addE(player, x + 1, y);
    }
}

function addSE(player, x, y) {
    if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        model.board[x][y] = player;
        return addSE(player, x + 1, y + 1);
    }
}

function addSW(player, x, y) {
    if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        model.board[x][y] = player;
        return addSW(player, x - 1, y + 1);
    }
}

function addNW(player, x, y) {
    if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        model.board[x][y] = player;
        return addNW(player, x - 1, y - 1);
    }
}

function addNE(player, x, y) {
    if(model.board[x][y] == player) {
        return true;
    }
    else if(model.board[x][y] != player) {
        model.board[x][y] = player;
        return addNE(player, x + 1, y - 1);
    }
}

function isValidMove(player, x, y) {
    if(model.board[x][y] == ' ') {
        return checkN(player, x, y - 1, true) || checkE(player, x+1, y, true) || checkS(player, x, y+1, true) || checkW(player, x-1, y, true) || checkNE(player, x + 1, y - 1, true) || checkSE(player, x + 1, y + 1, true) || checkNW(player, x - 1, y - 1, true) || checkSW(player, x - 1, y + 1, true);
    }
    else return false;
}

function addPiece(player, x, y) {
    model.board[x][y] = player;
    if(checkS(player, x, y + 1, true)) {
        addS(player, x, y + 1);
        console.log("adding S");
    }
    if(checkN(player, x, y - 1, true)) {
        addN(player, x, y - 1);
        console.log("adding N");
    }
    if(checkW(player, x - 1, y, true)) {
        addW(player, x - 1, y);
        console.log("adding W");
    }
    if(checkE(player, x + 1, y, true)) {
        addE(player, x + 1, y);
        console.log("adding E");
    }
    if(checkNE(player, x + 1, y - 1, true)) {
        addNE(player, x + 1, y - 1);
        console.log("adding NE");
    }
    if(checkSE(player, x + 1, y + 1, true)) {
        addSE(player, x + 1, y + 1);
        console.log("adding SE");
    }
    if(checkNW(player, x - 1, y - 1, true)) {
        addNW(player, x - 1, y - 1);
        console.log("adding NW");
    }
    if(checkSW(player, x - 1, y + 1, true)) {
        addSW(player, x - 1, y + 1);
        console.log("adding SW");
    }
}

canvas.onclick =  function(e){
    let x = 0;
    let y = 0;
    x = Math.floor(e.clientX/64);
    y = Math.floor(e.clientY/64);
    console.log(x, y)
    if(isValidMove(model.next, x, y)) {
        addPiece(model.next, x, y);
        nextTurn();
        updateDisplay();
        if(model.count == 0)
        {
            context.font = "40pt Calibri"
            context.fillStyle = "White";
            if(model.numB > model.numW) {
                console.log("Black Wins!")
                context.fillText("Black Wins!", 256, 256)
            }
            else if(model.numW> model.numB) {
                console.log("White Wins!")
                context.fillText("White Wins!", 256, 256)
            }
            else {
                context.fillText("Tie")
            }
        }
    }
}