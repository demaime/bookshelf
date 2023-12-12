"use client";
import { useEffect, useState, useRef } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";
import { Newsreader } from "next/font/google";
import BookPreview from "@/components/BookPreview";
import { Book } from "@/types/book.types";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "300",
  style: "normal",
});

export default function Home() {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const localStorageList =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("readingList")!);
  const [readingList, setReadingList] = useState<Book[]>(
    localStorageList || []
  );
  const genresList = [...new Set(booksList.map((book) => book.genre))];
  const [chosenGenre, setChosenGenre] = useState("Todas");

  const filteredGenreBookList = booksList.filter(
    (book) => chosenGenre === "Todas" || book.genre === chosenGenre
  );

  const filteredGenreReadingList = readingList.filter(
    (book) => chosenGenre === "Todas" || book.genre === chosenGenre
  );

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

  useEffect(() => {
    const storageCallback = () => {
      setReadingList(JSON.parse(localStorage.getItem("readingList")!));
    };

    addEventListener("storage", storageCallback);

    return () => {
      removeEventListener("storage", storageCallback);
    };
  }, []);

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
          Libros disponibles:{" "}
          {filteredGenreBookList.length - filteredGenreReadingList.length}
        </h1>
        <h1 className="w-1/3">
          En mi lista: {filteredGenreReadingList.length}
        </h1>
      </div>
      <div className="w-full text-red-800 bg-red-800 my-2 flex justify-evenly items-center py-2 font-bold">
        <p className="text-white">Género:</p>
        <select
          value={chosenGenre}
          name="genre-filter"
          className="p-2"
          onChange={(e) => setChosenGenre(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>
          {genresList.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex border-t-2 p-2">
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
              {filteredGenreBookList.map((book) => (
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
          id="reading-list"
          className="w-1/3 flex flex-col items-center h-screen overflow-auto pt-4 "
        >
          {readingList
            .filter(
              (book) => chosenGenre === "Todas" || book.genre === chosenGenre
            )
            .map((book, i) => (
              <div
                className={
                  i === 0
                    ? "p-1 hover:z-50 hover:scale-125 transition-transform"
                    : "-mt-12 shadow-2xl hover:z-50 hover:scale-125 transition-transform"
                }
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
