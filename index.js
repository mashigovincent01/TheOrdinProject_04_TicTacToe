document.addEventListener("DOMContentLoaded", ()=>{

    const Cell = (()=>{
        let value = "";
        const getToken = ()=> value;
        const addToken = (player)=> value = player;
        return{
            getToken,
            addToken
        }
    });
    const GameBoard = (()=>{
        const board = [];
        const size = 3;

        //create a 2d board
        for(let i = 0; i < size; i++){
            board[i] = [];
            for(let j = 0; j < size; j++){
                board[i].push(Cell());
            }

        }
       

        const getBoard = ()=> board;
        const printBoard = ()=> {
            const log = console.log;
            let res = "";
            for(let i = 0; i < size; i++){
                
                board[i].forEach((cell)=>{
                    res += cell.getToken() + " ";
                });
                res += "\n";
            }
            log(res);
        }
        const placeToken = (row, col, player)=>{
            if(row >= 0 && row < size && col >= 0 && col < size){
                
                if(board[row][col].getToken() === ""){
                    
                    board[row][col].addToken(player);
                }
            }
            else{
                return;
            }
        };
        return {
            getBoard,
            printBoard,
            placeToken
        }
        
    });

    const GameController = (
        playerOneName = "Player One",
        playerTwoName = "Player Two"
    )=>{
        
        
        const board = GameBoard();
        let winner = "";
        
        const players = [
            {
                name: playerOneName,
                token: "O"
            },
            {
                name: playerTwoName,
                token: "X"
            }

        ];
        
        let activePlayer = players[0];

        const switchPlayerTurn = ()=>{
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        }
            const getActivePlayer = ()=> activePlayer;

            const printNewRound = () =>{
                board.printBoard();
                console.log(`${getActivePlayer().name} 's turn.`)
            }
            const win = ()=>{
                const token = activePlayer.token;
                console.log("Active player = " + token)
                for (let i = 0; i < 3; i++) {
                    //console.log(board.getBoard()[i][])
                    if (board.getBoard()[i][0].getToken() === token && board.getBoard()[i][1].getToken() === token && board.getBoard()[i][2].getToken() === token) {
                        return true;
                    }
                }
            
                // Check columns
                for (let i = 0; i < 3; i++) {
                    if (board.getBoard()[0][i].getToken() === token && board.getBoard()[1][i].getToken() === token && board.getBoard()[2][i].getToken() === token) {
                        return true;
                    }
                }
            
                // Check diagonals
                if (board.getBoard()[0][0].getToken() === token && board.getBoard()[1][1].getToken() === token && board.getBoard()[2][2].getToken() === token) {
                    return true;
                }
                if (board.getBoard()[0][2].getToken() === token && board.getBoard()[1][1].getToken() === token && board.getBoard()[2][0].getToken() === token) {
                    return true;
                }
                return false;
            }

            const gameOver = ()=>{
                const myBoard = board.getBoard();
                //=console.log(myBoard);
                for(let i = 0; i < 3; i++){
                    for(let j = 0; j < 3; j++){
                        if(myBoard[i][j].getToken() === ""){
                            
                            
                            console.log("Game over"); 
                            return false;  
                        }
                    }
                }
                return true;
            }

            const playRound = (row, col) =>{
                if(!gameOver()){
                    console.log(
                        `Placing ${getActivePlayer().name}'s token at cell ${row}, ${col}`
                    );
                    board.placeToken(row, col, getActivePlayer().token);
                    /*
                    if()
                     */
                    console.log(win());
                    if(win()){
                        winner = getActivePlayer().name + " (" + getActivePlayer().token + ")";
                        return;
                    }
                    if(gameOver()){
                        return;
                    }
                    switchPlayerTurn();
                    printNewRound();
                }
            };
            const getWinner = ()=> winner;
            printNewRound();

            return {
                gameOver,
                getWinner,
                playRound,
                getActivePlayer,
                getBoard: board.getBoard
            };
        }
    
    function ScreenController(){
        let winner = "";
        let gameOver2 = false;
        const result = document.querySelector("#result");
        const divs = document.querySelectorAll("#board div");
        const playerTurn = document.querySelector("#turn");
        const game = GameController();
        const map = [[0,0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
        const updateScreen = ()=>{
            //clear the board
            
            divs.forEach((div)=>{
                div.textContent = "";
            });
            
            for(let i = 0; i < divs.length; i++){
                let [row, col] = map[i];
                divs[i].textContent = game.getBoard()[row][col].getToken();
            }

            const board = game.getBoard();
            const activePlayer = game.getActivePlayer();
            playerTurn.textContent = `${activePlayer.token}'s turn...`;
        }
        function clickHandlerBoard(e){
            const id = parseInt(e.target.id);
            let row = -1, col = -1;
            
            [row, col] = map[id-1];
            if(game.gameOver()){
                
                gameOver2 = game.gameOver();
                result.textContent = "DRAW!";
                return
            }
            else if(game.getWinner() !== ""){
                winner = game.getWinner();
                result.textContent = game.getWinner() + " wins";
                
            }
            else{
                
                game.playRound(row, col);
                
                updateScreen();
                if(game.gameOver()){
                    gameOver2 = gameOver();
                    result.textContent = "DRAW!";
                }
                else if(game.getWinner() !== ""){
                    winner = game.getWinner();
                    result.textContent = game.getWinner() + " wins";
                }

            }
        }
        divs.forEach((div)=>{
            div.addEventListener("click", clickHandlerBoard);
        });
        
        divs.forEach((div)=>{
            div.addEventListener("click", (e)=>{
                
                
            });
        });
        // console.log("Here Here")
        if(gameOver2){
            if(winner !== ""){
                console.log("Draw");
            }
            else{
                console.log(winner + "Wins");
            }
            return
            
        }
        

        updateScreen();

    }
    
   // ScreenController();
    const Game = (()=>{

        const start = document.querySelector("#start");
        const reset = document.querySelector("#reset");

        start.addEventListener("click", handleStartClick);
        reset.addEventListener("click", handleResetClick);
        function handleStartClick(){
           ScreenController(); 
        }

        function handleResetClick(){
            window.location.reload();
        }
    });
    Game();
    
});




