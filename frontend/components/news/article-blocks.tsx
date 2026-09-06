import Reveal from "@/components/reveal";
import type { ArticleBlock } from "@/lib/db/news";
import { getStages, getStageCategories, stageTitle, stageBody } from "@/lib/db/process";
import { slugify } from "@/lib/news-shared";
import type { Locale } from "@/lib/locale";

async function ProcessStagesBlock({ locale }: { locale: Locale }) {
  const [stages, categories] = await Promise.all([getStages(), getStageCategories()]);

  return (
    <div className="flex flex-col gap-10">
      {categories.map((category) => {
        const stagesInGroup = stages.filter((s) => s.no >= category.from && s.no <= category.to);
        return (
          <div key={category.key} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-bone">{locale === "ar" ? category.labelAr : category.label}</h3>
            <ol className="flex flex-col gap-4">
              {stagesInGroup.map((stage) => (
                <li key={stage.no} className="flex gap-4 border-t-[0.5px] border-steel pt-4">
                  <span className="font-mono text-[0.6875rem] tabular-nums text-azure-glow">
                    {String(stage.no).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-bone">{stageTitle(stage, locale)}</h4>
                    <p className="text-sm leading-relaxed text-dust">{stageBody(stage, locale)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

export default function ArticleBlocks({ blocks, locale }: { blocks: ArticleBlock[]; locale: Locale }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        const delay = Math.min(index * 40, 400);
        switch (block.type) {
          case "heading":
            return (
              <Reveal
                key={index}
                tag="h2"
                delay={delay}
                id={slugify(block.text)}
                className="mt-6 scroll-mt-28 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-bone first:mt-0"
              >
                {block.text}
              </Reveal>
            );
          case "paragraph":
            return (
              <Reveal key={index} tag="p" delay={delay} className="text-[1.0625rem] leading-relaxed text-dust">
                {block.text}
              </Reveal>
            );
          case "bullets":
            return (
              <Reveal key={index} tag="ul" delay={delay} className="flex flex-col gap-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-dust">
                    <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-azure-glow" />
                    {item}
                  </li>
                ))}
              </Reveal>
            );
          case "steps":
            return (
              <Reveal key={index} tag="ol" delay={delay} className="flex flex-col gap-5">
                {block.items.map((item, i) => (
                  <li key={item.title} className="flex gap-4 border-t-[0.5px] border-steel pt-5 first:border-t-0 first:pt-0">
                    <span className="font-mono text-[0.6875rem] tabular-nums text-azure-glow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="font-medium text-bone">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-dust">{item.body}</p>
                    </div>
                  </li>
                ))}
              </Reveal>
            );
          case "callout": {
            const isIntro = index === 0;
            return (
              <Reveal
                key={index}
                tag="div"
                delay={delay}
                className={`border-s-2 border-azure bg-ink p-6 sm:p-8 ${isIntro ? "mb-6" : ""}`}
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-azure-glow">
                  {block.title}
                </p>
                <p className={isIntro ? "mt-4 text-[1.0625rem] leading-relaxed text-bone/90" : "mt-2 text-sm leading-relaxed text-dust"}>
                  {block.body}
                </p>
              </Reveal>
            );
          }
          case "table":
            return (
              <Reveal key={index} tag="div" delay={delay} className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-start text-sm">
                  <thead>
                    <tr className="border-b border-steel font-mono text-[10px] uppercase tracking-[0.15em] text-dust">
                      {block.headers.map((h) => (
                        <th key={h} className="py-2 pe-4 text-start font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i} className="border-b border-steel/60">
                        {row.map((cell, j) => (
                          <td key={j} className="py-3 pe-4 align-top text-dust first:text-bone">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            );
          case "process_stages":
            return <ProcessStagesBlock key={index} locale={locale} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
