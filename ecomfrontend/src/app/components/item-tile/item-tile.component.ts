import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard-service/dashboard.service';

@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.css']
})
export class ItemTileComponent implements OnInit {

  @Input() product !:any;
  constructor(private dashboardService: DashboardService,
    private router: Router) { }

  ngOnInit(): void {
  }
  viewProduct(event: any){
    console.log(event)
    if (event && event.target && event.target.id != ""){
      this.dashboardService.setShowTopbar(false)
      this.router.navigate(['productDetails/'+event.target.id])
    }
  }


}
