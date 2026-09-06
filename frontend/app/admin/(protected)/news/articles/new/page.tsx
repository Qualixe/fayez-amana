import { NEWS_CATEGORIES } from "@/lib/db/news";
import { createArticle } from "../actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New article</h1>
      <p className="max-w-lg text-sm text-dust">
        Pick a slug and category to start. You&apos;ll fill in the title, body, FAQs and related content on the next screen.
      </p>
      <form action={createArticle} className="flex max-w-md flex-col gap-4">
        <label className={labelClasses}>
          Slug (url-safe, e.g. turnkey-construction-explained)
          <input name="slug" required pattern="[a-z0-9-]+" className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Category
          <select name="category" required defaultValue={NEWS_CATEGORIES[0]} className={fieldClasses}>
            {NEWS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Create
        </button>
      </form>
    </div>
  );
}
