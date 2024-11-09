import useInputs from "@/lib/hooks/useInputs";
import { useCreateArticleMutation } from "@/queries/articles.query";
import { toast } from "react-toastify";

const NewArticlePage = () => {
  const defaultArticleState = {
    title: "",
    description: "",
    body: "",
    tag: "",
    tagList: [],
  } as const;

  const [articleData, onChangeArticleData, setArticleData] = useInputs(defaultArticleState);

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!articleData.tagList.includes(articleData.tag)) {
        addTag(articleData.tag);
      }
    }
  };

  const addTag = (newTag: string) => {
    if (newTag.trim() === "") return;
    setArticleData({
      ...articleData,
      tag: "",
      tagList: [...articleData.tagList, newTag],
    });
  };

  const removeTag = (target: string) => {
    setArticleData({
      ...articleData,
      tagList: articleData.tagList.filter((tag: string) => tag !== target),
    });
  };

  const createArticleMutation = useCreateArticleMutation();

  function onPublish(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const { title, description, body, tagList } = articleData;
    createArticleMutation.mutate(
      { title, description, body, tagList },
      {
        onSuccess: () => {
          toast.success("Article created successfully");
          setArticleData(defaultArticleState);
        },
      }
    );
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={onPublish}>
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
                      <i className="ion-close-round cursor-pointer mr-[5px]" onClick={() => removeTag(tag)} /> {tag}{" "}
                    </span>
                  ))}
                </div>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
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

export default NewArticlePage;
