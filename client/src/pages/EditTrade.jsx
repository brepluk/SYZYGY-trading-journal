import { useState } from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../wrappers/AddTrade";
import { useLoaderData } from "react-router-dom";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import {
  TRADE_SIDE,
  TRADE_STATUS,
  ASSET_TYPE,
  POSITION_SIDE_FORM_OPTIONS,
} from "../../../utils/constants";
import { toDateInputValue, toDateTimeLocalValue } from "../utils/dateUtils";

const newExitLeg = () => ({
  id: crypto.randomUUID(),
  quantity: "",
  price: "",
  exitDate: "",
  note: "",
});

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
    await customFetch.patch(`/trades/${params.id}`, data);
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
  const [status, setStatus] = useState(trade.status);
  const exitFieldsVisible = status === TRADE_STATUS.CLOSED;
  const [exitLegs, setExitLegs] = useState(() =>
    Array.isArray(trade.exitLegs) && trade.exitLegs.length > 0
      ? trade.exitLegs.map((leg) => ({
          id: leg.id ?? crypto.randomUUID(),
          quantity: leg.quantity?.toString() ?? "",
          price: leg.price?.toString() ?? "",
          exitDate: toDateTimeLocalValue(leg.exitDate),
          note: leg.note ?? "",
        }))
      : [newExitLeg()],
  );

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
          <h4 className="form-page-title">Edit Trade</h4>
          <FormRowSelect
            labelText="asset type"
            name="assetType"
            defaultValue={trade.assetType}
            list={Object.values(ASSET_TYPE)}
          />
          <FormRow type="text" name="ticker" defaultValue={trade.ticker} />
          <FormRowSelect
            labelText="buy or sell"
            name="side"
            defaultValue={trade.side}
            list={Object.values(TRADE_SIDE)}
          />
          <FormRowSelect
            labelText="call or put"
            name="positionSide"
            defaultValue={trade.positionSide ?? ""}
            list={[{ value: "", label: "—" }, ...POSITION_SIDE_FORM_OPTIONS]}
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            list={Object.values(TRADE_STATUS)}
          />
          <input type="hidden" name="exitLegs" value={serializedExitLegs} />

          {exitFieldsVisible ? (
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
          ) : (
            <>
              <input type="hidden" name="exitPrice" value="" />
              <input type="hidden" name="exitDate" value="" />
            </>
          )}
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
