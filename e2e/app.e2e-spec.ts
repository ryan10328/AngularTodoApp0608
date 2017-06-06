import { TodoApp0606Page } from './app.po';

describe('todo-app0606 App', () => {
  let page: TodoApp0606Page;

  beforeEach(() => {
    page = new TodoApp0606Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
