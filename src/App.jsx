import { MantineProvider, createTheme } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Test</div>,
      },
    ],
  },
]);

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App() {
  return <MantineProvider theme={theme} defaultColorScheme="auto">
    <RouterProvider router={router} />
  </MantineProvider>;
}