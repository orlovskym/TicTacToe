const gameBoard = (() => {
    let _board = ['','','','','','','','','']
    const _squares = document.getElementsByClassName('gameSquare')

    for (i = 0; i < _squares.length; i++) {
        _squares[i].addEventListener('click', (e) => {
            if (e.target.innerText) return
            gameController.squareClicked(e.target.id.slice(6))
        })
    }


    function updateBoard(value, where) {
        _board[where] = value;
        refreshBoard();
    }

    function refreshBoard() {
        for (i = 0; i < _board.length; i++) {
            _squares[i].innerText = _board[i];
        }
    }

    function clearBoard() {
        _board = ['','','','','','','','','']
        gameBoard.refreshBoard();
    }

    function getBoard() {
        console.log(_board)
    }

    //there has to be a better way to write this
    function checkForWinner() {
        if (
            //rows
            _board[0]&&((_board[0] == _board[1]) && (_board[1] == _board[2]))
            || _board[3]&&((_board[3] == _board[4]) && (_board[4] == _board[5]))
            || _board[6]&&((_board[6] == _board[7]) && (_board[7] == _board[8]))
            //columns
            || _board[0]&&((_board[0] == _board[3]) && (_board[3] == _board[6]))
            || _board[1]&&((_board[1] == _board[4]) && (_board[4] == _board[7]))
            || _board[2]&&((_board[2] == _board[5]) && (_board[5] == _board[8]))
            //diagonals
            || _board[0]&&((_board[0] == _board[4]) && (_board[4] == _board[8]))
            || _board[2]&&((_board[2] == _board[4]) && (_board[4] == _board[6]))) {
            return true;
        } else {
            return false;
        }
    }

    return {
        updateBoard,
        refreshBoard,
        clearBoard,
        getBoard,
        checkForWinner,
    };
})();




const createPlayer = (name) => {
    console.log('created player ' + name)
    return {
        name,
        takeSquare() {
            console.log('dummy input')
        }
    }
}

const gameController = (() => {
    let _player1 = createPlayer('mark')
    let _player2 = createPlayer('mew')
    let _isPlayer1Turn = true;
    let _isGameActive = true;
    //add more

    function squareClicked(square) {
        if (!_isGameActive) return;
        if (_isPlayer1Turn) {
            gameBoard.updateBoard('X', square)
        } else gameBoard.updateBoard('O', square);

        if (gameBoard.checkForWinner()) {
            congratulateWinner();
            return;
        }
        _isPlayer1Turn = !_isPlayer1Turn;
    }

    function congratulateWinner() {
        console.log('yay')
        _isGameActive=false;
    }

    return {
        squareClicked,
    }


})();