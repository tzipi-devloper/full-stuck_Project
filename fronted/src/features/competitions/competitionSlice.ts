import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const competitionSlice = createApi({
  reducerPath: "api/competitions", 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/competitions'
  }),
  tagTypes: ["Competition" , "TopCompetitions"], 
  endpoints: (builder) => ({}) 
});

export default competitionSlice;
