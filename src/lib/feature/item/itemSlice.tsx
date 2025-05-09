// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

export const createItem = createAsyncThunk(
  'items/create',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post('/item', formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error occurred' });
    }
  }
);
export const updateItem = createAsyncThunk(
  'items/update',
  async ({ id, formData ,token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.put(`/item/${id}`, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/delete',
  async ({ id, itemType ,token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.delete(`/item/${id}`, config);
      return { id, itemType };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchItems = createAsyncThunk(
  'items/fetchAll',
  async ({params, token}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      };
      const response = await api.get('/item', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchItemById = createAsyncThunk(
  'items/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/item/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPublicItems = createAsyncThunk(
  'items/fetchPublic',
  async (params, { rejectWithValue }) => {
    try {
      const {
        page = 1,
        limit = 10,
        itemType,
        category,
        condition,
        sortBy,
        sortOrder,
        userType,
        listingType,
        startDate,
        endDate,
        manufacturer
      } = params || {};
     
      const response = await api.get('/publicAll', {
        params: {
          page,
          limit,
          itemType,
          category,
          condition,
          sortBy,
          sortOrder,
          userType,
          listingType,
          startDate,
          endDate,
          manufacturer
        }
      });

      // Transform the data to ensure contact info is properly structured
      const transformedData = {
        ...response.data,
        data: response.data.data.map(item => ({
          ...item,
          contactInfo: {
            username: `${item.createdBy.firstName} ${item.createdBy.lastName}`,
            email: item.createdBy.email,
            phoneNumber: item.createdBy.phoneNumber,  // Now correctly uses phoneNumber from backend
            userType: item.createdBy.userType
          }
        }))
      };
     
      return transformedData;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error occurred' });
    }
  }
);



export const importItem = createAsyncThunk(
  'items/import',
  async ({ formData, token }, { rejectWithValue }) => {
    console.log("Thunk called with formData:", formData);
    console.log("Using token:", token);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post('/item/import', formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { 
          message: 'Network error occurred',
          details: error.message 
        }
      );
    }
  }
);




const initialState = {
  items: [],
  publicItems: {
    data: [],
    pagination: {
      current: 1,
      total: 1,
      totalItems: 0
    }
  },
  currentItem: null,
  loading: false,
  error: null,
  success: false,
  filters: {
    itemType: '',
    category: '',
    condition: '',
    manufacturer: '',
    location: ''
  }
}

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create item cases
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.unshift(action.payload.data);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create item';
      })

      // Update item cases
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.items.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
        state.currentItem = action.payload.data;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update item';
      })

      // Delete item cases
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = state.items.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete item';
      })

      // Fetch all items cases
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch items';
      })

      // Fetch single item cases
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload.data;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch item';
      })

      
      .addCase(importItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importItem.fulfilled, (state, action) => {
        state.loading = false;
        state.importResult = action.payload;
      })
      .addCase(importItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




      .addCase(fetchPublicItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicItems.fulfilled, (state, action) => {
        state.loading = false;
        state.publicItems = {
          data: action.payload.data,
          pagination: action.payload.pagination
        };
      })
      .addCase(fetchPublicItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch public items';
      })
  },
});

export const { resetState, setFilters, clearCurrentItem } = itemSlice.actions;
export default itemSlice.reducer;