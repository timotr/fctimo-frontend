import { MantineProvider, createTheme } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout';
import PlayersList from './components/PlayersList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Training</div>,
      },
      {
        path: "/players",
        element: <PlayersList />,
      },
      {
        path: "/groups",
        element: <div>Groups</div>,
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