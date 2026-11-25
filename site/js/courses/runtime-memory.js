export const runtimeMemoryCourse = {
  id: "runtime-memory",
  title: "Runtime AI Agent Memory & Context Compaction",
  supportsModes: true,
  modes: {
    generic: {
      label: "Generic Blueprint",
      domainName: "Voice-to-Action Assistant",
      rawPayloadLabel: "raw speech transcript",
      conflictOld: '"lives in New York"',
      conflictNew: '"moved to San Francisco"',
      stage1Text: "Speech-to-Text converts audio into clean text before invoking an agent.",
      stage2Text: "Compacts history to ~92 summary tokens + ~40-word window; deterministic resolver turns 'next Wednesday at 3 PM' into an exact ISO date.",
      stage3Proposal: "Proposal Card: Schedule 'Design Review' on Wednesday at 3:00 PM (requires user click before writing to Calendar)."
    },
    casestudy: {
      label: "Sanitized Case Study",
      domainName: "Multi-Step Form Extraction Microservice",
      rawPayloadLabel: "verbose DOM & tool call trace",
      conflictOld: '"role: Junior Analyst (2022)"',
      conflictNew: '"role: Senior Engineer (2026)"',
      stage1Text: "DOM scraper strips script/style tags and extracts clean field descriptors with zero LLM tokens.",
      stage2Text: "Prunes prior step HTML noise, passing only compacted field state + deterministic schema normalization (date formats, enum codes).",
      stage3Proposal: "Read-Only Fill Plan: Populate 12 normalized profile fields on target portal (waits for user confirmation before final submit)."
    }
  },
  steps: [
    {
      id: "mem-tradeoffs",
      kicker: "Step 1 · Memory Trade-Offs",
      title: "Why Flat History & Naive RAG Break Over Time",
      lead: "Long-running agents fail in two ways: quadratic token bloat and conflicting facts across sessions. Click each memory architecture below to compare its trade-offs.",
      widget: "memory-tradeoffs",
      takeaway: "<strong>Key Insight:</strong> Naive vector RAG retrieves contradictory old and new chunks without knowing which is current. Managed stateful memory extracts, deduplicates, and overwrites stale facts asynchronously."
    },
    {
      id: "sliding-compaction",
      kicker: "Step 2 · Context Compaction",
      title: "Slash Prompt Tokens by 80%+ with Rolling Compaction",
      lead: "Drag the session slider from 5 to 50 turns and toggle between Raw Transcript and Rolling Compaction to see how token load stays flat.",
      widget: "compaction-slider",
      takeaway: "<strong>Key Insight:</strong> Combining a ~92-token rolling summary with a ~40-word sliding window eliminates 'lost in the middle' latency while preserving exact canonical facts."
    },
    {
      id: "safe-execution",
      kicker: "Step 3 · Safe Action Gate",
      title: "Deterministic Resolvers & Read-Only Approval Gates",
      lead: "Never let an LLM guess calendar math or mutate external systems unguarded. Walk through the 3-stage pipeline below and approve the proposed action.",
      widget: "approval-pipeline",
      takeaway: "<strong>Key Insight:</strong> Offload deterministic conversions (dates, enum mappings, schema normalization) to pure code, and keep the agent read-only until explicit user approval."
    },
    {
      id: "mem-mastery",
      kicker: "Step 4 · Mastery Check",
      title: "Verify Runtime Memory & Compaction Principles",
      lead: "Answer two quick checks to lock in how stateful memory and context compaction keep runtime agents fast and accurate.",
      widget: "memory-quiz",
      takeaway: "<strong>Module Complete!</strong> Switch modes in the top bar to compare how this pattern applies to voice assistants vs. form-extraction microservices."
    }
  ]
};
