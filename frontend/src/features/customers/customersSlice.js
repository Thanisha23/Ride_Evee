import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async () => {
    const response = await axios.get('http://localhost:3000/api/v1/customer/allCustomers');
    return response.data.customers;
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id) => {
    await axios.delete('http://localhost:3000/api/v1/customer/deleteCustomer', {
      data: { id },
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    });
    return id;
  }
);

const customersSlice = createSlice({
  name: 'customers',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        return state.filter(customer => customer._id !== action.payload);
      });
  },
});

export default customersSlice.reducer;