import { BidResponseI, BidsResponseI } from "../interfaces/bids";
import axiosInstance from "../lib/axios";

const BIDS_BASE_PATH = "/web-scraper/bids";

export const getBids = async (searchValue: string): Promise<BidsResponseI> => {
  return await axiosInstance.get(`${BIDS_BASE_PATH}?id=${searchValue}`);
};

export const getBidById = async (id: string): Promise<BidResponseI> => {
  return await axiosInstance.get(`${BIDS_BASE_PATH}/${id}`);
};
