import MethodArticleForm from "../method-article-form";
import { createMethodArticle } from "../actions";

export default function NewMethodArticlePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New method article</h1>
      <MethodArticleForm action={createMethodArticle} submitLabel="Create" />
    </div>
  );
}
