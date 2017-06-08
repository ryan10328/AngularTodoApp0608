import { DataService } from './data.service';
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

  constructor(private http: Http,
    private dataService: DataService) {

    this.dataService.getTodos().subscribe(x => this.todos = x);

  }

  isToggle: boolean = false;
  selectedType: string = 'all';
  todo: string = '';
  todos: any[] = [];
  title = 'app';
  inputHint: string = 'What needs to be done?!!!';

  getTodos() {
    return this.dataService.getTodos();
  }

  addTodo() {
    if (this.todo) {
      // this.http.post('http://localhost:3000/todos', { done: false, todo: this.todo })
      //   .map((response) => response.json())
      //   .concatMap(x => this.getTodos())
      //   .subscribe(x => this.todos = x);
      this.dataService
        .addTodo(this.todo)
        .subscribe(data => this.todos = data);

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

    this.dataService.clearCompleted(todos)
      .subscribe(data => this.todos = data);

    // let deleteObservables: any[] = [];
    // todos.forEach(item => {
    //   let deleteObs = this.http.delete(`http://localhost:3000/todos/${item.id}`);
    //   deleteObservables.push(deleteObs);
    // });

    // forkJoin ==> 把所有的 Observable 接起來之後併發
    // Observable.forkJoin(deleteObservables)
    //   .concatMap(x => this.getTodos()) // 再接 getTodos() 把最後的資料拿回來
    //   .subscribe(x => this.todos = x);
  }

  selectChange(evt) {
    this.selectedType = evt;
  }

  checkAll() {

    let todos = this.todos.map((x) => {
      return x.done !== this.isToggle ?
        { id: x.id, todo: x.todo, done: !x.done } :
        { id: x.id, todo: x.todo, done: x.done };
    });

    this.dataService.checkAll(todos).subscribe(data => this.todos = data);
    // let checkAllObservables: any[] = [];
    // todos.forEach(item => {
    //   let putObs = this.http.put(`http://localhost:3000/todos/${item.id}`, {
    //     todo: item.todo,
    //     done: item.done
    //   });
    //   checkAllObservables.push(putObs);
    // });

    // Observable.forkJoin(checkAllObservables)
    //   .concatMap(x => this.getTodos()) // 再接 getTodos() 把最後的資料拿回來
    //   .subscribe(x => this.todos = x);
  }

  deleteTodo(item) {
    // this.todos = this.todos.filter(x => x !== item);
    // this.http.delete(`http://localhost:3000/todos/${item.id}`)
    //   .concatMap(x => this.getTodos())
    //   .subscribe(x => this.todos = x);
    this.dataService.deleteTodo(item)
      .subscribe(data => this.todos = data);
  }

  checkDone(item) {
    // this.http.put(`http://localhost:3000/todos/${item.id}`, { todo: item.todo, done: item.done })
    //   .concatMap(x => this.getTodos())
    //   .subscribe(x => this.todos = x);
    this.dataService.checkDone(item)
      .subscribe(data => this.todos = data);
  }
}
