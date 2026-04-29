import NewsFeedComponent from "../../imports/NewsFeed";
import { mockNewsArticles } from "../data/mockData";

export function NewsFeedPage() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <NewsFeedComponent articles={mockNewsArticles} />
    </div>
  );
}
