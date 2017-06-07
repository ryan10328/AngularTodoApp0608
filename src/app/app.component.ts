import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isToggle: boolean = false;

  selectedType: string = 'all';
  todo: string = '';
  todos: any[] = [];
  title = 'app';
  inputHint: string = 'What needs to be done?!!!';


  addTodo() {

    if (this.todo) {
      // this.todos = [...this.todos, this.todo];
      this.todos = [...this.todos, { done: false, todo: this.todo }];
      // let input = evt.target as HTMLInputElement;
      // this.todos = [...this.todos, input.value]; // spread syntax
      // input.value = '';
    }

    this.todo = '';
  }

  clearCompleted() {
    this.todos = this.todos.filter((item) => {
      return !item.done;
    });
  }

  selectChange(evt) {
    this.selectedType = evt;
  }

  checkAll() {
    this.todos = this.todos.map((x) => {
      return x.done !== this.isToggle ?
        { todo: x.todo, done: !x.done } :
        { todo: x.todo, done: x.done };
    });
  }

  deleteTodo(item) {
    this.todos = this.todos.filter(x => x !== item);
  }
}
