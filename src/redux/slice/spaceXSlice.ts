import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLaunches, getLaunch } from "../../services/spaceXApi";

export interface PaginationInterface {
  page?: number;
  per_page?: number;
  search?: string;
}

const initialState = {
  launches: [],
  perPage: 10,
  launch: null,
  loading: false,
  error: "",
};

export const getLaunches = createAsyncThunk(
  "getLaunches",
  async ({ per_page, search }: PaginationInterface) => {
    const response = await getAllLaunches({ per_page, search });
    return response;
  }
);

export const viewLaunch = createAsyncThunk(
  'viewLaunch',
  async (flightId: string) => {
    const response = await getLaunch(flightId);
    return response;
  },
);

const spaceXSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSpaces: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
    setSpace: (state, action) => {
      return {
        ...state,
        product: action.payload,
      };
    },
    setPerPage: (state, action) => {
      return {
        ...state,
        perPage: state.perPage + action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(getLaunches.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLaunches.fulfilled, (state, action) => {
        state.loading = false;
        state.launches = action.payload;
      })
      .addCase(getLaunches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      })

      // VIEW
      .addCase(viewLaunch.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewLaunch.fulfilled, (state, action) => {
        state.loading = false;
        state.launch = action.payload;
      })
      .addCase(viewLaunch.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.error.message;
      });
  },
});

export const { setSpaces, setSpace, setPerPage } = spaceXSlice.actions;
export default spaceXSlice.reducer;
