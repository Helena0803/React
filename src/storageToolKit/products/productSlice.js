import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLike } from "../../App/utils/utils";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async function (
    _,
    { extra: api, fulfillWithValue, rejectWithValue, getState }
  ) {
    try {
      const { user } = getState();
      const products = await api.getProductList();
      return fulfillWithValue({ ...products, user: user.data });
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchChangeProductLike = createAsyncThunk(
  "products/fetchChangeProductLike",
  async function (
    productOutside,
    { rejectWithValue, fulfillWithValue, getState, extra: api }
  ) {
    try {
      const { user } = getState();
      console.log({user, productOutside});
      const wasLiked = getLike(productOutside, user.data);
      const data = await api.changeLikeProductsStatus(productOutside._id, wasLiked);
      return fulfillWithValue({product: data, wasLiked: wasLiked})
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  favorites: [],
  total: null,
  loading: false,
  error: null,
  currentSort: 'Новинки'
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    sortedProducts: (state,action) => {
      console.log(state.data, action);
      switch (action.payload) {
        case "Свадебные":
          state.data = state.data.sort((a, b) =>  a?.price - b?.price)
            break;
            case "Новинки":
              state.data = state.data.sort(
                      (a, b) => new Date(b?.created_at) - new Date(a?.created_at)
                    );
                break;
                case "Популярные":
                  state.data = state.data.sort(
                          (a, b) => b.likes.length - a.likes.length
                        );
                    break;
                    case "Обычные":
                      state.data = state.data.sort((a, b) => b?.price - a?.price);
                        break;
                        default:
                          state.data = state.data.sort((a, b) =>  b?.price - a?.price)
                        break;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { total, products, user } = action.payload;
        state.data = products.filter((e) => e.author._id === user._id);
        state.total = total;
        state.favorites = products.filter((e) => getLike(e, user));
        state.loading = false;
      })
      .addCase(fetchChangeProductLike.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { product, wasLiked} = action.payload

        state.data = state.data.map(card => {
          return card._id === product._id ? product : card
        })

        if (!wasLiked) {
          state.favorites.push(product)
        } else {
          state.favorites = state.favorites.filter(cardFav => cardFav._id !== product._id)
        }
      })
      
  },
});
export const {sortedProducts} = productSlice.actions

export default productSlice.reducer;
// const setSortCards = (sort) => {
//   if (sort === "Свадебные") {
//     const newCards = [...cards].sort((a, b) => {
//       return a?.price - b?.price;
//     });
//     setCards([...newCards]);
//   }
//   if (sort === "Обычные") {
//     const newCards = [...cards].sort((a, b) => b?.price - a?.price);
//     setCards([...newCards]);
//   }
//   if (sort === "Популярные") {
//     const newCards = [...cards].sort(
//       (a, b) => b.likes.length - a.likes.length
//     );
//     setCards([...newCards]);
//   }
//   if (sort === "Новинки") {
//     const newCards = [...cards].sort(
//       (a, b) => new Date(a?.created_at) - new Date(b?.created_at)
//     );
//     setCards([...newCards]);
//   }
// };