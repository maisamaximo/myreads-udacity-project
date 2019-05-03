import React from "react";
import Book from "../Book/Book";

class BookShelf extends React.Component {
  render() {
    const shelf = this.props.shelf;
    const books = this.props.books;

    return (
      <div className="bookShelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                book={book}
                shelf={shelf}
                key={book.id}
                changeShelf={this.props.changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;