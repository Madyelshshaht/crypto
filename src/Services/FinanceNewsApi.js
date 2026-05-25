
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FinanceNewsApiheader = {
    'x-rapidapi-key': 'ee2723fce1msh774328946bb6f72p124394jsna419501160e0',
    'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
};

const baseUrl = "https://real-time-finance-data.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: FinanceNewsApiheader });

export const FinanceNewsApi = createApi({
    reducerPath: "FinanceNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getFinanceNews: builder.query({
            query: () =>
                createRequest(
                    `/stock-news?symbol=AAPL%3ANASDAQ&language=en'`
                ),
        }),
    }),
});

export const { useGetFinanceNewsQuery } = FinanceNewsApi;