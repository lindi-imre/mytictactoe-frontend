import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {resolveFileWithPostfixes} from "@angular/compiler-cli/ngcc/src/utils";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: any[] | undefined;
  xIsNext: boolean | undefined;
  xWins : number | undefined;
  oWins : number | undefined;
  actualGameStatus: string | undefined;
  winner: string | undefined;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGameTable().subscribe(gameTable => {
      this.squares = gameTable.fields;
    })
    this.fetchAllTimeWinners();
    this.actualGameStatus = 'PLAYING';
  }

  newGame() {
    this.gameService.startNewGame().subscribe(response => {
      this.squares = response.fields;
    });
    this.xIsNext = true;
    this.actualGameStatus = 'PLAYING';
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if(this.actualGameStatus != 'PLAYING') {
      alert("Game finished, let's start a new one!");
      return;
    }
    this.gameService.makeMove(this.player, idx).subscribe(result =>{
      this.squares = result.fields;
      this.xIsNext = !this.xIsNext;
      this.actualGameStatus = result.gameStatus;
      if(result.gameStatus === 'FINISH') {
        this.fetchAllTimeWinners();
        this.gameService.getActualWinner().subscribe(response => {
          this.showWinner(response);
        })
      }
      else if (result.gameStatus === 'DUE') {
        this.showDueMessage();
      }
    },error => {
      // I don't know why, but error.error works
      alert(error.error.message);
    });
  }

  showWinner(winner: string) {
    this.winner = winner;

    alert("And the winner is: " + winner);
  }

  showDueMessage() {
    alert("Due! Let's start a new game!");
  }

  fetchAllTimeWinners() {
    this.gameService.getAllTimeWinners().subscribe(response => {
      this.xWins = response.xWinnersCounter;
      this.oWins = response.oWinnersCounter;
    });
  }



}
