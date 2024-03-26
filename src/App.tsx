import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authentication from "components/Authentication";
import Browse from "components/Browse";

const App: React.FC = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Authentication />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
