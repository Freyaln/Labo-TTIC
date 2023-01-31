import {Component, Input} from '@angular/core';
import {IButtonPlatform} from "../../../interfaces/interfaces";

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.scss']
})
export class ButtonListComponent {

  @Input() buttonList: IButtonPlatform[] = [];
  @Input() customClass: string = '';
  // @ts-ignore
  @Input() onClickEvent: (platform: string) => void;

}
