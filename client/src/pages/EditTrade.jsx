import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../wrappers/AddTrade";
import { useLoaderData } from "react-router-dom";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { TRADE_SIDE, TRADE_STATUS, ASSET_TYPE } from "../../../utils/constants";
import {
  toDateInputValue,
  toDateTimeLocalValue,
} from "../utils/dateUtils";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/trades/${params.id}`);
    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ?? "Could not load trade. Try again.",
    );
    return redirect("/dashboard/all-trades");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    customFetch.patch(`/trades/${params.id}`, data);
    toast.success("Trade updated successfully");
    return redirect("/dashboard/all-trades");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditTrade = () => {
  const { trade } = useLoaderData();
  const navigation = useNavigation();
  const isUpdating = navigation.state === "updating";

  return (
    <Wrapper>
      <Form method="post" className="form-page">
        <div className="form-card">
          <h4 className="form-page-title">Edit Trade</h4>
          <FormRowSelect
            labelText="asset type"
            name="assetType"
            defaultValue={trade.assetType}
            list={Object.values(ASSET_TYPE)}
          />
          <FormRow type="text" name="ticker" defaultValue={trade.ticker} />
          <FormRowSelect
            labelText="trade side"
            name="side"
            defaultValue={trade.side}
            list={Object.values(TRADE_SIDE)}
          />
          <FormRow
            type="datetime-local"
            name="entryDate"
            defaultValue={toDateTimeLocalValue(trade.entryDate)}
            step={1}
          />
          <FormRow
            type="number"
            name="entryPrice"
            defaultValue={trade.entryPrice}
            step="any"
          />
          <FormRow
            type="number"
            name="quantity"
            defaultValue={trade.quantity}
            step="any"
          />
          <FormRow
            type="number"
            name="strike"
            defaultValue={trade.strike}
            step="any"
          />
          <FormRow
            type="date"
            name="expiration"
            defaultValue={toDateInputValue(trade.expiration)}
          />
          <FormRowSelect
            labelText="trade status"
            name="status"
            defaultValue={trade.status}
            list={Object.values(TRADE_STATUS)}
          />

          <FormRow
            type="number"
            name="exitPrice"
            defaultValue={trade.exitPrice}
            step="any"
          />
          <FormRow
            type="datetime-local"
            name="exitDate"
            defaultValue={toDateTimeLocalValue(trade.exitDate)}
            step={1}
          />
          <FormRow
            type="number"
            name="fees"
            defaultValue={trade.fees}
            step="any"
          />

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditTrade;
