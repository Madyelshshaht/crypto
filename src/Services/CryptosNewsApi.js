import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiheaders = {
    'x-rapidapi-key': 'ee2723fce1msh774328946bb6f72p124394jsna419501160e0',
    'x-rapidapi-host': 'google-news13.p.rapidapi.com'
};

const baseUrl = "https://google-news13.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsApiheaders });

export const CryptosNewsApi = createApi({
    reducerPath: "cryptosNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: (count) =>
                createRequest(
                    `/business?lr=en-US`
                ),
        }),
    }),
});

export const { useGetCryptosNewsQuery } = CryptosNewsApi;