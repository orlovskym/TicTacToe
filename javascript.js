const gameBoard = (() => {
    let _board = ['', '', '', '', '', '', '', '', '']
    let _boardDOM = document.getElementById('gameBoard')
    const _squares = document.getElementsByClassName('gameSquare')

    for (i = 0; i < _squares.length; i++) {
        _squares[i].addEventListener('click', (e) => {
            if (e.target.innerText) return
            gameController.squareClicked(e.target.id.slice(6))
        })
    }

    function drawBoard(size) {
        _boardDOM.style.height = (size + 'vh')
        _boardDOM.style.width = (size + 'vh')

    }

    //write a value to _board
    function updateBoard(value, where) {
        _board[where] = value;
        refreshBoard();
    }

    //update DOM based on _board
    function refreshBoard() {
        for (i = 0; i < _board.length; i++) {
            _squares[i].innerText = _board[i];
        }
    }

    //clear _board
    function clearBoard() {
        _board = ['', '', '', '', '', '', '', '', '']
        gameBoard.refreshBoard();
    }


    function getBoard() {
        console.log(_board)
    }

    //there has to be a better way to write this
    function checkForWinner() {
        if (
            //rows
            _board[0] && ((_board[0] == _board[1]) && (_board[1] == _board[2]))
            || _board[3] && ((_board[3] == _board[4]) && (_board[4] == _board[5]))
            || _board[6] && ((_board[6] == _board[7]) && (_board[7] == _board[8]))
            //columns
            || _board[0] && ((_board[0] == _board[3]) && (_board[3] == _board[6]))
            || _board[1] && ((_board[1] == _board[4]) && (_board[4] == _board[7]))
            || _board[2] && ((_board[2] == _board[5]) && (_board[5] == _board[8]))
            //diagonals
            || _board[0] && ((_board[0] == _board[4]) && (_board[4] == _board[8]))
            || _board[2] && ((_board[2] == _board[4]) && (_board[4] == _board[6]))) {
            return true;
        } else {
            return false;
        }
    }

    return {
        drawBoard,
        updateBoard,
        refreshBoard,
        clearBoard,
        getBoard,
        checkForWinner,
    };
})();




const createPlayer = (name) => {
    console.log('created player ' + name)
    return { name, }
}


const gameController = (() => {
    const _startButton = document.getElementById('startButton')
    const _nameField1 = document.getElementById('player1')
    const _nameField2 = document.getElementById('player2')
    let _isPlayer1Turn = true;
    let _isGameActive = false;
    let _player1;
    let _player2;

    _startButton.addEventListener('click', e => {
        e.preventDefault();
        _startGame();
    })

    function _toggleNames() {
        _nameField1.disabled = !_nameField1.disabled;
        _nameField2.disabled = !_nameField2.disabled;
    }


    function _startGame() {
        if (!(_nameField1.value && _nameField2.value)) {
            alert('Both players must enter their names.')
            return;
        }
        _toggleNames();
        _player1 = createPlayer(_nameField1.value)
        _player2 = createPlayer(_nameField2.value)
        gameBoard.drawBoard(60);
        gameBoard.clearBoard();
        _isGameActive = true;
        _isPlayer1Turn = true;

    }

    function squareClicked(square) {
        if (!_isGameActive) return;
        if (_isPlayer1Turn) {
            gameBoard.updateBoard('X', square)
        } else gameBoard.updateBoard('O', square);

        if (gameBoard.checkForWinner()) {
            _congratulateWinner();
            return;
        }
        _isPlayer1Turn = !_isPlayer1Turn;
    }

    function _whoseTurn() {
        if (_isPlayer1Turn) {
            return _player1
        } else {
            return _player2
        }

    }

    function _congratulateWinner() {
        alert(_whoseTurn().name + ' wins!')
        _isGameActive = false;
        _toggleNames();
    }

    return {
        squareClicked,
    }


})();