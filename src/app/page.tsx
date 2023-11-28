"use client";
import { useEffect, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";
import { Newsreader } from "next/font/google";
// import MyReadingList from "@/components/MyReadingList";
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
  const [readingList, setReadingList] = useState<Book[]>([]);

  const addBookToMyList = (clickedBook: Book) => {
    const isAlreadyInList = readingList.some(
      (book) => book.ISBN === clickedBook.ISBN
    );

    if (!isAlreadyInList) {
      setReadingList([...readingList, clickedBook]);
    }

    console.log(readingList);
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
          Available Books: {booksList.length - readingList.length}
        </h1>
        <h1 className="w-1/3">My Reading List: {readingList.length}</h1>
      </div>
      <div className="flex gap-2 p-2">
        <section className="flex flex-wrap gap-4 w-2/3 justify-evenly border-r-2 ">
          {isLoading ? (
            <PiSpinnerGapThin
              size="2rem"
              className="animate-spin text-center mt-4 text-gray"
            />
          ) : (
            <>
              {booksList.map((book) => (
                <BookPreview
                  key={book.ISBN}
                  book={book}
                  addBookToMyList={addBookToMyList}
                  // readingList={readingList}
                />
              ))}
            </>
          )}
        </section>
        <section className="w-1/3 h-48">
          {/* <MyReadingList readingList={readingList} /> */}
        </section>
      </div>
    </main>
  );
}
