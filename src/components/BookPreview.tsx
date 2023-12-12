import { useState } from "react";
import Image from "next/image";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Book } from "@/types/book.types";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import BookInfoCard from "@/components/BookInfoCard";

interface BookPreviewProps {
  book: Book;
  isAlreadyInList: boolean;
  removeBookFromMyList: (clickedBook: Book) => void;
  addBookToMyList: (clickedBook: Book) => void;
}

export default function BookPreview({
  book,
  isAlreadyInList,
  removeBookFromMyList,
  addBookToMyList,
}: BookPreviewProps) {
  const [buttonsVisibility, setButtonsVisibility] = useState(true);

  const handleVisibilityButtonsChange = () => {
    setButtonsVisibility(!buttonsVisibility);
    setTimeout(() => setButtonsVisibility(true), 1500);
  };

  const [bookInfoCardVisibility, setBookInfoCardVisibility] = useState(false);

  return (
    <div className="">
      <div className="relative ">
        <Image
          className="rounded drop-shadow-lg xl:w-full"
          alt="Book Cover"
          src={book.cover}
          width={100}
          height={130}
          onClick={handleVisibilityButtonsChange}
        ></Image>
        {buttonsVisibility ? (
          <div className="w-full flex bg-gray-200 absolute top-1/3 opacity-0 transition-opacity"></div>
        ) : (
          <div className="h-16 w-full flex items-center justify-evenly bg-gray-200  absolute top-1/3 opacity-90 transition-opacity">
            {!bookInfoCardVisibility && (
              <IoIosInformationCircleOutline
                size="2rem"
                className="hover:scale-110"
                onClick={() => setBookInfoCardVisibility(true)}
              />
            )}

            {isAlreadyInList ? (
              <IoIosRemoveCircleOutline
                size="2rem"
                className="hover:scale-110 drop-shadow-lg"
                onClick={() => removeBookFromMyList(book)}
                color="red"
              />
            ) : (
              <IoIosAddCircleOutline
                size="2rem"
                className="hover:scale-110 drop-shadow-lg"
                onClick={() => addBookToMyList(book)}
                color="green"
              />
            )}
          </div>
        )}
      </div>
      {bookInfoCardVisibility && (
        <BookInfoCard
          book={book}
          setBookInfoCardVisibility={setBookInfoCardVisibility}
          isAlreadyInList={isAlreadyInList}
          addBookToMyList={addBookToMyList}
          removeBookFromMyList={removeBookFromMyList}
        />
      )}
    </div>
  );
}
