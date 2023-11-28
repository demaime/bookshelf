import React from "react";
import BookPreview from "./BookPreview";

export default function MyReadingList({
  readingList,
  isAlreadyInList,
  key,
  book,
  addBookToMyList,
}) {
  return (
    <div>
      <BookPreview
        isAlreadyInList={isBookAlreadyAdded(book)}
        key={book.ISBN}
        book={book}
        addBookToMyList={addBookToMyList}
      />
    </div>
  );
}
