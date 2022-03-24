import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.css']
})
export class ItemTileComponent implements OnInit {

  @Input() product !:any;
  constructor() { }

  ngOnInit(): void {
  }

}
