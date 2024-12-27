import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        signUp: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        signOut: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/signout`,
                method: 'POST',
            }),
        }),
        getUsers: builder.query({
            query: () => `${USERS_URL}/list`
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
    useGetUsersQuery,
} = userApiSlice;
