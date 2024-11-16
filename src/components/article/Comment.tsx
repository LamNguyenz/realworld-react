import { QUERY_COMMENTS_KEY } from "@/constants/query.constant";
import { IComment } from "@/interfaces/main";
import useInputs from "@/lib/hooks/useInputs";
import convertToDate from "@/lib/utils/convertToDate";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "@/queries/articles.query";
import queryClient from "@/queries/queryClient";
import { useGetUserQuery } from "@/queries/user.query";

interface CommentProps {
  comments: IComment[];
  slug: string;
}

const Comment = ({ comments, slug }: CommentProps) => {
  const { data: userInfo } = useGetUserQuery();
  const createCommentMutation = useCreateCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();
  const [newComment, onChangeNewComment, setNewComment] = useInputs({
    body: "",
  });

  const onPostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { body } = newComment;
    createCommentMutation.mutate(
      {
        slug,
        body,
      },
      {
        onSuccess: () => {
          setNewComment({
            body: "",
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_COMMENTS_KEY, slug],
          });
        },
      }
    );
  };

  const onDeleteComment = (slug: string, id: string) => {
    deleteCommentMutation.mutate(
      { slug, id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_COMMENTS_KEY, slug],
          });
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={onPostComment} className="card comment-form">
        <div className="card-block">
          <textarea
            name="body"
            value={newComment.body}
            onChange={onChangeNewComment}
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
          />
        </div>
        <div className="card-footer">
          <img src={userInfo?.image} className="comment-author-img object-cover" />
          <button type="submit" className="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
      {comments.map((comment) => (
        <div key={comment?.id} className="card">
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>
          <div className="card-footer">
            <a
              href={`/profile/${comment.author.username}`}
              className="comment-author">
              <img
                src={comment.author.image}
                className="comment-author-img object-cover"
              />
            </a>
            &nbsp;
            <a
              href={`/profile/${comment.author.username}`}
              className="comment-author">
              {comment.author.username}
            </a>
            <span className="date-posted">{convertToDate(comment.createdAt)}</span>
            {userInfo.username === comment.author.username && (
              <span className="mod-options">
                <i
                  className="ion-trash-a"
                  onClick={() => onDeleteComment(slug, comment.id)}></i>
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
export default Comment;
