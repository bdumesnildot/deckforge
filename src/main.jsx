import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/error-page";

import HeroesSelectionPage from "./pages/HeroesSelectionPage";
import DeckBuilderPage from "./pages/DeckBuilderPage";
import MyDeckPage from "./pages/MyDeckPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "heroes-selection/",
        element: <HeroesSelectionPage />,
      },
      {
        path: "deck-builder/",
        element: <DeckBuilderPage />,
      },
      {
        path: "deck/",
        element: <MyDeckPage />,
      },
      {
        path: "about-us/",
        element: <AboutUsPage />,
      },
      {
        path: "Contact/",
        element: <ContactPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
