import { QUERY_ARTICLES_KEY } from "@/constants/query.constant";
import useInputs from "@/lib/hooks/useInputs";
import { useUpdateArticleMutation } from "@/queries/articles.query";
import queryClient from "@/queries/queryClient";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditArticlePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [articleData, onChangeArticleData, setArticleData] = useInputs({
    slug: state?.slug,
    title: state?.title,
    description: state?.description,
    body: state?.body,
    tagList: state?.tagList,
    tag: "",
  });

  const removeTag = (tag: string) => {
    setArticleData({
      ...articleData,
      tagList: articleData.tagList.filter((t: string) => t !== tag),
    });
  };

  const addTag = (newTag: string) => {
    setArticleData({
      ...articleData,
      tagList: [...articleData.tagList, newTag],
    });
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!articleData.tagList.includes(articleData.tag)) {
        addTag(articleData.tag);
      }
    }
  };

  const updateArticleMutation = useUpdateArticleMutation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateArticleMutation.mutate(articleData, {
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: [QUERY_ARTICLES_KEY] });
        toast.success("Article updated successfully");
        if (data?.data?.article?.slug) {
          navigate(`/article/${data?.data?.article?.slug}`);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(error: any) {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="title"
                    placeholder="Article Title"
                    value={articleData.title}
                    onChange={onChangeArticleData}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="What's this article about?"
                    value={articleData.description}
                    onChange={onChangeArticleData}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={articleData.body}
                    name="body"
                    onChange={onChangeArticleData}></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    name="tag"
                    value={articleData.tag}
                    onChange={onChangeArticleData}
                    onKeyDown={onEnter}
                  />
                </fieldset>
                <div className="tag-list">
                  {articleData.tagList.map((tag: string) => (
                    <span className="tag-default tag-pill" key={tag}>
                      <i
                        className="ion-close-round cursor-pointer mr-[5px]"
                        onClick={() => removeTag(tag)}
                      />{" "}
                      {tag}{" "}
                    </span>
                  ))}
                </div>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditArticlePage;
