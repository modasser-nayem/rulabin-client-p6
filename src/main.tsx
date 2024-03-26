import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate
            loading={null}
            persistor={persistor}
         >
            <RouterProvider router={router} />
         </PersistGate>
      </Provider>
      <Toaster
         richColors={true}
         position="top-center"
         visibleToasts={1}
      />
   </React.StrictMode>
);
