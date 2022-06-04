import { Navigate, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <React.Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" replace />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quoteId/*" element={<QuoteDetail />} />
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </Layout>
  );
}

export default App;
