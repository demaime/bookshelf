import { Book } from "@/types/book.types";
import React from "react";

interface BookInfoCardProps {
  book: Book;
  setBookInfoCardVisibility: (arg0: boolean) => void;
}

export default function BookInfoCard({
  book,
  setBookInfoCardVisibility,
}: BookInfoCardProps) {
  return (
    <div className="border-2 bg-blue-400 fixed z-20 h-48 w-3/4 top-12 start-16 inset-x-0">
      <p></p>
      {book.title}
      <div
        className="absolute right-0 top-0 h-8 w-8 bg-red-400 font-bolder text-white flex items-center justify-center "
        onClick={() => setBookInfoCardVisibility(false)}
      >
        X
      </div>
    </div>
  );
}
