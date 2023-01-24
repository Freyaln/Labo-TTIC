import { Component } from '@angular/core';
import {ListInterface} from "../../atoms/link-list/link-list.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menuItems: ListInterface[] = [
    {label: 'Home', link: '/homepage'},
    {label: 'Companies', link: '/companies-datas'},
    {label: 'Games', link: '/games-genre'}
  ];
}
