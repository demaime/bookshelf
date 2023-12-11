import { Book } from "@/types/book.types";
import React from "react";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";

interface BookInfoCardProps {
  book: Book;
  setBookInfoCardVisibility: (visibility: boolean) => void;
  isAlreadyInList: boolean;
  removeBookFromMyList: (clickedBook: Book) => void;
  addBookToMyList: (clickedBook: Book) => void;
}

export default function BookInfoCard({
  book,
  setBookInfoCardVisibility,
  isAlreadyInList,
  removeBookFromMyList,
  addBookToMyList,
}: BookInfoCardProps) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 backdrop-blur-xl z-20">
      <div className="sm:w-9/12 md:w-3/5 w-1/2 center-fixed flex flex-col justify-between shadow-lg bg-white border-2 fixed z-20 h-2/3 w-full ">
        <div className="w-full h-1/2 flex justify-between items-center">
          <div className=" w-full rounded skew-y-6 ml-1 drop-shadow-md h-full">
            <Image
              alt="Book Cover"
              src={book.cover}
              width={280}
              height={450}
              className="shadow-2xl rounded skew-y-6 ml-4 border-2 border-white"
            />
          </div>
          <div className="w-1/2 md:w-2/3 flex flex-col text-center items-center">
            <h1 className="md:text-4xl text-2xl mt-2 text-center p-2">
              {book.title}
            </h1>
            <p className="mt-4">
              <span className="font-bold">{book.pages}</span> páginas.
            </p>
            <p className="font-bold my-4 text-xl px-2">
              {book.author.name.toUpperCase()}
            </p>
            <p>{book.year}</p>
            <p>
              <em>{book.genre}</em>
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-evenly h-1/2 items-center ">
          <h1 className="w-full">
            <em className="w-full  text-2xl flex justify-center py-2 border bg-gray-100">
              SINOPSIS
            </em>
          </h1>
          <p className=" text-center px-2">{book.synopsis}</p>

          <div className="w-full flex justify-evenly">
            {isAlreadyInList ? (
              <button
                className="border rounded-xl bg-gray-100 w-40 p-4 sm:w-12 sm:p-2"
                onClick={() => removeBookFromMyList(book)}
              >
                Quitar de mi lista
              </button>
            ) : (
              <button
                className="border rounded-xl bg-gray-100 w-36 p-2 sm:w-40 sm:p-4"
                onClick={() => addBookToMyList(book)}
              >
                Agregar a mi Lista
              </button>
            )}
            <button
              className="border rounded-xl bg-gray-100 w-36 p-2 sm:w-40 sm:p-4"
              onClick={() => setBookInfoCardVisibility(false)}
            >
              Salir
            </button>
          </div>
        </div>

        <AiFillCloseCircle
          color="#AE290D"
          className="absolute right-0 -top-4 h-8 w-8"
          onClick={() => setBookInfoCardVisibility(false)}
        />
      </div>
    </div>
  );
}
