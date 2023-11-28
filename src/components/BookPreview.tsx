import { useState } from "react";
import Image from "next/image";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Book } from "@/types/book.types";

interface BookPreviewProps {
  book: Book;
  // readingList: Book[];
  addBookToMyList: (clickedBook: Book) => void;
}

export default function BookPreview({
  book,
  // readingList,
  addBookToMyList,
}: BookPreviewProps) {
  const [buttonsVisibility, setButtonsVisibility] = useState(true);

  const handleVisibilityButtonsChange = () => {
    setButtonsVisibility(!buttonsVisibility);
    setTimeout(() => setButtonsVisibility(true), 3000);
  };

  return (
    <div className="relative ">
      <Image
        className="rounded drop-shadow-lg"
        alt="Book Cover"
        src={book.cover}
        width={120}
        height={180}
        onClick={handleVisibilityButtonsChange}
      ></Image>
      {buttonsVisibility ? (
        <div className="w-[7.5rem] flex items-center justify-evenly bg-gray-200 text-red-800 absolute top-1/3 opacity-0 transition-opacity"></div>
      ) : (
        <div className="h-16 w-[7.5rem] flex items-center justify-evenly bg-gray-200 text-red-800 absolute top-1/3 opacity-90 transition-opacity">
          <IoIosInformationCircleOutline
            size="2rem"
            className="hover:scale-110"
          />
          <IoIosAddCircleOutline
            size="2rem"
            className="hover:scale-110"
            onClick={() => addBookToMyList(book)}
          />
        </div>
      )}
    </div>
  );
}
