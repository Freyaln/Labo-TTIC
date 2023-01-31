import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.scss'],
})
export class OptionSelectorComponent {
  @Input() symbolList: ISymbol[] = [];
  @Output() selectedSymbol = new EventEmitter<any>();

  symbol: string = '';

  constructor() {}

  onSelectSymbol(value: string) {
    this.symbol = value;
    this.selectedSymbol.emit(this.symbol);
  }
}

export interface ISymbol {
  cName: string;
  cSymbol: string;
}
