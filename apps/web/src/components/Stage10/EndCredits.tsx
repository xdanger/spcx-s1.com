"use client";

import { useMemo, useState } from "react";
import type { ContentNode } from "@spcx/content";

import { SourceRef } from "../SourceRef";

interface EndCreditsProps {
  authored: ContentNode[];
  caveat: ContentNode;
  glossary: ContentNode[];
}

export const EndCredits = ({ authored, caveat, glossary }: EndCreditsProps) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredGlossary = useMemo(() => {
    if (!normalizedQuery) {
      return glossary;
    }

    return glossary.filter((node) => {
      const term = node.glossary?.term.toLowerCase() ?? "";
      const definition = node.text.en.toLowerCase();

      return term.includes(normalizedQuery) || definition.includes(normalizedQuery);
    });
  }, [glossary, normalizedQuery]);

  return (
    <section id="stage-10" aria-labelledby="stage-10-title" className="min-h-screen px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <p className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-teal">
            Stage 10
          </p>
          <h2 id="stage-10-title" className="mt-4 text-4xl font-semibold">
            End Credits
          </h2>
          <div className="mt-8 space-y-4 text-muted-white">
            {authored.map((node) => (
              <p key={node.id}>
                {node.tags?.includes("github") ? (
                  <a
                    className="text-body-white underline decoration-accent-teal underline-offset-4"
                    href="https://github.com/xdanger/spcx-s1.com"
                  >
                    {node.text.en}
                  </a>
                ) : node.tags?.includes("contact") ? (
                  <a
                    className="text-body-white underline decoration-accent-teal underline-offset-4"
                    href="mailto:y@dai.co"
                  >
                    {node.text.en}
                  </a>
                ) : (
                  node.text.en
                )}
              </p>
            ))}
          </div>

          <article className="mt-12 border-l border-accent-amber pl-5">
            <h3 className="text-xl font-semibold">Forward-Looking Statements</h3>
            <pre className="mt-4 whitespace-pre-wrap font-body text-sm leading-7 text-muted-white">
              {caveat.text.en}
            </pre>
            <SourceRef source={caveat.source} />
          </article>
        </div>

        <div>
          <label
            htmlFor="glossary-search"
            className="font-telemetry text-xs uppercase tracking-[0.16em] text-muted-white"
          >
            Glossary Search
          </label>
          <input
            id="glossary-search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            className="mt-3 w-full border border-white/20 bg-space-black px-3 py-3 text-body-white"
            type="search"
            autoComplete="off"
          />
          <div className="mt-6 max-h-[70vh] space-y-5 overflow-auto pr-2">
            {filteredGlossary.map((node) => (
              <article key={node.id} className="border-t border-white/15 pt-4">
                <h3 className="text-lg font-semibold">{node.glossary?.term}</h3>
                <p className="mt-2 whitespace-pre-wrap text-sm text-muted-white">
                  {node.text.en}
                </p>
                <SourceRef source={node.source} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
