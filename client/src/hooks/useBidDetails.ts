import { useEffect, useMemo, useState } from "react";
import { BidI } from "../interfaces/bids";
import { useLocation } from "react-router-dom";
import { getBidById } from "../services/bids";
import useVisible from "./useVisible";

export const useBidDetails = () => {
  const [bidDetails, setBidDetails] = useState<BidI | null>(null);
  const loading = useVisible(true);
  const location = useLocation();

  const init = async () => {
    try {
      const id = location.pathname.split("/")[2];
      const response = await getBidById(id);
      setBidDetails(response.data.bid);
    } catch (error) {
      // handle error
      console.log(error);
    } finally {
      loading.hide();
    }
  };

  const formattedDetails = useMemo(() => {
    return [
      {
        title: "ID",
        value: bidDetails?.id,
      },
      {
        title: "Status",
        value: bidDetails?.status,
      },
      {
        title: "Due Date",
        value: bidDetails?.dueDate,
      },
      {
        title: "Publish Date",
        value: bidDetails?.publishDate,
      },
      {
        title: "Category",
        value: bidDetails?.category,
      },
      {
        title: "Solicitation Type",
        value: bidDetails?.solicitationType,
      },
      {
        title: "Agency",
        value: bidDetails?.agency,
      },
    ];
  }, [bidDetails]);

  useEffect(() => {
    init();
  }, []);

  return { loading: loading.visible, formattedDetails, bidDetails };
};
