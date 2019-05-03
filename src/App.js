import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookShelf from "./Book/BookShelf.js";
import SearchNewBook from "./Book/SearchNewBook.js";
import * as BooksAPI from "./BooksAPI/BooksAPI";
import { Link, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelvedBooks: [],
    shelves: [
      {
        id: "currentlyReading",
        name: "Leitura Atual"
      },
      {
        id: "wantToRead",
        name: "Leitura Desejada"
      },
      {
        id: "read",
        name: "Leitura Concluída"
      }
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then(shelvedBooks => {
      this.setState({ shelvedBooks });
    });
  }
  changeShelf = (bookToAdd, shelf) => {
    this.setState(state => {
          const nextState = state.shelvedBooks.filter(book => book.id !== bookToAdd.id).concat( [{...bookToAdd, shelf}] );
          return { shelvedBooks: nextState };
        });
      }

  render() {
    return (
      <div className="app">
        <Route path="/search"
          render={() => (
            <SearchNewBook
              shelvedBooks={this.state.shelvedBooks}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>My.Reads</h1>
              </div>
              <div className="list-books-content">
                {this.state.shelves.map(shelf => (
                  <BookShelf
                    key={shelf.id}
                    shelf={shelf}
                    shelvedBooks={this.state.shelvedBooks}
                    books={this.state.shelvedBooks.filter(shelvedBooks => {
                      return shelvedBooks.shelf === shelf.id;
                    })}
                    changeShelf={this.changeShelf}
                  />
                ))}
              </div>
              <div className="open-search">
                <Link to="/search">Search a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;