import React from "react";
import * as BooksAPI from "../BooksAPI/BooksAPI";

class Book extends React.Component {

  render() {
   
    const book = this.props.book;
   
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 180,
                backgroundImage: `${this.mapImage(book)}`
              }}
            />

            <div className="book-shelf-changer">
              <select
                defaultValue={this.mapShelf(book)}
                onChange={this.handleChange}
              >
                <option value="none" disabled>
                  Selecione uma estante...
                </option>
                <option value="currentlyReading">Leitura Atual</option>
                <option value="wantToRead">Leitura Desejada</option>
                <option value="read">Leitura Concluída</option>
                <option value="none">N/A</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
            {book.authors !== undefined && book.authors && book.authors.map((author)=>(
                <div key={author} className="book-authors">{ author }</div>
            ))}
        </div>
      </li>
    );
  }
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeShelf(this.props.book, event.target.value);
    BooksAPI.update(this.props.book, event.target.value);
  }

  mapShelf(findBook) {
    const defaultShelf = "none";
    if (findBook.shelf) {
      return findBook.shelf;
    } else {
      
      const match = this.props.shelvedBooks.filter(
        book => book.id === findBook.id
      );
      
      if (!Array.isArray(match) || !match.length) {
        return defaultShelf;
        
      } else {
        return match[0].shelf;
      }
    }
  }

 mapImage(book) {
    
    if (book.imageLinks && book.imageLinks.thumbnail) {
      return `url(${book.imageLinks.thumbnail})`;
      
    } else {
      return "none";
    }
  }
}

export default Book;