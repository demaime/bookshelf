"use client";
import { useEffect, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";
import BookPreview from "@/components/BookPreview";
import { Book } from "@/types/book.types";
import { newsreader } from "./page";

export default function Home() {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const storageList = JSON.parse(localStorage.getItem("readingList"));
  const [readingList, setReadingList] = useState<Book[]>(storageList || []);

  const isBookAlreadyAdded = (book: Book) => {
    return readingList.some((iteratedBook) => iteratedBook.ISBN === book.ISBN);
  };

  const addBookToMyList = (clickedBook: Book) => {
    if (!isBookAlreadyAdded(clickedBook)) {
      setReadingList([...readingList, clickedBook]);
    }
  };

  const removeBookFromMyList = (clickedBook: Book) => {
    if (isBookAlreadyAdded(clickedBook)) {
      setReadingList(
        readingList.filter((books) => books.ISBN != clickedBook.ISBN)
      );
    }
  };

  async function getBooksList() {
    const response = await fetch("/books.json");
    const booksList = await response.json();
    setBooksList(booksList.library.map((data: any) => data.book));
    setIsLoading(false);
  }

  useEffect(() => {
    getBooksList();
  }, []);

  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]);

  //   useEffect(() => {
  //  if (typeof window !== "undefined" && window.localStorage) {
  //    const storageList = localStorage.getItem("readingList");
  //    console.log(storageList);
  //  }
  //     // setReadingList(JSON.parse(storageList));
  //   }, []);
  return (
    <main className={newsreader.className}>
      <header className="w-100 flex items-center justify-center p-2 font-thin text-4xl">
        Book
        <span className="font-bold">
          <span className="text-red-800">.</span>shelf
        </span>
      </header>
      <div className="flex w-100 font-bold text-center border-b-2">
        <h1 className="w-2/3 text-red-800 ">
          Libros disponibles: {booksList.length - readingList.length}
        </h1>
        <h1 className="w-1/3">Mi lista: {readingList.length}</h1>
      </div>
      <div className="flex">
        <section
          id="available-list"
          className="flex flex-wrap gap-2 h-screen overflow-auto w-2/3 justify-evenly border-r-2 "
        >
          {isLoading ? (
            <PiSpinnerGapThin
              size="2rem"
              className="animate-spin text-center mt-4 text-gray"
            />
          ) : (
            <>
              {booksList.map((book) => (
                <BookPreview
                  isAlreadyInList={isBookAlreadyAdded(book)}
                  key={book.ISBN}
                  book={book}
                  addBookToMyList={addBookToMyList}
                  removeBookFromMyList={removeBookFromMyList}
                />
              ))}
            </>
          )}
        </section>
        <section
          id="reading-list "
          className="w-1/3 flex flex-col items-center h-screen overflow-auto"
        >
          {readingList.map((book, i) => (
            <div
              className={i === 0 ? "p-1" : "p-1 shadow-2xl "}
              key={book.ISBN}
            >
              <BookPreview
                isAlreadyInList={isBookAlreadyAdded(book)}
                book={book}
                addBookToMyList={addBookToMyList}
                removeBookFromMyList={removeBookFromMyList}
              />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
