import { IComment } from "@/interfaces/main";
import convertToDate from "@/lib/utils/convertToDate";

interface CommentProps {
  comments: IComment[];
}

const Comment = ({ comments }: CommentProps) => {
  return (
    <>
      <form className="card comment-form">
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
          />
        </div>
        <div className="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
          <button className="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>
      {comments.map((comment, index) => (
        <div key={index} className="card">
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>
          <div className="card-footer">
            <a
              href={`/profile/${comment.author.username}`}
              className="comment-author">
              <img src={comment.author.image} className="comment-author-img" />
            </a>
            &nbsp;
            <a
              href={`/profile/${comment.author.username}`}
              className="comment-author">
              {comment.author.username}
            </a>
            <span className="date-posted">{convertToDate(comment.createdAt)}</span>
          </div>
        </div>
      ))}
    </>
  );
};
export default Comment;
