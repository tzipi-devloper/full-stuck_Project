import competitionDemo from "./competitionSlice";
import { CompetitionItem } from "./competitionsTypes";

const competitionsAPI = competitionDemo.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<CompetitionItem[], void>({
      query: () => "/",
      providesTags: ["Competition"],
    }),
    createCompetition: builder.mutation({
      query: (newCompetition) => ({
        url: "/",
        method: "POST",
        body: newCompetition,
      }),
      invalidatesTags: ["Competition"],
    }),
    getCompetitionByCategory: builder.query({
      query: (category) => `/${category}`,
      providesTags: ["Competition"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateCompetitionMutation,
  useGetCompetitionByCategoryQuery,
} = competitionsAPI;

export default competitionsAPI;
