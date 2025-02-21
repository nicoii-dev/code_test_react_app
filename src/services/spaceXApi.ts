/* eslint-disable import/no-anonymous-default-export */
import { PaginationInterface } from "../redux/slice/spaceXSlice";
import apiService from "./axios";

export const getAllLaunches = async ({per_page, search}: PaginationInterface) => {
  try {
    const response = await apiService.get(`/launches?limit=${per_page}&mission_name=${search}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getLaunch = async (flightId: string) => {
  try {
    const response = await apiService.get(`/launches/${flightId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
