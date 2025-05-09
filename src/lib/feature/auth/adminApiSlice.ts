// features/admin/adminApiSlice.ts
import { baseApiSlice } from '../../store/apiSlice';
import { User } from '@/types/user';

export const adminApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: 'api/v1/admin/users',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `api/v1/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    // Add more admin-specific endpoints here
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = adminApiSlice;