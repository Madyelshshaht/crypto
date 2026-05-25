import { configureStore } from "@reduxjs/toolkit";
import { CryptoApi } from "../Services/CryptoApi";
import { CryptosNewsApi } from "../Services/CryptosNewsApi";
import { FinanceNewsApi } from "../Services/FinanceNewsApi";



export default configureStore({
    reducer: {
        // CryptoApi : CryptoApi.reducer      # True
        [CryptoApi.reducerPath] : CryptoApi.reducer ,// # True
        [CryptosNewsApi.reducerPath] : CryptosNewsApi.reducer ,// # True
        [FinanceNewsApi.reducerPath] : FinanceNewsApi.reducer ,// # True
    } ,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(CryptoApi.middleware)
        .concat(CryptosNewsApi.middleware)
        .concat(FinanceNewsApi.middleware)
})