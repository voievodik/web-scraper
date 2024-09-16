import { useState } from "react";
import useVisible from "./useVisible";
import { BidI } from "../interfaces/bids";
import { getBids } from "../services/bids";

export const useBidsList = () => {
  const [bids, setBids] = useState<BidI[]>([]);
  const loading = useVisible(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async () => {
    loading.show();

    try {
      const response = await getBids(searchValue);

      setBids(response.data.bids);
    } catch (error) {
      // handle error
      console.log(error);
    } finally {
      loading.hide();
    }
  };

  const onChangeSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    bids,
    loading: loading.visible,
    onChangeSearch,
    searchValue,
    handleSubmit,
  };
};
