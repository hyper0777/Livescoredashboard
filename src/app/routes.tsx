import { createBrowserRouter } from "react-router";
import { Root } from "./imports/Root";
import { LiveScores } from "./components/LiveScores";
import { Standings } from "./components/Standings";
import { MatchDetail } from "./components/MatchDetail";
import { LiveStreamsPage } from "./components/LiveStreamsPage";
import { HighlightsPage } from "./components/HighlightsPage";
import { NewsFeedPage } from "./components/NewsFeedPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LiveScores },
      { path: "standings", Component: Standings },
      { path: "match/:id", Component: MatchDetail },
      { path: "streams", Component: LiveStreamsPage },
      { path: "highlights", Component: HighlightsPage },
      { path: "newsfeed", Component: NewsFeedPage },
    ],
  },
]);
