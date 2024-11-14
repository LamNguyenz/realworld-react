import useInputs from "@/lib/hooks/useInputs";
import { useLocation, useParams } from "react-router-dom";

const EditArticlePage = () => {
  const { state } = useLocation();

  const [articleData, onChangeArticleData, setArticleData] = useInputs({
	});

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
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
                    // onKeyDown={onEnter}
                  />
                </fieldset>
                <div className="tag-list">
                  {articleData.tagList.map((tag: string) => (
                    <span className="tag-default tag-pill" key={tag}>
                      <i
                        className="ion-close-round cursor-pointer mr-[5px]"
                        // onClick={() => removeTag(tag)}
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
