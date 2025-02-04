import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle } from "../api";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Article from "./Article";
import CommentList from "./CommentList";
import Error from "./Error";

const SingleArticleView = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
        <Link to="/articles">BACK</Link>
      </>
    );
  }

  if (isError) {
    return <Error isError={isError} />;
  }

  return (
    <section id="single-article-view">
      <div id="article-column">
        <Article article={article} />
        <Link to="/articles">BACK</Link>
      </div>
      <div id="comments-column">
        <CommentList article_id={article_id} />
      </div>
    </section>
  );
};

export default SingleArticleView;
