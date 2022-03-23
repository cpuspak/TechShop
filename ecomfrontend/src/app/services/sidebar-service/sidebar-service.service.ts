import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {
  sideBarSubject: Subject<MatSidenav> = new Subject();
  constructor() { }
}
