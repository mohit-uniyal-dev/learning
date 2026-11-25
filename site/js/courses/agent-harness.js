export const agentHarnessCourse = {
  id: "agent-harness",
  title: "4-Layer Production AI Agent Harness",
  supportsModes: true,
  modes: {
    generic: {
      label: "Generic Blueprint",
      repos: ["core-api", "web-client", "ai-worker", "browser-ext"],
      harnessRepo: "workspace-harness",
      endpointExample: "POST /api/v1/tasks/validate",
      skillNames: ["dom-automation", "api-contract", "ext-release"],
      memoryFiles: ["ACTIVE_PLAN.md", "DECISIONS_AND_GOTCHAS.md", "BACKLOG_INDEX.md"]
    },
    casestudy: {
      label: "Sanitized Case Study",
      repos: ["Platform-API", "Web-Portal", "AI-Extractor", "Form-Agent-Ext"],
      harnessRepo: "Workspace-Harness",
      endpointExample: "POST /api/v1/items/unmap",
      skillNames: ["portal-form-recipe", "cross-repo-contract", "extension-release"],
      memoryFiles: ["ACTIVE_PLAN.md", "DECISIONS_AND_GOTCHAS.md", "BACKLOG_INDEX.md"]
    }
  },
  steps: [
    {
      id: "why-harness",
      kicker: "Step 1 · The Core Problem",
      title: "Why Raw AI Agents Need a Code Harness",
      lead: "Large Language Models are probabilistic—given the exact same prompt three times, they can skip tests, leak secrets, or break contracts. Click below to run an unguarded AI agent three times.",
      widget: "raw-llm-sim",
      takeaway: "<strong>Key Insight:</strong> You cannot fix probabilistic drift with longer prompts alone. Wrapping the model in deterministic code gates guarantees repeatable engineering quality."
    },
    {
      id: "four-layers",
      kicker: "Step 2 · Architecture Map",
      title: "Wrapping the Model in 4 Deterministic Layers",
      lead: "Instead of trusting one giant prompt, a production harness surrounds the LLM with four focused boundaries. Click each ring to inspect its job.",
      widget: "concentric-layers",
      takeaway: "<strong>Key Insight:</strong> Each layer catches a different failure mode—token bloat (Layer 1), broken code or secrets (Layer 2), blind spots (Layer 3), and regressions (Layer 4)."
    },
    {
      id: "layer-1",
      kicker: "Step 3 · Layer 1 (Learn)",
      title: "Keep Context Lean with 3-Stage Progressive Disclosure",
      lead: "Dumping every architecture manual into the prompt wastes tokens and confuses the model. Toggle between dumping all docs vs. progressive disclosure.",
      widget: "token-disclosure",
      takeaway: "<strong>Key Insight:</strong> Keep root <code>AGENTS.md</code> under 100 lines, consolidate facts in <code>.agent-memory/</code> (superseding stale entries), and load domain skills only when triggered."
    },
    {
      id: "layer-2",
      kicker: "Step 4 · Layer 2 (Guide)",
      title: "Catch Mistakes Before Code Ships (Zero Tokens)",
      lead: "Pre-commit and pre-push hooks run local compilers, linters, and link checkers instantly. Pick a mistake below and test the deterministic gate.",
      widget: "gate-puzzle",
      takeaway: "<strong>Key Insight:</strong> Deterministic scripts (<code>verify:quick</code>, <code>pre-push-gate.sh</code>, and <code>check-docs.mjs</code>) block secrets, <code>.skip</code> tests, and broken doc links with zero LLM cost."
    },
    {
      id: "layer-3",
      kicker: "Step 5 · Layer 3 (Review)",
      title: "Separate Code Authoring from Code Critique",
      lead: "An agent that just wrote a patch often overlooks its own edge cases. Compare same-session self-review with a fresh-context reviewer + headless visual QA.",
      widget: "reviewer-compare",
      takeaway: "<strong>Key Insight:</strong> <code>prepare-review.sh</code> redacts secrets into a clean diff bundle, while <code>visual-qa.mjs</code> captures desktop (1440×900) and mobile (420×800) screenshots over CDP."
    },
    {
      id: "layer-4",
      kicker: "Step 6 · Layer 4 (Score)",
      title: "Benchmark Harness Changes in ~255ms",
      lead: "Before upgrading models or editing prompts, run the offline evaluation suite across 4 core patterns to guarantee zero regressions.",
      widget: "eval-bench",
      takeaway: "<strong>Key Insight:</strong> Layer 4 caught a real production bug where malformed payloads returned HTTP 500 instead of HTTP 400—proving the harness improves itself over time."
    },
    {
      id: "mastery-check",
      kicker: "Step 7 · Mastery Check & Blueprint",
      title: "Verify Your Understanding & Take the Blueprint",
      lead: "Answer two quick questions to lock in the 4-layer workflow, then grab the copy-pasteable starter prompt.",
      widget: "quiz-blueprint",
      takeaway: "<strong>You're ready!</strong> Use the restart button below to replay any step or switch between Generic Blueprint and Sanitized Case Study modes."
    }
  ]
};
