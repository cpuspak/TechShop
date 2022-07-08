import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CartComponent>) { }

  ngOnInit(): void {
  }

  closeOverlay(){
    this.dialogRef.close()
  }

}
