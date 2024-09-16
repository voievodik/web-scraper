import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { BidsContent } from "./components/BidContent";
import { BidItem } from "./components/BidItem";

function Root() {
  return (
    <Routes>
      <Route path="/" element={<BidsContent />} />
      <Route path="/bid/:id" element={<BidItem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Root;
