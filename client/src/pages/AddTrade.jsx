import { useState } from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../wrappers/AddTrade";
import customFetch from "../utils/customFetch";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TRADE_SIDE,
  TRADE_STATUS,
  ASSET_TYPE,
  POSITION_SIDE,
} from "../../../utils/constants";

const newExitLeg = () => ({
  id: crypto.randomUUID(),
  quantity: "",
  price: "",
  exitDate: "",
  note: "",
});

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
  const [status, setStatus] = useState(TRADE_STATUS.OPEN);
  const exitFieldsVisible = status === TRADE_STATUS.CLOSED;
  const [exitLegs, setExitLegs] = useState([newExitLeg()]);

  const updateExitLeg = (id, field, value) => {
    setExitLegs((prev) =>
      prev.map((leg) => (leg.id === id ? { ...leg, [field]: value } : leg)),
    );
  };

  const addExitLeg = () => {
    setExitLegs((prev) => [...prev, newExitLeg()]);
  };

  const removeExitLeg = (id) => {
    setExitLegs((prev) => prev.filter((leg) => leg.id !== id));
  };

  const serializedExitLegs = JSON.stringify(
    exitFieldsVisible ? exitLegs.map(({ id, ...leg }) => leg) : [],
  );

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
            labelText="buy or sell"
            name="side"
            list={Object.values(TRADE_SIDE)}
          />
          <FormRowSelect
            labelText="call or put"
            name="positionSide"
            list={Object.values(POSITION_SIDE)}
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            list={Object.values(TRADE_STATUS)}
          />
          <input type="hidden" name="exitLegs" value={serializedExitLegs} />

          {exitFieldsVisible && (
            <section className="exit-legs">
              <h5 className="exit-legs__header">Scale-out exits</h5>
              {exitLegs.map((leg) => (
                <div key={leg.id} className="exit-leg-row">
                  <FormRow
                    type="number"
                    name={`exitQty-${leg.id}`}
                    labelText="Qty closed"
                    value={leg.quantity}
                    handleChange={(e) =>
                      updateExitLeg(leg.id, "quantity", e.target.value)
                    }
                    step="any"
                  />
                  <FormRow
                    type="number"
                    name={`exitPrice-${leg.id}`}
                    labelText="Exit price"
                    value={leg.price}
                    handleChange={(e) =>
                      updateExitLeg(leg.id, "price", e.target.value)
                    }
                    step="any"
                  />
                  <FormRow
                    type="datetime-local"
                    name={`exitDate-${leg.id}`}
                    labelText="Exit date & time"
                    value={leg.exitDate}
                    handleChange={(e) =>
                      updateExitLeg(leg.id, "exitDate", e.target.value)
                    }
                    step={1}
                  />
                  <div className="form-row exit-leg-remove-wrap">
                    <label
                      className="form-label"
                      htmlFor={`removeExit-${leg.id}`}
                    >
                      Action
                    </label>
                    <button
                      id={`removeExit-${leg.id}`}
                      type="button"
                      className="exit-leg-remove"
                      onClick={() => removeExitLeg(leg.id)}
                      disabled={exitLegs.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="exit-leg-add"
                onClick={addExitLeg}
              >
                + Add exit leg
              </button>
            </section>
          )}
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
