"use client";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { persistor, store } from "./store"; // Importing  Redux store
import { Provider } from "react-redux";

function ReduxConnector({ Children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {Children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxConnector;
