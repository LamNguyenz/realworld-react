import { UNIT_PER_PAGE } from "@/constants";
import { IArticle } from "@/interfaces/main";
import Feed from "./Feed";

interface FeedListProps {
  articlesInfo: { articles: IArticle[]; articlesCount: number };
  page: number;
  setPage: (page: number) => void;
}

const FeedList = ({ articlesInfo, page, setPage }: FeedListProps) => {
  const { articles, articlesCount } = articlesInfo;

  const totalPages = Math.ceil(articlesCount / UNIT_PER_PAGE);

  return (
    <>
      {articles.length !== 0 ? (
        <>
          {articles.map((article) => (
            <Feed key={article.slug} article={article} />
          ))}
        </>
      ) : (
        <div>No articles are here...</div>
      )}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className="page-item">
              <a className="page-link" href="" onClick={() => setPage(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default FeedList;
