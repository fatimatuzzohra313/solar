import { baseApiSlice } from '../../store/apiSlice';
import { AuthResponse, CreateJoinRequest, JoinRequest, LoginCredentials, RegisterCredentials, User } from '../../../types/user';
import { setCredentials } from './authSlice';

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
      register: builder.mutation<AuthResponse, RegisterCredentials>({
          query: (credentials) => ({
              url: 'api/v1/register',
              method: 'POST',
              body: {
                  ...credentials,
                  role: 'user' // Explicitly set default role
              },
          }),
          transformResponse: (response: AuthResponse) => ({
              ...response,
          }),
          transformErrorResponse: (response: { status: number, data: any }) => {
              return response.data;
          },
          invalidatesTags: ['User'],
      }),
      login: builder.mutation<AuthResponse, LoginCredentials>({
          query: (credentials) => ({
              url: 'api/v1/login',
              method: 'POST',
              body: credentials,
          }),
          transformResponse: (response: AuthResponse) => ({
              ...response,
          }),
          invalidatesTags: ['User'],
      }),


    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'api/v1/logoutUser',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: 'api/v1/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    

    
    updatePassword: builder.mutation<User, Partial<User>>({
      query: (updates) => ({
        url: 'api/v1/updatePassword',
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['User'],
    }),

    updateProfile: builder.mutation<User, Partial<User>>({
      query: (updates) => ({
        url: 'api/v1/updateProfile',
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['User'],
    }),

    verifyPassword: builder.mutation<{ message: string }, { password: string }>({
      query: (data) => ({
        url: 'api/v1/verify-password',
        method: 'POST',
        body: data,
      }),
    }),

    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: 'api/v1/admin/users',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    // Add deleteUser endpoint for admins
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `api/v1/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),



    createJoinRequest: builder.mutation<JoinRequest, CreateJoinRequest>({
      query: (data) => ({
        url: 'api/v1/join-requests',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['JoinRequest'],
    }),

    getAllJoinRequests: builder.query<JoinRequest[], void>({
      query: () => ({
        url: 'api/v1/admin/join-requests',
        method: 'GET',
      }),
      providesTags: ['JoinRequest'],
    }),

    getJoinRequest: builder.query<JoinRequest, string>({
      query: (id) => ({
        url: `api/v1/admin/join-requests/${id}`,
        method: 'GET',
      }),
      providesTags: ['JoinRequest'],
    }),

    updateJoinRequestStatus: builder.mutation<JoinRequest, { id: string; status: 'pending' | 'approved' | 'rejected' }>({
      query: ({ id, status }) => ({
        url: `api/v1/admin/join-requests/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['JoinRequest'],
    }),

    deleteJoinRequest: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `api/v1/admin/join-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['JoinRequest'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useVerifyPasswordMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,    // New export
  useDeleteUserMutation,  // New export




  useCreateJoinRequestMutation,
  useGetAllJoinRequestsQuery,
  useGetJoinRequestQuery,
  useUpdateJoinRequestStatusMutation,
  useDeleteJoinRequestMutation,
} = authApiSlice;