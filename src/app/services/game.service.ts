import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {GameTable} from "../models/game-table.model";
import {Move} from "../models/move.model";
import {AllTimeWinner} from "../models/all-time-winner.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private client: HttpClient) { }

  public getGameTable(): Observable<GameTable> {
    return this.client.get<GameTable>(environment.backend + '/api/game/get-table');
  }

  public makeMove(player: string, field: number): Observable<GameTable> {
    const move = new Move(player, field);
    return this.client.post<GameTable>(environment.backend + '/api/game/move', move);
  }

  public getAllTimeWinners(): Observable<AllTimeWinner> {
    return this.client.get<AllTimeWinner>(environment.backend + '/api/game/all-time-winners');
  }
}
