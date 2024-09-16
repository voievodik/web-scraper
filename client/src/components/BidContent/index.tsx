import { useBidsList } from "../../hooks/useBidsList";
import { BidsList } from "../BidsList";
import { Loader } from "../Loader";
import { Search } from "../Search";

export const BidsContent = () => {
  const { onChangeSearch, searchValue, handleSubmit, loading, bids } =
    useBidsList();

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-n-3">
      <div className="shadow-xl p-[1rem] bg-white rounded-md space-y-[1rem] w-3/4">
        <h1 className="text-xl text-n-1 font-bold">Bid Dashboard</h1>

        <Search
          onChangeSearch={onChangeSearch}
          searchValue={searchValue}
          onSubmit={handleSubmit}
        />

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : bids.length > 0 ? (
          <BidsList bids={bids} />
        ) : (
          <p className="text-center text-n-4">
            Enter a bid ID to view the details.
          </p>
        )}
      </div>
    </div>
  );
};
