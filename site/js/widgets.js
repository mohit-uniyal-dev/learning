/**
 * Reusable Interactive Widget Renderers
 * Each renderer receives (container, step, ctx, helpers).
 */
export const WidgetRenderers = {
  /* ========================================================================
     COURSE 1 WIDGETS: 4-Layer Production AI Agent Harness
     ======================================================================== */
  "raw-llm-sim": (container, step, ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { runs: [] });
    const outcomes = [
      {
        attempt: "Run #1",
        status: "pill-warn",
        badge: "Skipped Tests",
        detail: `Edited ${ctx.repos[0]} handler for ${ctx.endpointExample}, but forgot to add unit tests.`
      },
      {
        attempt: "Run #2",
        status: "pill-fail",
        badge: "Secret Risk",
        detail: `Hardcoded a test API token inside ${ctx.repos[3]} config instead of reading .env.`
      },
      {
        attempt: "Run #3",
        status: "pill-pass",
        badge: "Passed (By Luck)",
        detail: "Wrote clean code and tests—but without a harness, there is no guarantee Run #4 won't regress."
      }
    ];

    const nextIdx = s.runs.length;
    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">Prompt: "Add input validation to ${ctx.endpointExample}"</span>
          <div class="btn-group">
            <button id="runRawBtn" class="btn btn-primary btn-sm" ${nextIdx >= 3 ? "disabled" : ""}>
              ${nextIdx < 3 ? `▶ Run Raw LLM (${nextIdx}/3)` : "✓ All 3 Runs Completed"}
            </button>
            ${nextIdx > 0 ? `<button id="resetRawBtn" class="btn btn-sm">↺ Clear</button>` : ""}
          </div>
        </div>
        <div class="run-feed">
          ${s.runs.length === 0 ? `<div class="muted-text">Click <strong>Run Raw LLM</strong> to observe probabilistic variance across identical prompts.</div>` : ""}
          ${s.runs.map((r) => `
            <div class="run-item">
              <div><strong>${r.attempt}:</strong> ${r.detail}</div>
              <span class="pill ${r.status}">${r.badge}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    const runBtn = container.querySelector("#runRawBtn");
    if (runBtn) {
      runBtn.onclick = () => {
        if (s.runs.length < 3) {
          s.runs.push(outcomes[s.runs.length]);
          render();
        }
      };
    }
    const resetBtn = container.querySelector("#resetRawBtn");
    if (resetBtn) {
      resetBtn.onclick = () => {
        s.runs = [];
        render();
      };
    }
  },

  "concentric-layers": (container, step, ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { selected: 1 });
    const layers = [
      {
        num: 1,
        name: "Layer 1 · Learn (Context & Memory)",
        color: "var(--accent-primary)",
        summary: `Loads compact AGENTS.md maps across ${ctx.repos.join(", ")}, reads ${ctx.memoryFiles.join(", ")}, and activates skills (${ctx.skillNames.join(", ")}) progressively.`
      },
      {
        num: 2,
        name: "Layer 2 · Guide (Fast Guardrails & Gates)",
        color: "var(--success)",
        summary: "Runs zero-token typechecks, linters, unit tests, secret scanners, .skip blockers, and check-docs.mjs link validation—capping self-correction at 3 retries."
      },
      {
        num: 3,
        name: "Layer 3 · Review (Independent Critique & Visual QA)",
        color: "var(--warning)",
        summary: "Generates a redacted diff bundle (prepare-review.sh), triggers a fresh-context reviewer agent, and captures desktop & mobile CDP screenshots (visual-qa.mjs)."
      },
      {
        num: 4,
        name: "Layer 4 · Score (Offline Eval Bench)",
        color: "var(--purple)",
        summary: "Executes 39 deterministic benchmark tests across Tool Use, Non-Determinism, Multi-Turn State, and Workflow Handoffs in ~255ms."
      }
    ];

    const active = layers.find((l) => l.num === s.selected) || layers[0];
    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">Click any concentric ring to inspect</span>
          <div class="btn-group">
            ${layers.map((l) => `
              <button class="btn btn-sm ${l.num === s.selected ? "btn-primary" : ""}" data-ring="${l.num}">
                Layer ${l.num}
              </button>
            `).join("")}
          </div>
        </div>
        <div class="rings-layout">
          <svg class="ring-svg" viewBox="0 0 240 240" width="230" height="230">
            <circle class="ring-circle" data-ring="4" cx="120" cy="120" r="110" fill="${s.selected === 4 ? "var(--purple-soft)" : "var(--bg-page)"}" stroke="var(--purple)" stroke-width="${s.selected === 4 ? 4 : 2}" />
            <circle class="ring-circle" data-ring="3" cx="120" cy="120" r="85" fill="${s.selected === 3 ? "var(--warning-soft)" : "var(--bg-card)"}" stroke="var(--warning)" stroke-width="${s.selected === 3 ? 4 : 2}" />
            <circle class="ring-circle" data-ring="2" cx="120" cy="120" r="60" fill="${s.selected === 2 ? "var(--success-soft)" : "var(--bg-page)"}" stroke="var(--success)" stroke-width="${s.selected === 2 ? 4 : 2}" />
            <circle class="ring-circle" data-ring="1" cx="120" cy="120" r="36" fill="${s.selected === 1 ? "var(--accent-soft)" : "var(--bg-card)"}" stroke="var(--accent-primary)" stroke-width="${s.selected === 1 ? 4 : 2}" />
            <circle cx="120" cy="120" r="17" fill="var(--bg-terminal)" />
            <text x="120" y="124" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700">LLM</text>
          </svg>
          <div class="ring-detail-card">
            <div class="ring-kicker" style="color:${active.color};">Active Boundary</div>
            <div class="ring-heading">${active.name}</div>
            <p class="muted-text">${active.summary}</p>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-ring]").forEach((el) => {
      el.onclick = () => {
        s.selected = Number(el.getAttribute("data-ring"));
        render();
      };
    });
  },

  "token-disclosure": (container, step, ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { progressive: true });
    const tokens = s.progressive ? 1200 : 18500;
    const pct = Math.round((tokens / 20000) * 100);

    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">Context Window Budget</span>
          <div class="btn-group">
            <button id="dumpBtn" class="btn btn-sm ${!s.progressive ? "btn-primary" : ""}">Dump All Docs</button>
            <button id="progBtn" class="btn btn-sm ${s.progressive ? "btn-primary" : ""}">3-Stage Progressive</button>
          </div>
        </div>
        <div class="meter-header">
          <span>Prompt Context Load</span>
          <span style="color:${s.progressive ? "var(--success)" : "var(--danger)"};">${tokens.toLocaleString()} tokens (${pct}%)</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill" style="width:${pct}%; background:${s.progressive ? "var(--success)" : "var(--danger)"};"></div>
        </div>
        <div class="stage-pills">
          <div class="stage-chip">
            <strong>Stage 1 · Discovery</strong><br/>
            <span class="muted-text">Reads root <code>AGENTS.md</code> (&lt;100 lines) + skill names only (~350 tokens).</span>
          </div>
          <div class="stage-chip">
            <strong>Stage 2 · Activation</strong><br/>
            <span class="muted-text">Loads only <code>${ctx.skillNames[1]}/SKILL.md</code> when task matches (~550 tokens).</span>
          </div>
          <div class="stage-chip">
            <strong>Stage 3 · Execution</strong><br/>
            <span class="muted-text">Reads <code>${ctx.memoryFiles[0]}</code> &amp; runs helper scripts (~300 tokens).</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector("#dumpBtn").onclick = () => { s.progressive = false; render(); };
    container.querySelector("#progBtn").onclick = () => { s.progressive = true; render(); };
  },

  "gate-puzzle": (container, step, _ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { fault: "secret" });
    const faults = [
      {
        id: "secret",
        title: "Inject .env Secret",
        desc: "Stage an API key inside ENV/ or .env",
        log: `[pre-commit-gate] BLOCKED: Secret pattern or protected path (.env / Key/) detected.
Action: Commit aborted (0 LLM tokens spent). Move secret to gitignored .env.`
      },
      {
        id: "skip",
        title: "Add it.skip() to Test",
        desc: "Bypass a failing unit test with .skip",
        log: `[pre-commit-gate] BLOCKED: Test-evasion annotation (.skip / xit) detected in diff.
Action: Commit aborted. Fix the failing assertion instead of skipping tests.`
      },
      {
        id: "broken-doc",
        title: "Break a Markdown Link",
        desc: "Rename a file without updating docs/",
        log: `[check-docs.mjs] BLOCKED on pre-push: docs/API.md:42 -> missing target ./old-schema.md
Action: Push rejected. Update the broken link or add <!-- check-docs:ignore -->.`
      },
      {
        id: "compile-err",
        title: "TypeScript Type Mismatch",
        desc: "Return string instead of HTTP 400 DTO",
        log: `[verify:quick] FAILED (Attempt 1/3): TS2322 Type 'string' is not assignable to type 'ErrorResponse'.
Action: Raw compiler log fed back to agent for bounded self-correction (max 3 tries).`
      },
      {
        id: "clean",
        title: "Clean Commit & Push",
        desc: "Valid types, passing tests, valid doc links",
        log: `[verify:quick] PASS (1.9s) -> [check-docs.mjs] 95 files, 0 missing -> [npm run verify] PASS.
Action: Ready for Layer 3 fresh-context review!`
      }
    ];

    const active = faults.find((f) => f.id === s.fault) || faults[0];
    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">Select a scenario to test Layer 2 hooks</span>
          <span class="pill ${s.fault === "clean" ? "pill-pass" : s.fault === "compile-err" ? "pill-warn" : "pill-fail"}">
            ${s.fault === "clean" ? "Gate Passed" : s.fault === "compile-err" ? "Bounded Retry (1/3)" : "Gate Blocked"}
          </span>
        </div>
        <div class="fault-grid">
          ${faults.map((f) => `
            <button class="fault-btn ${f.id === s.fault ? "selected" : ""}" data-fault="${f.id}">
              <div class="fault-title">${f.title}</div>
              <div class="fault-desc">${f.desc}</div>
            </button>
          `).join("")}
        </div>
        <div class="terminal-box">${active.log}</div>
      </div>
    `;

    container.querySelectorAll("[data-fault]").forEach((btn) => {
      btn.onclick = () => {
        s.fault = btn.getAttribute("data-fault");
        render();
      };
    });
  },

  "reviewer-compare": (container, step, ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { freshContext: true });
    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">Review Strategy</span>
          <div class="btn-group">
            <button id="sameBtn" class="btn btn-sm ${!s.freshContext ? "btn-primary" : ""}">Same-Session Self-Review</button>
            <button id="freshBtn" class="btn btn-sm ${s.freshContext ? "btn-primary" : ""}">Fresh-Context + Visual QA</button>
          </div>
        </div>
        ${!s.freshContext ? `
          <div class="run-item run-item--warn">
            <div>
              <strong>Confirmation Bias Warning:</strong> The same context window still holds its original assumptions—approving its own missing mobile breakpoint and undocumented route change in <code>${ctx.repos[1]}</code>.
            </div>
            <span class="pill pill-warn">High Blind-Spot Risk</span>
          </div>
        ` : `
          <div class="run-item run-item--pass">
            <div>
              <strong>Decoupled Critique + CDP Screenshots:</strong> A clean session evaluates <code>latest-review-bundle.md</code> against <code>review-rubric.md</code> (including §H Doc &amp; Contract Freshness), while <code>visual-qa.mjs</code> inspects live viewports.
            </div>
            <span class="pill pill-pass">APPROVE Verified</span>
          </div>
          <div class="viewport-grid">
            <div class="viewport-mock">
              <div class="viewport-bar"><span>Desktop Capture · 1440×900</span><span style="color:var(--success);">0 Console Errors</span></div>
              <div class="viewport-canvas">${ctx.repos[1]} · Validation Banner &amp; Grid Aligned</div>
            </div>
            <div class="viewport-mock">
              <div class="viewport-bar"><span>Mobile · 420×800</span><span style="color:var(--success);">No Overflow</span></div>
              <div class="viewport-canvas">Stacked Card OK</div>
            </div>
          </div>
        `}
      </div>
    `;

    container.querySelector("#sameBtn").onclick = () => { s.freshContext = false; render(); };
    container.querySelector("#freshBtn").onclick = () => { s.freshContext = true; render(); };
  },

  "eval-bench": (container, step, ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { completedCount: 0 });
    const suites = [
      { name: "01-tool-use.eval.mjs", pattern: "Pattern 1 · Tool Use & Gate Regex", count: 14 },
      { name: "02-nondeterminism.eval.mjs", pattern: "Pattern 2 · Rubric Trajectory Scoring", count: 8 },
      { name: "03-multiturn-state.eval.mjs", pattern: "Pattern 3 · Memory & Session Persistence", count: 9 },
      { name: "04-workflow-handoff.eval.mjs", pattern: `Pattern 4 · ${ctx.repos[3]} → ${ctx.repos[0]} → ${ctx.repos[2]}`, count: 8 }
    ];

    const totalPassed = suites.slice(0, s.completedCount).reduce((acc, x) => acc + x.count, 0);

    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">.agent-harness/run-evals.sh (${totalPassed}/39 Passed)</span>
          <button id="runEvalBtn" class="btn btn-primary btn-sm">
            ${s.completedCount === 4 ? "↻ Re-run All 39 Evals" : "▶ Run Benchmark Suite"}
          </button>
        </div>
        ${suites.map((suite, i) => {
          const done = i < s.completedCount;
          return `
            <div class="eval-row">
              <div>
                <strong>${suite.name}</strong>
                <div class="fault-desc">${suite.pattern}</div>
              </div>
              <span class="pill ${done ? "pill-pass" : "pill-warn"}">
                ${done ? `✓ ${suite.count}/${suite.count} Pass` : `${suite.count} Tests Ready`}
              </span>
            </div>
          `;
        }).join("")}
        ${s.completedCount === 4 ? `<div class="eval-summary">All 39/39 evaluation tests passed in 254ms.</div>` : ""}
      </div>
    `;

    container.querySelector("#runEvalBtn").onclick = () => {
      s.completedCount = 0;
      render();
      let idx = 0;
      const timer = setInterval(() => {
        idx++;
        s.completedCount = idx;
        render();
        if (idx >= 4) clearInterval(timer);
      }, 160);
    };
  },

  "quiz-blueprint": (container, step, ctx, { getStepState, render, resetCourseState }) => {
    const s = getStepState(step.id, { q1: null, q2: null });
    const starterPrompt = `You are executing Workflow 1 in the ${ctx.harnessRepo} workspace.
1. Read AGENTS.md, ${ctx.memoryFiles.join(", ")}, and activate only required skills (${ctx.skillNames.join(", ")}).
2. Follow Red-Green-Refactor TDD and run npm run verify:quick / npm run verify (max 3 retries).
3. Run .agent-harness/prepare-review.sh and request a fresh-context Layer 3 review before committing.`;

    container.innerHTML = `
      <div class="sim-box">
        <div class="quiz-block">
          <div class="quiz-q">1. Why does Layer 3 require a fresh context window for code review?</div>
          ${[
            { idx: 0, text: "To avoid confirmation bias from the session that wrote the code", ok: true },
            { idx: 1, text: "Because Git hooks cannot run TypeScript checks", ok: false }
          ].map((opt) => `
            <button class="quiz-option ${s.q1 === opt.idx ? (opt.ok ? "correct" : "wrong") : ""}" data-q="q1" data-idx="${opt.idx}">
              ${opt.text}
            </button>
          `).join("")}
        </div>

        <div class="quiz-block quiz-block--last">
          <div class="quiz-q">2. How does Layer 2 keep documentation links from going stale?</div>
          ${[
            { idx: 0, text: "Asking the LLM to re-read every Markdown file on every prompt", ok: false },
            { idx: 1, text: "Running check-docs.mjs on pre-push + §H Doc Freshness in review", ok: true }
          ].map((opt) => `
            <button class="quiz-option ${s.q2 === opt.idx ? (opt.ok ? "correct" : "wrong") : ""}" data-q="q2" data-idx="${opt.idx}">
              ${opt.text}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="mastery-bar">
        <button id="restartLessonBtn" class="btn btn-primary">↺ Restart Full Lesson</button>
        <span class="muted-text">
          ${s.q1 === 0 && s.q2 === 1 ? "★ Mastery Complete! Both checks passed." : "Answer both questions above to complete mastery check."}
        </span>
      </div>

      <details class="cheatsheet" open>
        <summary>Take-Home Starter Prompt (${ctx.label})</summary>
        <div class="code-copy-wrap">
          <button class="copy-btn" id="copyPromptBtn">Copy</button>
          <div class="terminal-box" id="starterPromptText">${starterPrompt}</div>
        </div>
      </details>
    `;

    container.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.onclick = () => {
        const q = btn.getAttribute("data-q");
        s[q] = Number(btn.getAttribute("data-idx"));
        render();
      };
    });

    container.querySelector("#restartLessonBtn").onclick = () => resetCourseState();

    const copyBtn = container.querySelector("#copyPromptBtn");
    copyBtn.onclick = () => {
      navigator.clipboard?.writeText(starterPrompt);
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = "Copy"; }, 1400);
    };
  },

  /* ========================================================================
     COURSE 2 WIDGETS: Runtime AI Agent Memory & Context Compaction
     ======================================================================== */
  "memory-tradeoffs": (container, step, ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { approach: "rag" });
    const options = [
      {
        id: "flat",
        title: "1. Flat Chat History",
        badge: "Context Explosion",
        pill: "pill-fail",
        tokens: "~14,000 tokens / turn",
        body: `Appends every raw message and ${ctx.rawPayloadLabel} to the prompt. Costs and latency grow quadratically until the context window overflows.`
      },
      {
        id: "rag",
        title: "2. Naive Vector RAG",
        badge: "Fact Conflict Bug",
        pill: "pill-warn",
        tokens: "~1,400 tokens / turn",
        body: `Retrieves top-k matching chunks, but cannot resolve contradictions—returning both ${ctx.conflictOld} AND ${ctx.conflictNew} so the LLM guesses blindly.`
      },
      {
        id: "graph",
        title: "3. Custom Knowledge Graph",
        badge: "High Engineering Cost",
        pill: "pill-warn",
        tokens: "~180 tokens / turn",
        body: "Tracks entity relationships accurately, but requires maintaining strict schemas and custom graph mutation pipelines just to overwrite an updated fact."
      },
      {
        id: "bank",
        title: "4. Stateful Memory Bank",
        badge: "Optimal Balance",
        pill: "pill-pass",
        tokens: "~24 tokens / turn",
        body: `Runs asynchronously in the background to extract canonical facts, deduplicate notes, and overwrite stale state—keeping only ${ctx.conflictNew}.`
      }
    ];

    const active = options.find((o) => o.id === s.approach) || options[1];
    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">Compare Memory Architectures</span>
          <span class="pill ${active.pill}">${active.tokens}</span>
        </div>
        <div class="fault-grid">
          ${options.map((o) => `
            <button class="fault-btn ${o.id === s.approach ? "selected" : ""}" data-approach="${o.id}">
              <div class="fault-title">${o.title}</div>
              <div class="fault-desc">${o.badge}</div>
            </button>
          `).join("")}
        </div>
        <div class="run-item ${active.id === "bank" ? "run-item--pass" : active.id === "flat" ? "run-item--fail" : "run-item--warn"}">
          <div>${active.body}</div>
          <span class="pill ${active.pill}">${active.badge}</span>
        </div>
      </div>
    `;

    container.querySelectorAll("[data-approach]").forEach((btn) => {
      btn.onclick = () => {
        s.approach = btn.getAttribute("data-approach");
        render();
      };
    });
  },

  "compaction-slider": (container, step, ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { turns: 25, compacted: true });
    const rawTokens = s.turns * 320;
    const compactedTokens = 92 + 55 + 24; // ~92 summary + ~40-word sliding window + ~24 memory facts
    const activeTokens = s.compacted ? compactedTokens : rawTokens;
    const savingsPct = Math.max(0, Math.round((1 - compactedTokens / rawTokens) * 100));
    const barPct = Math.min(100, Math.round((activeTokens / 16000) * 100));

    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">Session Length: ${s.turns} Turns (${ctx.domainName})</span>
          <div class="btn-group">
            <button id="rawHistBtn" class="btn btn-sm ${!s.compacted ? "btn-primary" : ""}">Raw Transcript</button>
            <button id="compactHistBtn" class="btn btn-sm ${s.compacted ? "btn-primary" : ""}">Rolling Compaction</button>
          </div>
        </div>

        <div class="slider-wrap">
          <input id="turnSlider" class="range-input" type="range" min="5" max="50" step="5" value="${s.turns}" />
        </div>

        <div class="meter-header">
          <span>Tokens Sent to Classifier / Extractor</span>
          <span style="color:${s.compacted ? "var(--success)" : "var(--danger)"};">
            ${activeTokens.toLocaleString()} tokens ${s.compacted ? `(${savingsPct}% saved)` : "(Unbounded)"}
          </span>
        </div>
        <div class="meter-track">
          <div class="meter-fill" style="width:${barPct}%; background:${s.compacted ? "var(--success)" : "var(--danger)"};"></div>
        </div>

        <div class="stage-pills">
          <div class="stage-chip">
            <strong>Rolling Summary</strong><br/>
            <span class="muted-text">~92 tokens condensing earlier session history without raw fluff.</span>
          </div>
          <div class="stage-chip">
            <strong>Sliding Window</strong><br/>
            <span class="muted-text">~40 words (~55 tokens) of immediate recent user/DOM context.</span>
          </div>
          <div class="stage-chip">
            <strong>Canonical Facts</strong><br/>
            <span class="muted-text">~24 tokens of deduplicated long-term state from memory store.</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector("#turnSlider").oninput = (e) => {
      s.turns = Number(e.target.value);
      render();
    };
    container.querySelector("#rawHistBtn").onclick = () => { s.compacted = false; render(); };
    container.querySelector("#compactHistBtn").onclick = () => { s.compacted = true; render(); };
  },

  "approval-pipeline": (container, step, ctx, { getStepState, render }) => {
    const s = getStepState(step.id, { approved: false });
    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">3-Stage Runtime Pipeline</span>
          <span class="pill ${s.approved ? "pill-pass" : "pill-warn"}">
            ${s.approved ? "Action Executed" : "Awaiting Human Approval"}
          </span>
        </div>
        <div class="run-feed" style="margin-top:0;">
          <div class="run-item">
            <div><strong>Stage 1 · Deterministic Ingestion (0 LLM Tokens):</strong> ${ctx.stage1Text}</div>
            <span class="pill pill-pass">Pure Code</span>
          </div>
          <div class="run-item">
            <div><strong>Stage 2 · Compact Extraction + Deterministic Resolver:</strong> ${ctx.stage2Text}</div>
            <span class="pill pill-pass">Read-Only</span>
          </div>
          <div class="run-item ${s.approved ? "run-item--pass" : "run-item--warn"}">
            <div>
              <strong>Stage 3 · Proposal Card:</strong> ${ctx.stage3Proposal}
            </div>
            <button id="approveActionBtn" class="btn btn-primary btn-sm">
              ${s.approved ? "✓ Approved & Committed" : "Approve Action"}
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector("#approveActionBtn").onclick = () => {
      s.approved = !s.approved;
      render();
    };
  },

  "memory-quiz": (container, step, ctx, { getStepState, render, resetCourseState }) => {
    const s = getStepState(step.id, { q1: null, q2: null });
    container.innerHTML = `
      <div class="sim-box">
        <div class="quiz-block">
          <div class="quiz-q">1. Why does Naive Vector RAG struggle when user facts or form values change over time?</div>
          ${[
            { idx: 0, text: "It retrieves both outdated and current chunks without resolving which fact supersedes the other", ok: true },
            { idx: 1, text: "It always sends the entire 50-turn raw transcript in every prompt", ok: false }
          ].map((opt) => `
            <button class="quiz-option ${s.q1 === opt.idx ? (opt.ok ? "correct" : "wrong") : ""}" data-q="q1" data-idx="${opt.idx}">
              ${opt.text}
            </button>
          `).join("")}
        </div>

        <div class="quiz-block quiz-block--last">
          <div class="quiz-q">2. How should deterministic transformations (like dates or schema normalization) be handled?</div>
          ${[
            { idx: 0, text: "Ask a second LLM to double-check the date math", ok: false },
            { idx: 1, text: "Offload them to pure deterministic code resolvers and gate side effects behind approval", ok: true }
          ].map((opt) => `
            <button class="quiz-option ${s.q2 === opt.idx ? (opt.ok ? "correct" : "wrong") : ""}" data-q="q2" data-idx="${opt.idx}">
              ${opt.text}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="mastery-bar">
        <button id="restartMemBtn" class="btn btn-primary">↺ Restart Memory Lesson</button>
        <span class="muted-text">
          ${s.q1 === 0 && s.q2 === 1 ? `★ Mastery Complete (${ctx.label})!` : "Answer both questions above to complete mastery check."}
        </span>
      </div>
    `;

    container.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.onclick = () => {
        const q = btn.getAttribute("data-q");
        s[q] = Number(btn.getAttribute("data-idx"));
        render();
      };
    });
    container.querySelector("#restartMemBtn").onclick = () => resetCourseState();
  },

  /* ========================================================================
     COURSE 3 WIDGETS: DSA Visual Template (Two-Pointer Pattern)
     ======================================================================== */
  "dsa-two-pointer": (container, step, _ctx, { getStepState, render }) => {
    const arr = [2, 5, 8, 11, 15, 21];
    const target = 19;
    const frames = [
      { L: 0, R: 5, note: "2 + 21 = 23 > 19 → Sum too large, move Right pointer left (R--)." },
      { L: 0, R: 4, note: "2 + 15 = 17 < 19 → Sum too small, move Left pointer right (L++)." },
      { L: 1, R: 4, note: "5 + 15 = 20 > 19 → Sum too large, move Right pointer left (R--)." },
      { L: 1, R: 3, note: "5 + 11 = 16 < 19 → Sum too small, move Left pointer right (L++)." },
      { L: 2, R: 3, note: "8 + 11 = 19 === 19 → Target pair found in 5 steps (O(n))!", matched: true }
    ];
    const s = getStepState(step.id, { frameIdx: 0 });
    const f = frames[s.frameIdx];

    container.innerHTML = `
      <div class="sim-box">
        <div class="sim-header">
          <span class="sim-label">Sorted Array · Target Sum = ${target}</span>
          <div class="btn-group">
            <button id="stepPtrBtn" class="btn btn-primary btn-sm" ${f.matched ? "disabled" : ""}>
              ${f.matched ? "✓ Found Pair" : "Step Pointers →"}
            </button>
            <button id="resetPtrBtn" class="btn btn-sm">↺ Reset</button>
          </div>
        </div>
        <div class="array-row">
          ${arr.map((val, idx) => {
            const isL = idx === f.L;
            const isR = idx === f.R;
            const cls = f.matched && (isL || isR) ? "matched" : isL ? "ptr-left" : isR ? "ptr-right" : "";
            return `
              <div class="array-cell ${cls}">
                <span>${val}</span>
                <span class="ptr-tag">${isL ? "L" : isR ? "R" : " "}</span>
              </div>
            `;
          }).join("")}
        </div>
        <div class="dsa-note" style="color:${f.matched ? "var(--success)" : "var(--text-body)"};">
          ${f.note}
        </div>
      </div>
    `;

    const stepBtn = container.querySelector("#stepPtrBtn");
    if (stepBtn) stepBtn.onclick = () => { if (s.frameIdx < frames.length - 1) { s.frameIdx++; render(); } };
    container.querySelector("#resetPtrBtn").onclick = () => { s.frameIdx = 0; render(); };
  },

  "dsa-quiz": (container, step, _ctx, { getStepState, render, resetCourseState }) => {
    const s = getStepState(step.id, { ans: null });
    container.innerHTML = `
      <div class="sim-box">
        <div class="quiz-q">What is the time &amp; auxiliary space complexity of Two Pointers on a sorted array?</div>
        ${[
          { idx: 0, text: "O(n) time and O(1) auxiliary space", ok: true },
          { idx: 1, text: "O(n log n) time and O(n) auxiliary space", ok: false }
        ].map((opt) => `
          <button class="quiz-option ${s.ans === opt.idx ? (opt.ok ? "correct" : "wrong") : ""}" data-idx="${opt.idx}">
            ${opt.text}
          </button>
        `).join("")}
      </div>
      <button id="restartDsaBtn" class="btn btn-primary">↺ Restart DSA Lesson</button>
    `;

    container.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.onclick = () => { s.ans = Number(btn.getAttribute("data-idx")); render(); };
    });
    container.querySelector("#restartDsaBtn").onclick = () => resetCourseState();
  }
};
