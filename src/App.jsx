import { MantineProvider, createTheme } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout';
import PlayersList from './components/views/PlayersList';
import { SWRConfig } from 'swr';
import PlayersEdit from './components/views/PlayersEdit';

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
        path: "/players/:id",
        element: <PlayersEdit />,
      },
      {
        path: "/teams",
        element: <div>Teams</div>,
      },
    ],
  },
]);

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App() {
  return <MantineProvider theme={theme} defaultColorScheme="auto">
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  </MantineProvider>;
}