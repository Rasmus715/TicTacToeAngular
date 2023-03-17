import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  
  squares: Array<{value: "X" | "O" | null}> = [];
  xIsNext!: boolean;
  winner: string | null = null;
  startGameLabel: string = "Start New Game";
  currentPlayerConst: string = "Current Player: ";
  playerStatus: string | null = null;
  
  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    // Array().fill() is a devil's creation. Mark my words.
    this.squares = Array(9).fill(null).map(element => ({value: element}));

    this.winner = null;
    this.xIsNext = true;
    this.startGameLabel = "Restart Game";
    this.playerStatus = this.currentPlayerConst + this.player;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(index: number)
  { 
    if (!this.squares[index].value && !this.winner)
    {
      this.squares[index].value = this.player;
      this.xIsNext = !this.xIsNext;
      this.playerStatus = this.calculateWinner();
    }
     
  }

  calculateWinner() {

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];  
    
    // Check if there is a winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a].value && 
        this.squares[a].value === this.squares[b].value &&
        this.squares[a].value === this.squares[c].value)
      {
        this.startGameLabel = "Start New Game";
        this.winner = this.squares[a].value;
        return `The winner is ${this.squares[a].value}!`;
      }
    }
    
    // Check if there are no more empty squares
    if(this.squares.filter(square => square.value).length != this.squares.length)
      return this.currentPlayerConst + this.player;
    else
    {
      this.startGameLabel = "Start New Game";
      return 'Draw!';
    }
  }
}

