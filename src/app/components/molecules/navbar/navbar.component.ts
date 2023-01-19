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
    {label: 'By country', link: '/by-country'},
    {label: 'Comparisons charts', link: '/comparisons'},
    {label: 'Live by country', link: '/live-cases'},
    {label: 'Live by country', link: '/general-infos'}
  ];
}
