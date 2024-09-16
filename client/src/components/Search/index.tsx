import { ChangeEvent, FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  searchValue: string;
  onChangeSearch: (value: string) => void;
  onSubmit: () => void;
};

export const Search: FC<Props> = ({
  searchValue,
  onChangeSearch,
  onSubmit,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value);
  };

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="flex gap-[1rem] w-full" onSubmit={handleFormSubmit}>
      <input
        className="outline-none border-2 border-n-1 px-[0.75rem] rounded-md w-full"
        placeholder="Enter Bid ID"
        value={searchValue}
        onChange={handleChange}
      />
      <button
        className={twMerge(
          "px-[1rem] py-[0.5rem] bg-n-1 text-n-2 rounded-md",
          !searchValue.trim() ? "opacity-50" : "opacity-100"
        )}
        type="submit"
        disabled={!searchValue.trim()}
      >
        Submit
      </button>
    </form>
  );
};
