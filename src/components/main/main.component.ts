import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'Home', routerLink: '/', icon: 'pi pi-fw pi-home' },
      { label: 'Quản lý cư dân', routerLink: 'CuDan', icon: 'pi pi-fw pi-users' },
      { label: 'Quản lý căn hộ', routerLink: 'CanHo', icon: 'pi pi-fw pi-building' },
      // { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      // { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    ];

    // this.activeItem = this.items[0];
  }
}
