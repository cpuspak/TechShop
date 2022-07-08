import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard-service/dashboard.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.css']
})
export class ItemTileComponent implements OnInit {

  @Input() product !:any;
  constructor(private dashboardService: DashboardService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  viewProduct(event: any){
    
    //console.log(event.target.id)
    if (event && event.target && event.target.id != ""){
      const dialogRef = this.dialog.open(ItemDetailsComponent, {
        width: '2500px',
        height: '1500px',
        data: {productId: event.target.id}
      });
    }
    
    // console.log(event)
    // if (event && event.target && event.target.id != ""){
    //   this.dashboardService.setShowTopbar(false)
    //   this.router.navigate(['productDetails/'+event.target.id])
    // }
    
  }


}
