import { Link } from "react-router-dom";
import { useBidDetails } from "../../hooks/useBidDetails";
import { Loader } from "../Loader";

export const BidItem = () => {
  const { bidDetails, loading, formattedDetails } = useBidDetails();

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-n-2">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-n-2">
      <div className="p-4 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 space-y-[2rem]">
        <Link
          to="/"
          className="px-[1rem] py-[0.5rem] bg-n-1 text-n-2 rounded-md"
        >
          Back
        </Link>

        <h2 className="text-3xl font-bold text-gray-800 mb-[2rem">
          {bidDetails?.title}
        </h2>

        <ul className="space-y-[0.25rem]">
          {formattedDetails.map((item) => (
            <li className="grid grid-cols-2 text-lg" key={item.title}>
              <p className="text-gray-600">{item.title}:</p>
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
