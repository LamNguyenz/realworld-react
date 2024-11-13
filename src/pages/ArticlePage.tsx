import ButtonSelector from "@/components/article/ButtonSelector";
import Comment from "@/components/article/Comment";
import { UserContext } from "@/context/UserContextProvider";
import convertToDate from "@/lib/utils/convertToDate";
import { useGetArticleQueries } from "@/queries/articles.query";
import { useContext } from "react";
import ReactMarkDown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

const ArticlePage = () => {
  const { slug = "" } = useParams();
  const [articleInfo] = useGetArticleQueries(slug);
  const { isLogin } = useContext(UserContext);

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{articleInfo.data?.title || "TITLE"}</h1>

          <div className="article-meta">
            <Link to={`/profile/${articleInfo.data?.author?.username}`}>
              <img src={articleInfo.data?.author?.image} alt="comment-author" />
            </Link>
            <div className="info">
              <Link
                to={`/profile/${articleInfo.data?.author?.username}`}
                className="author">
                {articleInfo.data?.author?.username}
              </Link>
              <span className="date">
                {convertToDate(articleInfo?.data?.updatedAt)}
              </span>
            </div>
            {isLogin ? <ButtonSelector articleInfo={articleInfo?.data} /> : <></>}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <ReactMarkDown remarkPlugins={[remarkGfm]}>
              {articleInfo.data?.body}
            </ReactMarkDown>
            <ul className="tag-list">
              {articleInfo.data?.tagList?.map((tag: string) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link to={`/profile/${articleInfo.data?.author?.username}`}>
              <img src={articleInfo.data?.author?.image} alt="comment-author" />
            </Link>
            <div className="info">
              <a href="" className="author">
                {articleInfo.data?.author?.username}
              </a>
              <span className="date">
                {convertToDate(articleInfo.data?.updatedAt)}
              </span>
            </div>
            {isLogin ? <ButtonSelector articleInfo={articleInfo?.data} /> : <></>}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <Comment comments={articleInfo.data?.comments || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
