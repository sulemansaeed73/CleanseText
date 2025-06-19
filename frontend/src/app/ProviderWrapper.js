"use client";
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
function ProviderWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ProviderWrapper;
