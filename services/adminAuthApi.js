/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminAuthApi = createApi({
    reducerPath: 'adminAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.100.198:5000/admin'
    }),
    endpoints: (builder) => ({
        registerAdmin: builder.mutation({
            query: (admin) => {
                return {
                    url: 'register',
                    method: 'POST',
                    body: admin,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),

        loginAdmin: builder.mutation({
            query: (admin) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: admin,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),
    }),


})
export const { useRegisterAdminMutation, useLoginAdminMutation } = adminAuthApi




