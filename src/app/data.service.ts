import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const BASE_URI: string = 'http://localhost:3000/todos';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getTodos(): Observable<any[]> {
    return this.http.get(BASE_URI)
      .map(response => response.json());
  }

  addTodo(todo: string): Observable<any[]> {
    return this.http.post(BASE_URI, { done: false, todo: todo })
      .map((response) => response.json())
      .concatMap(x => this.getTodos())
  }

  clearCompleted(todos: any[]): Observable<any[]> {
    let deleteObservables: any[] = [];

    todos.forEach(item => {
      let deleteObs = this.http.delete(`${BASE_URI}/${item.id}`);
      deleteObservables.push(deleteObs);
    });

    // forkJoin ==> 把所有的 Observable 接起來之後併發
    return Observable.forkJoin(deleteObservables)
      .concatMap(x => this.getTodos()); // 再接 getTodos() 把最後的資料拿回來
  }

  checkAll(todos: any[]): Observable<any[]> {
    let checkAllObservables: any[] = [];
    todos.forEach(item => {
      let putObs = this.http.put(`${BASE_URI}/${item.id}`, {
        todo: item.todo,
        done: item.done
      });
      checkAllObservables.push(putObs);
    });

    return Observable.forkJoin(checkAllObservables)
      .concatMap(x => this.getTodos()); // 再接 getTodos() 把最後的資料拿回來
  }

  deleteTodo(item: any): Observable<any[]> {
    return this.http.delete(`${BASE_URI}/${item.id}`)
      .concatMap(x => this.getTodos());
  }

  checkDone(item: any): Observable<any[]> {
    return this.http.put(`${BASE_URI}/${item.id}`, { todo: item.todo, done: item.done })
      .concatMap(x => this.getTodos());
  }

}
