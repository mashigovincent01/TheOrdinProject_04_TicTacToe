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

            const playRound = (row, col) =>{
                console.log(
                    `Placing ${getActivePlayer().name}'s token at cell ${row}, ${col}`
                );
                board.placeToken(row, col, getActivePlayer().token);

                switchPlayerTurn();
                printNewRound();
            };
            
            printNewRound();

            return {
                playRound,
                getActivePlayer,
                getBoard: board.getBoard
            };
        }
    
    function ScreenController(){
        const divs = document.querySelectorAll("#board div");
        const playerTurn = document.querySelector("#turn");
        const game = GameController();
        const map = [[0,0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
        const updateScreen = ()=>{
            //clear the board
            divs.forEach((div)=>{
                div.innerHTML = "";
            });
            
            for(let i = 0; i < divs.length; i++){
                let [row, col] = map[i];
                divs[i].innerHTML = game.getBoard()[row][col].getToken();
            }

            const board = game.getBoard();
            const activePlayer = game.getActivePlayer();
            playerTurn.textContent = `${activePlayer.token}'s turn...`;
        }
        function clickHandlerBoard(e){
            const id = parseInt(e.target.id);
            let row = -1, col = -1;
            
            [row, col] = map[id-1];
            game.playRound(row, col);
            updateScreen();
        }
        divs.forEach((div)=>{
            div.addEventListener("click", clickHandlerBoard);
        });
        
        divs.forEach((div)=>{
            div.addEventListener("click", (e)=>{
                
                
            });
        });

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




