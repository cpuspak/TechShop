import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardControl = new Subject();
  showTopbar: boolean = true;
  constructor() { }

  setShowTopbar(showTopbar : boolean) {
    this.showTopbar = showTopbar
  }

  getShowTopbar() {
     return this.showTopbar
  }
}
