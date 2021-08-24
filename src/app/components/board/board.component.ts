import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: any[] | undefined;
  xIsNext: boolean | undefined;
  winner: string | null | undefined;
  xWins : number | undefined;
  oWins : number | undefined;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGameTable().subscribe(gameTable => {
      this.squares = gameTable.fields;
    })
    this.gameService.getAllTimeWinners().subscribe(response => {
      this.xWins = response.xWinnersCounter;
      this.oWins = response.oWinnersCounter;
    });
    //this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    this.gameService.makeMove(this.player, idx).subscribe(result =>{
      this.squares = result.fields;
      this.xIsNext = !this.xIsNext;
    },error => {
      // I don't know why, but error.error works
      alert(error.error.message);
    });
  }

}
