import { Component } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {

    this.getTodos().subscribe(x => this.todos = x);

  }

  isToggle: boolean = false;
  selectedType: string = 'all';
  todo: string = '';
  todos: any[] = [];
  title = 'app';
  inputHint: string = 'What needs to be done?!!!';

  getTodos() {
    return this.http.get('http://localhost:3000/todos')
      .map(x => x.json());
  }

  addTodo() {
    if (this.todo) {
      this.http.post('http://localhost:3000/todos', { done: false, todo: this.todo })
        .map((response) => response.json())
        .concatMap(x => this.getTodos())
        .subscribe(x => this.todos = x);

      // this.todos = [...this.todos, this.todo];
      // this.todos = [...this.todos, { done: false, todo: this.todo }];
      // let input = evt.target as HTMLInputElement;
      // this.todos = [...this.todos, input.value]; // spread syntax
      // input.value = '';
      this.todo = '';
    }
  }

  clearCompleted() {
    let todos = this.todos.filter((item) => {
      return item.done;
    });

    let deleteObservables: any[] = [];
    todos.forEach(item => {
      let deleteObs = this.http.delete(`http://localhost:3000/todos/${item.id}`);
      deleteObservables.push(deleteObs);
    });

    // forkJoin ==> 把所有的 Observable 接起來之後併發
    Observable.forkJoin(deleteObservables)
      .concatMap(x => this.getTodos()) // 再接 getTodos() 把最後的資料拿回來
      .subscribe(x => this.todos = x);
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
