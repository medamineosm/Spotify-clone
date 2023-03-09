import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'cf3c66b231msh7d3f71d807eaa7cp14d154jsn0f7f8e8896fe');
            headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
            return headers;
        } 
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world' }),
    }),
});

export const {
    useGetTopChartsQuery
} = shazamCoreApi;