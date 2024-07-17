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
                console.log(board[i])
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
        
    })();

    function GameController(
        playerOneName = "Player One",
        playerTwoName = "Player Two"
    ){
        

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
            const getActivePlayer = ()=> activePlayer;

            const printNewRound = () =>{
                board.printBoard();
                console.log(`${getActivePlayer().name} 's turn.`)
            }

            const playRound = (column) =>{
                console.log(
                    ``
                )
            }
        }
    }


    GameBoard.placeToken(0, 0, "X");
    GameBoard.placeToken(0, 1, "O");
    GameBoard.placeToken(0, 2, "X");
    GameBoard.placeToken(1, 0, "X");
    GameBoard.placeToken(1, 1, "X");
    GameBoard.placeToken(1, 2, "O");
    GameBoard.placeToken(2, 0, "X");
    GameBoard.placeToken(2, 1, "O");
    GameBoard.placeToken(2, 2, "X");
    GameBoard.placeToken(3,3, "O");
    GameBoard.printBoard();
});
