import { useRef, useCallback } from "react";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import Wrapper from "../wrappers/AllTrades";
import { Form, Link, useSubmit } from "react-router-dom";
import {
  TRADE_SIDE_FILTER_OPTIONS,
  POSITION_SIDE_FILTER_OPTIONS,
  TRADE_STATUS_FILTER_OPTIONS,
  TRADE_SORT_FILTER_OPTIONS,
} from "../../../utils/constants";
import { useAllTradesContext } from "../pages/AllTrades";

const SearchContainer = () => {
  const { searchValues } = useAllTradesContext();
  const { search, tradeSide, positionSide, tradeStatus, sort } = searchValues;

  const submit = useSubmit();

  const submitFilters = useCallback(
    (form) => {
      const fd = new FormData(form);
      fd.set("page", "1");
      submit(fd, { method: "get", replace: true });
    },
    [submit],
  );

  const searchDebounceRef = useRef(null);
  const debouncedSubmitSearch = useCallback(
    (e) => {
      const form = e.currentTarget.form;
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = setTimeout(() => {
        searchDebounceRef.current = null;
        submitFilters(form);
      }, 500);
    },
    [submitFilters],
  );

  const onSelectChange = (e) => submitFilters(e.currentTarget.form);

  return (
    <Wrapper>
      <Form method="get" className="search-form-card" replace>
        <h5 className="search-form-title">Filter trades</h5>
        <div className="search-form-center">
          <FormRow
            className="form-row--search"
            optional
            type="search"
            name="search"
            labelText="Symbol search"
            placeholder="e.g. AAPL"
            defaultValue={search}
            onChange={debouncedSubmitSearch}
          />
          <FormRowSelect
            labelText="Buy / Sell"
            name="tradeSide"
            list={TRADE_SIDE_FILTER_OPTIONS}
            defaultValue={tradeSide}
            onChange={onSelectChange}
          />
          <FormRowSelect
            labelText="Call / Put"
            name="positionSide"
            list={POSITION_SIDE_FILTER_OPTIONS}
            defaultValue={positionSide}
            onChange={onSelectChange}
          />
          <FormRowSelect
            labelText="Status"
            name="tradeStatus"
            list={TRADE_STATUS_FILTER_OPTIONS}
            defaultValue={tradeStatus}
            onChange={onSelectChange}
          />
          <FormRowSelect
            labelText="Sort"
            name="sort"
            list={TRADE_SORT_FILTER_OPTIONS}
            defaultValue={sort}
            onChange={onSelectChange}
          />
          <div className="search-form-actions">
            <Link
              to="/dashboard/all-trades"
              className="search-reset-btn"
              replace
            >
              Reset filters
            </Link>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
