import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending")
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (error) return <p className="centered focused">{error}</p>;

  if (!loadedQuotes.text) return <NoQuotesFound />;

  return (
    <React.Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Routes>
        <Route
          path=""
          element={
            <div className="centered">
              <Link
                className="btn--flat"
                to={`/quotes/${loadedQuotes.id}/comment`}
              >
                Comment
              </Link>
            </div>
          }
        />
        <Route path="comment" element={<Comments />} />
      </Routes>
    </React.Fragment>
  );
};

export default QuoteDetail;
