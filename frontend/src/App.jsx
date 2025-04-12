import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  { 
    path: "/",
    element: <></>
  },
  { 
    path: "/home",
    element: <></>
  },
  { 
    path: "/login",
    element: <></>
  },
  { 
    path: "/match",
    element: <></>
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
