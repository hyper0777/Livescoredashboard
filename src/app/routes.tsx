import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { LiveScores } from "./components/LiveScores";
import { Standings } from "./components/Standings";
import { MatchDetail } from "./components/MatchDetail";
import { LiveStreamsPage } from "./components/LiveStreamsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LiveScores },
      { path: "standings", Component: Standings },
      { path: "match/:id", Component: MatchDetail },
      { path: "streams", Component: LiveStreamsPage },
    ],
  },
]);