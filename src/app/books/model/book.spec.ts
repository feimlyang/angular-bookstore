import {Author, Book} from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book(1001, 'Tech', 'Introduction to Angular', 50.25, [new Author('Bob', 'T')], 2017)).toBeTruthy();
  });
});
