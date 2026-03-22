import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../wrappers/AddTrade";
import customFetch from "../utils/customFetch";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { TRADE_SIDE, TRADE_STATUS, ASSET_TYPE } from "../../../utils/constants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/trades", data);
    toast.success("Trade added successfully");
    return redirect("/dashboard/all-trades");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ?? "Something went wrong. Try again.",
    );
    return error;
  }
};

const AddTrade = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form-page">
        <div className="form-card">
          <h4 className="form-page-title">Trade Details</h4>
          <FormRowSelect
            labelText="asset type"
            name="assetType"
            list={Object.values(ASSET_TYPE)}
          />
          <FormRow type="text" name="ticker" labelText="Ticker" />
          <FormRowSelect
            labelText="trade side"
            name="side"
            list={Object.values(TRADE_SIDE)}
          />
          <FormRow
            type="datetime-local"
            name="entryDate"
            labelText="Entry date & time"
            step={1}
          />
          <FormRow
            type="number"
            name="entryPrice"
            labelText="Entry Price"
            step="any"
          />
          <FormRow
            type="number"
            name="quantity"
            labelText="Quantity"
            step="any"
          />
          <FormRow type="number" name="strike" labelText="Strike" step="any" />
          <FormRow type="date" name="expiration" labelText="Expiration" />
          <FormRowSelect
            labelText="trade status"
            name="status"
            defaultValue={TRADE_STATUS.OPEN}
            list={Object.values(TRADE_STATUS)}
          />

          <FormRow
            type="number"
            name="exitPrice"
            labelText="Exit Price"
            step="any"
          />
          <FormRow
            type="datetime-local"
            name="exitDate"
            labelText="Exit date & time"
            step={1}
          />
          <FormRow type="number" name="fees" labelText="Fees" step="any" />

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddTrade;
