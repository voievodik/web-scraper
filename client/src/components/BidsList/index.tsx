import { FC } from "react";
import { BidI } from "../../interfaces/bids";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constant/route";

type Props = {
  bids: BidI[];
};

export const BidsList: FC<Props> = ({ bids }) => {
  return (
    <ul className="max-h-[20rem] overflow-auto table-scrollbar pr-[1rem]">
      {bids.map((bid) => (
        <li
          className="cursor-pointer border-b border-n-1 py-[0.5rem]"
          key={bid.id}
        >
          <Link to={`${RouteNames.bid}/${bid.id}`}>{bid.title}</Link>
        </li>
      ))}
    </ul>
  );
};
