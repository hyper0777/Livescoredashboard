import { createBrowserRouter } from "react-router";
import { Root } from "@/app/components/Root";
import { LiveScores } from "@/app/components/LiveScores";
import { Standings } from "@/app/components/Standings";
import { MatchDetail } from "@/app/components/MatchDetail";
import { LiveStreamsPage } from "@/app/components/LiveStreamsPage";
import { HighlightsPage } from "@/app/components/HighlightsPage";

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
    ],
  },
]);