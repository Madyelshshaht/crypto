import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// header
const CryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '42c742b1d5mshff7cd18abc4be25p188548jsn8134a3265b3f',
}
//Url
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const creatRequest = ( url ) => ({ url , headers: CryptoApiHeaders})

export const CryptoApi = createApi({
    reducerPath: 'CryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: ( builder ) => ({
        getCryptos: builder.query({
            query: (count) => creatRequest(`/coins?limit=${count}`),
        }),
        getCrypioId: builder.query({
            query: (coinId) => creatRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: (coinId , timePeriod) => creatRequest(`coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&${timePeriod}`)
        })
    })
});


export const { useGetCryptosQuery , useGetCrypioIdQuery  , useGetCryptoHistoryQuery } = CryptoApi;