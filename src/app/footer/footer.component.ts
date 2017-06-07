import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; //, OnChanges

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit { //, OnChanges

  private _todos: any[] = [];

  get todos() {
    return this._todos;
  }

  selectedType: string = 'all';

  @Input() set todos(value) {
    this._todos = value;
  }

  @Output() onClearCompleted = new EventEmitter();

  @Output() onSelectChange = new EventEmitter();
  // moreThanFive: boolean = false;



  constructor() { }

  ngOnInit() {
  }

  clearCompleted() {
    this.onClearCompleted.emit();
  }

  selectChange(type) {
    this.selectedType = type;
    this.onSelectChange.emit(type);
  }

  // ngOnChanges() {
  //   this.moreThanFive = this.todos.length >= 5;
  // }


}
