import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'square-component',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() value: 'X' | 'O' | undefined;
  constructor() {
  }

  ngOnInit(): void {

  }

}
