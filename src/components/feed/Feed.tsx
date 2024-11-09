import { IArticle } from "@/interfaces/main";
import convertToDate from "@/lib/utils/convertToDate";
import { Link } from "react-router-dom";

interface FeedProps {
  article: IArticle;
}

const Feed = ({ article }: FeedProps) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`} state={article.author.username}>
          <img src={article.author.image} alt="profile" />
        </Link>
        <div className="info">
          <Link to={`/profile/${article.author.username}`} state={article.author.username} className="author">
            {article.author.username}
          </Link>
          <span className="date">{convertToDate(article.createdAt)}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> 29
        </button>
      </div>
      <a href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </a>
    </div>
  );
};

export default Feed;
