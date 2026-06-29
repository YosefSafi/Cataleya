import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { resolveQuery } from "@/lib/searchKnowledge";

export function useSearchEngine(query, filters) {
  const [state, setState] = useState({
    results: null,
    featuredSnippet: null,
    relatedSearches: [],
    aiAnswer: null,
    researchStudies: [],
    isLoading: false,
  });
  const abortRef = useRef(null);
  const aiCacheRef = useRef({});

  useEffect(() => {
    if (!query?.trim()) {
      setState({ results: null, featuredSnippet: null, relatedSearches: [], aiAnswer: null, isLoading: false });
      return;
    }

    // Instant local results
    const local = resolveQuery(query);
    setState(s => ({ ...s, results: local, isLoading: true, aiAnswer: null, researchStudies: [] }));

    // AI answer — debounced and cached
    const key = query.trim().toLowerCase();
    if (aiCacheRef.current[key]) {
      setState(s => ({ ...s, isLoading: false, ...aiCacheRef.current[key] }));
      return;
    }

    if (abortRef.current) clearTimeout(abortRef.current);
    abortRef.current = setTimeout(async () => {
      try {
        const ai = await base44.integrations.Core.InvokeLLM({
          prompt: buildAIPrompt(query),
          response_json_schema: {
            type: "object",
            properties: {
              featured_snippet: { type: "string" },
              direct_answer: { type: "string" },
              related_searches: { type: "array", items: { type: "string" } },
              intent: { type: "string", enum: ["peptide_info", "comparison", "goal_based", "how_to", "general"] },
              research_studies: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    authors: { type: "string" },
                    journal: { type: "string" },
                    year: { type: "string" },
                    summary: { type: "string" },
                    findings: { type: "string" },
                    peptides: { type: "array", items: { type: "string" } },
                    study_type: { type: "string" },
                    pubmed_url: { type: "string" },
                    doi: { type: "string" },
                  },
                  required: ["title", "summary", "findings", "peptides", "study_type"],
                },
              },
            },
            required: ["featured_snippet", "related_searches", "intent"],
          },
        });

        const aiResult = {
          featuredSnippet: ai.featured_snippet || null,
          aiAnswer: ai.direct_answer || null,
          relatedSearches: ai.related_searches?.slice(0, 6) || [],
          researchStudies: ai.research_studies || [],
        };

        aiCacheRef.current[key] = aiResult;
        setState(s => ({ ...s, isLoading: false, ...aiResult }));
      } catch {
        setState(s => ({ ...s, isLoading: false }));
      }
    }, 600);

    return () => clearTimeout(abortRef.current);
  }, [query]);

  return state;
}

function buildAIPrompt(query) {
  return `You are the AI search engine for Cattleya Labs, a research peptide portal. 
A user searched: "${query}"

Your knowledge base includes these research peptides: BPC-157 (cytoprotection, recovery), TB-500 (thymosin beta-4, soft tissue), Semaglutide (GLP-1, fat loss), Tirzepatide (GLP-1/GIP dual agonist), PT-141 (melanocortin, libido), CJC-1295 (GHRH analogue, growth hormone), Ipamorelin (selective GH secretagogue), IGF-1 LR3 (anabolic, muscle), GHRP-6 (ghrelin agonist, GH release), Selank (anxiolytic, cognitive), Semax (ACTH-derived, neuroprotective), Sermorelin (GHRH fragment, GH).

The site also has: Protocol Calculator (/protocol), COA Search (/coa), Research Hub (/research), Beginner's Guide (/guide), Glossary (/glossary), Wholesale (/wholesale), Supplies Guide (/supplies), FAQs (/faqs), Ambassador Program (/ambassador).

Return a JSON with:
1. "featured_snippet": A 1-2 sentence direct answer to the user's query. Be specific, educational, and reference the relevant peptide or page.
2. "direct_answer": (optional) A slightly longer 2-4 sentence educational paragraph if the question is complex.
3. "related_searches": Array of 6 related search queries the user might also want to explore, as natural phrases.
4. "intent": Classify as one of: "peptide_info", "comparison", "goal_based", "how_to", "general".
5. "research_studies": Array of up to 8 REAL published scientific studies directly relevant to the searched peptide(s) or topic. For each study include:
   - "title": Exact published paper title
   - "authors": First author et al. (e.g. "Sikiric P et al.")
   - "journal": Journal name (e.g. "Journal of Orthopaedic Research")
   - "year": Publication year as string (e.g. "2009")
   - "summary": 1-2 sentence plain-English summary of what the study investigated
   - "findings": 1-2 sentence description of key findings or outcomes
   - "peptides": Array of peptide names studied (e.g. ["BPC-157"])
   - "study_type": One of: "Animal Model", "Human RCT", "Human Clinical", "In Vitro", "Review", "Case Report", "Phase Trial"
   - "pubmed_url": Real PubMed URL if you know it (e.g. "https://pubmed.ncbi.nlm.nih.gov/PMID/"), otherwise omit
   - "doi": DOI string if known (e.g. "10.1002/jor.20615"), otherwise omit

IMPORTANT: Only include studies that are real, published, peer-reviewed papers. If you are unsure of the exact PMID or DOI, omit those fields rather than guessing. Do NOT fabricate citations.

Keep all answers research/educational in tone. Add a disclaimer: "For research purposes only. Not medical advice."`;
}