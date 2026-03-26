import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = (queryClient) => async ({ params }) => {
  try {
    await customFetch.delete(`/trades/${params.id}`);
    queryClient.invalidateQueries({ queryKey: ["trades"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    toast.success("Trade deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("/dashboard/all-trades");
};
