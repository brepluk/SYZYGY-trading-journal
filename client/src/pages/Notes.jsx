import { useEffect, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import TradeNotesEditor from "../components/TradeNotesEditor";
import TradeTradingViewChart from "../components/TradeTradingViewChart";
import Wrapper from "../wrappers/Notes";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/trades/${params.id}`);
    const trade = data?.trade;
    if (!trade) {
      toast.error("Trade not found.");
      return redirect("/dashboard/all-trades");
    }
    return { trade };
  } catch (error) {
    toast.error(error?.response?.data?.message ?? "Could not load trade.");
    return redirect("/dashboard/all-trades");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const notes = formData.get("notes");
  const notesStr = notes == null ? "" : String(notes);
  try {
    await customFetch.patch(`/trades/${params.id}`, { notes: notesStr });
    toast.success("Notes saved");
    return null;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ?? "Could not save notes. Try again.",
    );
    return null;
  }
};

const Notes = () => {
  const { trade } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [notesHtml, setNotesHtml] = useState(() => trade.notes ?? "");

  useEffect(() => {
    setNotesHtml(trade.notes ?? "");
  }, [trade.id, trade.updatedAt]);

  return (
    <Wrapper>
      <div className="notes-card">
        <h1 className="notes-title">Trade journal</h1>
        <p className="notes-meta">
          <strong>{`${trade.ticker} ${trade.strike} ${trade.side} `}</strong>
          {trade.expiration
            ? ` · ${new Date(trade.expiration).toLocaleString()}`
            : null}
        </p>

        <div className="notes-chart-panel">
          <div className="notes-chart-ticker-row">
            <span className="notes-chart-ticker">{trade.ticker}</span>
            <span className="notes-chart-asset">{trade.assetType}</span>
          </div>
          <TradeTradingViewChart trade={trade} />
        </div>

        <Form method="post" className="notes-form">
          <input type="hidden" name="notes" value={notesHtml} />

          <div className="notes-field">
            <span className="notes-label" id="notes-editor-label">
              Notes
            </span>
            <div role="group" aria-labelledby="notes-editor-label">
              <TradeNotesEditor
                key={`${trade.id}-${trade.updatedAt}`}
                value={notesHtml}
                onChange={setNotesHtml}
                placeholder="Why did you take this trade? Did you follow your rules? What did you learn?"
              />
            </div>
          </div>
          <div className="notes-actions">
            <button
              type="submit"
              className="btn form-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving…" : "Save notes"}
            </button>
            <p className="notes-hint"></p>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Notes;
