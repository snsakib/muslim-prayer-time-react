import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SearchForm from "./SearchForm";
import PrayerTimings from "./PrayerTimings";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <Header />
      <SearchForm />
      <PrayerTimings />
      <Footer />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
