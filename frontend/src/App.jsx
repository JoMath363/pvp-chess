import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Match from "./Pages/Match/Match.jsx";

const appRouter = createBrowserRouter([
  { 
    path: "/",
    element: <Home/>
  },
  { 
    path: "/match/:matchId",
    element: <Match/>
  },
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
