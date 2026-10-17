// ============================================================================
// ABHISHEK G L — PORTFOLIO INTERACTIVE CONTROLLERS & PROJECT DATA
// ============================================================================

const PROJECTS_DATA = [
  {
    id: "tigergraph-graphrag",
    index: "01",
    category: "agentic",
    badge: "🏆 96.0% Accuracy · Hackathon Winner Benchmark",
    badgeClass: "badge-gold",
    title: "Autonomous Agentic GraphRAG with TigerGraph & Groq",
    summary:
      "4-Agent autonomous control loop backed by TigerGraph Savanna GSQL and an 11-Key Groq API Rotation Pool (openai/gpt-oss-120b) that solves multi-hop, superlative, and global aggregation queries where standard RAG & GraphRAG fail.",
    kpis: [
      { val: "96.0%", lbl: "100-Q Benchmark" },
      { val: "0.02s", lbl: "620× Faster Agg" },
      { val: "$0.00", lbl: "Total API Cost" },
    ],
    tags: [
      "TigerGraph GSQL",
      "Agentic GraphRAG",
      "Groq 120B",
      "Multi-Agent Loop",
      "Reciprocal Rank Fusion",
      "Python",
    ],
    github: "https://github.com/Abhishekgl08/agentic-graphrag-tigergraph",
    architecture: `User Question
   │
   ▼
[Agent 1: QueryRouterAgent] ──► Classifies Lookup / Temporal / Multi-Hop / Superlative / Aggregation
   │
   ▼
[Agent 2: GraphTraversalAgent] ──► Executes TigerGraph Savanna GSQL & Provenance Subgraph Extraction
   │
   ▼
[Agent 3: HybridFusionAgent] ──► Reciprocal Rank Fusion (RRF) + Token Context Guard
   │
   ▼
[Agent 4: AnswerGenerationAgent] ──► Deterministic Counter (0.02s) OR Dual-LLM Grounded Synthesis`,
    details: [
      "Achieved 96.0% overall accuracy on the 100-question evaluation suite, outperforming Traditional RAG (80.0%) and Standard GraphRAG (69.0%).",
      "Solved hard global reasoning: 100.0% accuracy on Superlative queries (vs. 10% in RAG and 0% in Standard GraphRAG) and 90.48% on Aggregation queries.",
      "Engineered a 20ms deterministic graph counter that executes aggregation queries 620× faster than LLM-only context aggregation (0.02s vs. 28.5s).",
      "Built an 11-Key Groq API Rotation Pool with zero rate-limit downtime and $0.00 evaluation cost.",
    ],
  },
  {
    id: "signalpost-agent",
    index: "02",
    category: "agentic",
    badge: "🏆 99.96 / 100.0 · Builderr / Unstop Hackathon",
    badgeClass: "badge-gold",
    title: "SignalPost: High-Precision Enterprise Intelligence Agent",
    summary:
      "Autonomous multi-source company intelligence & grounded research QA agent evaluated on a 100-company Norwegian enterprise corpus with a strict Zero-Wrong-Match identity guarantee and p95 ≤ 10s latency.",
    kpis: [
      { val: "99.96", lbl: "Score / 100.0" },
      { val: "100%", lbl: "Identity Precision" },
      { val: "0", lbl: "Wrong Matches" },
    ],
    tags: [
      "Agentic AI",
      "Entity Resolution",
      "Groq Qwen-3.8 / 120B",
      "Brave Search API",
      "Brreg Registry",
      "Citation QA",
    ],
    github: "https://github.com/Abhishekgl08",
    architecture: `Company Seed (Org Number / Legal Name)
   │
   ▼
[Deterministic Multi-Signal Identity Gate]
  ├─ Enforces exact Brreg org-nr OR legal name + address/board chair corroboration
  └─ Quarantines noisy directory aggregators (Zero Wrong-Company Publications)
   │
   ▼
[Multi-Source Footprint Engine (Parallel Async)]
  ├─ Brreg Official Registry & Financials (14.96/15 pts)
  ├─ Brave Web Discovery + OpenStreetMap + Fagfolkguiden Ratings (55/55 pts)
  └─ Google News RSS + Calibrated Multi-Class Sentiment
   │
   ▼
[Grounded Citation Research QA + Snapshot Diff Engine] ──► Executive Brief & Provenance JSONL`,
    details: [
      "Scored 99.96 / 100.0 across all 5 official competition pillars (55/55 External Footprint, 14.96/15 Foundation, 10/10 Research QA, 12/12 Refresh & Diffs, 8/8 UX).",
      "Designed a Deterministic Multi-Signal Identity Gate with 0 wrong-entity matches across 360+ audited external observations.",
      "Implemented incremental snapshot diffing to track leadership changes, workforce shifts, and new financial filings across daily runs.",
    ],
  },
  {
    id: "blender-mcp-architect",
    index: "03",
    category: "mcp",
    badge: "⚡ Custom MCP 2.x Server + Blender 5.2 LTS",
    badgeClass: "badge-cyan",
    title: "Architectural BIM MCP Server & 3D Generative CAD Engine",
    summary:
      "Deterministic Model Context Protocol (MCP) server and headless Blender 5.2 worker that transforms natural language architectural briefs into mathematically validated 3D buildings, elevations, interior cutaways, and CAD blueprints.",
    kpis: [
      { val: "MCP 2.3", lbl: "Typed Protocol" },
      { val: "100%", lbl: "Idempotent Mesh" },
      { val: "SHA-256", lbl: "BIM Manifests" },
    ],
    tags: [
      "Model Context Protocol (MCP)",
      "Blender 5.2 Python API",
      "Pydantic 2",
      "Parametric 3D BIM",
      "Cycles / Workbench",
      "SVG CAD",
    ],
    github: "https://github.com/Abhishekgl08",
    architecture: `Client Brief / Natural Language Prompt
   │
   ▼
[AI Architectural Agent] ──► DesignSpec.json (Strict Pydantic Schema Validation)
   │
   ▼
[Custom MCP 2.x Server (mcp_server.py)]
  ├── create_project & save_design_spec
  ├── validate_model (VAL_DIMENSIONS, VAL_OPENING_HOSTING, VAL_SITE_CONTAINMENT, VAL_SETBACKS)
  └── build_model_from_spec & create_deliverable_manifest
   │
   ▼
[Headless Blender 5.2 Worker] ──► .blend + Front/Side Elevations + Isometric Dollhouse + CAD Sheet`,
    details: [
      "Built a full MCP 2.x server exposing typed tools to AI agents for autonomous 3D architectural generation on Apple Silicon.",
      "Engineered deterministic parametric geometry generation in Blender with stable object IDs, boolean door/window segmentation, and multi-story duplex layouts.",
      "Implemented pre-render mathematical validation checking wall hosting bounds, setback compliance, and site containment before headless Cycles/Workbench rendering.",
    ],
  },
  {
    id: "audio-diarization-qa",
    index: "04",
    category: "multimodal",
    badge: "🎙️ Speaker Diarization & CX Intelligence",
    badgeClass: "badge-violet",
    title: "Customer Support Audio Diarization & Intent QA Pipeline",
    summary:
      "End-to-end conversational audio intelligence system that ingests raw customer support recordings, performs multi-speaker diarization to separate Customer vs. Support Agent voices, and generates structured root-cause, intent, and experience reports.",
    kpis: [
      { val: "2-Ch+", lbl: "Speaker Split" },
      { val: "Intent", lbl: "& Issue Root-Cause" },
      { val: "Auto", lbl: "CX QA Report" },
    ],
    tags: [
      "Speaker Diarization",
      "Whisper ASR",
      "PyAnnote / VAD",
      "LLM Sentiment & Intent",
      "FastAPI",
      "Audio Analytics",
    ],
    github: "https://github.com/Abhishekgl08",
    architecture: `Raw Call Audio (.wav / .mp3)
   │
   ▼
[Voice Activity Detection (VAD) & Acoustic Feature Extraction]
   │
   ▼
[Speaker Diarization Engine] ──► Separates [SPEAKER_CUSTOMER] vs. [SPEAKER_AGENT] Segments
   │
   ▼
[Timestamp-Aligned Whisper Transcription]
   │
   ▼
[LLM Conversation Intelligence Synthesizer]
  ├── Primary Issue & Root-Cause Extraction
  ├── Customer Intent & Urgency Classification
  ├── Turn-by-Turn Sentiment Trajectory & Resolution Status
  └── Automated Customer Experience (CX) & Agent Empathy Scorecard`,
    details: [
      "Accurately segments overlapping or single-channel support calls into distinct Customer and Customer Support Agent timelines.",
      "Extracts structured insights from every call: core customer issue, underlying intent, escalation risk, and whether the issue was resolved.",
      "Generates an executive QA report evaluating customer experience, agent politeness, response effectiveness, and actionable follow-ups.",
    ],
  },
  {
    id: "exam-intelligence",
    index: "05",
    category: "rag",
    badge: "🎯 100% Extraction Acc · High-Yield Exam AI",
    badgeClass: "badge-cyan",
    title: "Exam Intelligence Platform — Topic & Priority Discovery Engine",
    summary:
      "Deterministic document ingestion and syllabus-mapping intelligence platform ('Extract first, reason later') that analyzes historical university & competitive exam papers to surface high-priority topics to study, marks trends, and question frequency.",
    kpis: [
      { val: "100%", lbl: "Q & Marks Acc" },
      { val: "0.0008s", lbl: "SHA-256 Cache" },
      { val: "11/11", lbl: "Multi-Format Pass" },
    ],
    tags: [
      "PyMuPDF",
      "PaddleOCR",
      "Layout Parsing",
      "Syllabus Mapping",
      "Topic Clustering",
      "FastAPI",
      "Pydantic",
    ],
    github: "https://github.com/Abhishekgl08",
    architecture: `Exam Papers (Native PDF / Scanned PDF / Mobile Photos / DOCX) + Syllabus
   │
   ▼
[SHA-256 Deduplication Cache (0.0008s)] ──► [Per-Page Hybrid Router: PyMuPDF (<0.01s) | PaddleOCR]
   │
   ▼
[Multi-Column Layout & Reading Order Reconstructor + Header/Footer Stripper]
   │
   ▼
[Question, Sub-Question (1a, 1b) & Composite Marks ([5+5=10]) Parser]
   │
   ▼
[Syllabus Topic Mapper & Historical Weightage Analyzer] ──► High-Priority Exam Study Roadmap`,
    details: [
      "Achieved 100.0% Question Number Accuracy and 100.0% Marks Extraction Accuracy across 11 diverse benchmark papers (VTU, GATE, scanned math/chemistry, camera photos).",
      "Reconstructs multi-column reading order and maps extracted questions against curriculum syllabi to rank the most important, frequently tested topics for students.",
      "Preserves full block-level provenance and confidence telemetry in a canonical ExamDocument Pydantic contract.",
    ],
  },
  {
    id: "video-to-sop",
    index: "06",
    category: "multimodal",
    badge: "🎬 Multi-Modal Vision + Whisper Search",
    badgeClass: "badge-violet",
    title: "Video-to-SOP Multi-Modal AI System with Timestamped Search",
    summary:
      "Multi-modal pipeline that converts raw operational and training videos into structured Standard Operating Procedure (SOP) documents complete with step-by-step LLM descriptions, automated GIF visual summaries, and timestamped semantic search.",
    kpis: [
      { val: "GIF + Doc", lbl: "Visual SOPs" },
      { val: "FAISS", lbl: "Timestamp Vector" },
      { val: "Multi-Modal", lbl: "Vision + Audio" },
    ],
    tags: [
      "Python",
      "OpenCV",
      "Whisper",
      "FAISS",
      "Vision LLMs",
      "FastAPI",
    ],
    github: "https://github.com/Abhishekgl08",
    architecture: `Operational Video Input
   ├──► [OpenCV Keyframe Batch Extractor] ──► [Vision-LLM Action Summarizer + Animated GIF Generator]
   └──► [Whisper Timestamped ASR] ──► [FAISS Vector Store with Start/End Timestamp Metadata]
                                              │
                                              ▼
                       Structured Step-by-Step SOP + Instant Video Segment Jump`,
    details: [
      "Processes video frames in intelligent batches using OpenCV and Vision-LLMs to generate clear, procedural step-by-step documentation.",
      "Automatically generates GIF-based visual summaries aligned with each extracted procedural step.",
      "Enables natural language semantic search over video transcripts with direct click-to-timestamp navigation.",
    ],
  },
  {
    id: "youtube-rag",
    index: "07",
    category: "rag",
    badge: "⚡ Hybrid Retrieval + Re-Ranking",
    badgeClass: "badge-cyan",
    title: "YouTube RAG Multimodal Knowledge Assistant",
    summary:
      "End-to-end RAG system that transforms long-form YouTube videos into interactive, searchable knowledge bases using hybrid dense + sparse retrieval, cross-encoder re-ranking, and Vision-LLaMA.",
    kpis: [
      { val: "Hybrid", lbl: "BM25 + FAISS" },
      { val: "Re-Rank", lbl: "High Precision" },
      { val: "Real-Time", lbl: "FastAPI Stream" },
    ],
    tags: [
      "LangChain",
      "FAISS",
      "HuggingFace",
      "Vision-LLaMA",
      "YouTube API",
      "FastAPI",
    ],
    github: "https://github.com/Abhishekgl08",
    architecture: `YouTube URL ──► [Transcript & Metadata Ingestion] ──► [Semantic Chunking & Embeddings]
   ──► [FAISS + Hybrid Retrieval with Cross-Encoder Re-Ranking] ──► [Vision-LLaMA Grounded Answer]`,
    details: [
      "Automated transcript retrieval, URL parsing, and metadata extraction via the YouTube API.",
      "Combined vector embeddings with hybrid retrieval and re-ranking to eliminate hallucinations on long technical videos.",
      "Delivered low-latency multimodal responses through a production FastAPI backend.",
    ],
  },
  {
    id: "hybrid-recommender",
    index: "08",
    category: "ml",
    badge: "📈 76.2% Hit Rate@3 · >5× Baseline",
    badgeClass: "badge-gold",
    title: "Hybrid Recommendation System (ALS + RFM + Co-occurrence)",
    summary:
      "High-scale personalized product recommendation engine trained on 650K+ transactions and 4.5K+ products, fusing Implicit Alternating Least Squares (ALS), RFM customer segmentation, and item co-occurrence matrices.",
    kpis: [
      { val: "76.2%", lbl: "Hit Rate @ 3" },
      { val: "650K+", lbl: "Transactions" },
      { val: ">5.0×", lbl: "vs. Baseline" },
    ],
    tags: [
      "Python",
      "Implicit ALS",
      "RFM Modeling",
      "Co-occurrence",
      "Pandas / NumPy",
      "FastAPI",
    ],
    github: "https://github.com/Abhishekgl08",
    architecture: `650K+ Historical Transactions (4.5K+ Products)
   ├──► [Implicit ALS Collaborative Filtering]
   ├──► [RFM (Recency, Frequency, Monetary) Behavioral Scoring]
   └──► [Item-Item Co-occurrence Matrix]
             │
             ▼
   [Weighted Hybrid Ensemble + Cold-Start Fallback] ──► FastAPI Real-Time & Batch Top-3 Predictions`,
    details: [
      "Trained Implicit ALS collaborative filtering across 4,500+ products to capture latent customer preference vectors.",
      "Fused collaborative filtering, RFM behavioral segmentation, and co-occurrence using optimized weighted scoring.",
      "Achieved 76.2% Hit Rate@3, outperforming random baseline by over 5×, deployed via FastAPI with cold-start handling.",
    ],
  },
];

// --- Render Projects Grid ---
function renderProjects(filter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered =
    filter === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map(
      (p) => `
    <article class="project-card" data-category="${p.category}">
      <div>
        <div class="project-top">
          <span class="project-index">// SYS_${p.index}</span>
          <span class="project-badge ${p.badgeClass}">${p.badge}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-summary">${p.summary}</p>
        <div class="project-highlight-box">
          <div class="kpi-row">
            ${p.kpis
              .map(
                (k) => `
              <div class="kpi-item">
                <div class="val">${k.val}</div>
                <div class="lbl">${k.lbl}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        <div class="tech-tags" style="margin-bottom: 18px;">
          ${p.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="project-footer">
        <button class="btn-inspect" onclick="openProjectModal('${p.id}')">
          <span>Inspect Architecture & Specs</span>
          <span>→</span>
        </button>
        <a href="${p.github}" target="_blank" rel="noopener" class="btn-inspect" style="background:transparent; border-color:rgba(255,255,255,0.14); color:var(--text-secondary);">
          GitHub ↗
        </a>
      </div>
    </article>
  `
    )
    .join("");
}

// --- Modal System ---
window.openProjectModal = function (projectId) {
  const proj = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById("project-modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
      <span class="project-index">// SYSTEM_${proj.index}</span>
      <span class="project-badge ${proj.badgeClass}">${proj.badge}</span>
    </div>
    <h2 style="font-family:var(--font-display); font-size:2rem; margin-bottom:14px;">${proj.title}</h2>
    <p style="color:var(--text-secondary); font-size:1.02rem; margin-bottom:22px;">${proj.summary}</p>

    <div class="project-highlight-box" style="margin-bottom:24px;">
      <div class="kpi-row">
        ${proj.kpis
          .map(
            (k) => `
          <div class="kpi-item">
            <div class="val" style="font-size:1.6rem;">${k.val}</div>
            <div class="lbl">${k.lbl}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <h4 style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-cyan); text-transform:uppercase; letter-spacing:0.12em;">System Pipeline & Architecture</h4>
    <pre class="arch-pre">${proj.architecture}</pre>

    <h4 style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-cyan); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:12px;">Engineering Highlights & Impact</h4>
    <ul class="timeline-bullets" style="margin-bottom:24px;">
      ${proj.details.map((d) => `<li>${d}</li>`).join("")}
    </ul>

    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; padding-top:18px; border-top:1px solid rgba(255,255,255,0.08);">
      <div class="tech-tags">
        ${proj.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
      <a href="${proj.github}" target="_blank" rel="noopener" class="btn btn-primary" style="padding:10px 20px; font-size:0.85rem;">
        View Repository on GitHub ↗
      </a>
    </div>
  `;

  modal.classList.add("open");
};

window.closeProjectModal = function () {
  const modal = document.getElementById("project-modal");
  if (modal) modal.classList.remove("open");
};

// --- 3D Avatar Pose Switcher (3D Cube Pose vs 3D Front Gaze vs Auto-Turn on Cursor) ---
window.switchAvatarPose = function (poseMode, btnEl) {
  const cubeImg = document.getElementById("avatar-3d-cube-img");
  const frontImg = document.getElementById("avatar-3d-front-img");
  document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  if (window.portfolio3DState) {
    window.portfolio3DState.avatarPoseMode = poseMode;
  }

  if (poseMode === "front") {
    if (cubeImg) cubeImg.style.opacity = "0";
    if (frontImg) frontImg.style.opacity = "1";
  } else {
    if (cubeImg) cubeImg.style.opacity = "1";
    if (frontImg) frontImg.style.opacity = "0";
  }
};

// --- Interactive 3D Blender Mode vs High-Res rev-002 Renders ---
window.setBlenderDisplayMode = function (mode) {
  const stage3d = document.getElementById("blender-3d-stage");
  const stageRenders = document.getElementById("blender-renders-stage");
  const btn3d = document.getElementById("btn-mode-3d");
  const btnRenders = document.getElementById("btn-mode-renders");

  if (mode === "3d") {
    if (stage3d) stage3d.style.display = "block";
    if (stageRenders) stageRenders.style.display = "none";
    if (btn3d) btn3d.classList.add("active");
    if (btnRenders) btnRenders.classList.remove("active");
  } else {
    if (stage3d) stage3d.style.display = "none";
    if (stageRenders) stageRenders.style.display = "block";
    if (btn3d) btn3d.classList.remove("active");
    if (btnRenders) btnRenders.classList.add("active");
  }
};

window.switch3DBuilding = function (glbPath, btnEl) {
  document.querySelectorAll(".model-select-btn").forEach((b) => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  if (window.blenderViewerAPI) {
    window.blenderViewerAPI.loadModel(glbPath);
  }
};

// --- Interactive Blender MCP Render Switcher ---
window.switchBlenderRender = function (imgSrc, caption, btnEl) {
  const img = document.getElementById("blender-showcase-img");
  const cap = document.getElementById("blender-showcase-caption");
  if (img) img.src = imgSrc;
  if (cap) cap.textContent = caption;

  document.querySelectorAll(".blender-tab-btn").forEach((b) => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
};

// --- Interactive Audio Diarization Simulator ---
const DIARIZATION_SAMPLES = [
  {
    title: "Call #4092 — Enterprise Billing & API Quota Escalation",
    duration: "02:48",
    customerBars: [35, 80, 95, 70, 40, 15, 10, 12, 85, 92, 65, 20, 10, 15, 78, 60, 20, 12],
    agentBars:    [10, 12, 10, 15, 30, 88, 92, 76, 15, 12, 25, 85, 94, 80, 15, 25, 90, 84],
    transcript: [
      { speaker: "CUSTOMER (00:04)", color: "#00f0ff", text: "Our production Kafka ingestion pipeline hit a 429 quota lock right after upgrading to the enterprise tier." },
      { speaker: "SUPPORT AGENT (00:19)", color: "#10b981", text: "I see the regional token bucket didn't sync after your tier migration. Let me override the rate limit and credit the downtime." },
      { speaker: "CUSTOMER (01:42)", color: "#00f0ff", text: "Throughput is back to 12,000 docs/min now. Really appreciate the fast turnaround!" },
    ],
    report: {
      issue: "Post-upgrade rate-limit desynchronization on production ingestion cluster",
      intent: "Urgent Technical Escalation & Quota Override",
      trajectory: "Frustrated (-0.68) → Relieved (+0.45) → Highly Satisfied (+0.91)",
      score: "96 / 100 (Resolved on First Contact · High Agent Empathy)",
    },
  },
  {
    title: "Call #4108 — Unauthorized Wire Transfer Fraud Hold",
    duration: "03:15",
    customerBars: [90, 96, 85, 60, 20, 12, 10, 88, 75, 30, 12, 10, 14, 65, 55, 15, 10, 12],
    agentBars:    [12, 10, 15, 30, 92, 85, 78, 12, 20, 86, 94, 88, 72, 15, 20, 88, 92, 80],
    transcript: [
      { speaker: "CUSTOMER (00:02)", color: "#00f0ff", text: "I just got an SMS alert for a ₹48,000 transfer I never authorized! Please freeze my card immediately." },
      { speaker: "SUPPORT AGENT (00:14)", color: "#10b981", text: "I have placed an instant cryptographic block on your card and reversed the pending clearing transaction." },
      { speaker: "CUSTOMER (02:10)", color: "#00f0ff", text: "Thank goodness, I see the reversal confirmation in my app now." },
    ],
    report: {
      issue: "Suspected unauthorized transaction requiring immediate card freeze & reversal",
      intent: "Fraud Prevention & Emergency Account Freeze",
      trajectory: "High Anxiety (-0.89) → Reassured (+0.52) → Grateful (+0.94)",
      score: "98 / 100 (Zero Financial Loss · 12s Action Latency)",
    },
  },
];

window.loadDiarizationSample = function (index, btnEl) {
  const sample = DIARIZATION_SAMPLES[index] || DIARIZATION_SAMPLES[0];
  document.querySelectorAll(".diar-sample-btn").forEach((b) => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const custContainer = document.getElementById("cust-wave-bars");
  const agentContainer = document.getElementById("agent-wave-bars");
  const transcriptBox = document.getElementById("diar-transcript");
  const reportBox = document.getElementById("diar-report");

  if (custContainer) {
    custContainer.innerHTML = sample.customerBars
      .map(
        (h) =>
          `<div class="wave-bar" style="height:${h}%; background:${
            h > 40 ? "var(--accent-cyan)" : "rgba(255,255,255,0.12)"
          };"></div>`
      )
      .join("");
  }
  if (agentContainer) {
    agentContainer.innerHTML = sample.agentBars
      .map(
        (h) =>
          `<div class="wave-bar" style="height:${h}%; background:${
            h > 40 ? "var(--accent-emerald)" : "rgba(255,255,255,0.12)"
          };"></div>`
      )
      .join("");
  }
  if (transcriptBox) {
    transcriptBox.innerHTML = sample.transcript
      .map(
        (t) => `
        <div style="margin-bottom:8px; font-size:0.84rem;">
          <span style="font-family:var(--font-mono); font-size:0.72rem; color:${t.color}; font-weight:600;">[${t.speaker}]:</span>
          <span style="color:var(--text-secondary); margin-left:6px;">"${t.text}"</span>
        </div>
      `
      )
      .join("");
  }
  if (reportBox) {
    reportBox.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.8rem; margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
        <div><strong style="color:var(--accent-cyan);">Extracted Issue:</strong> <span style="color:var(--text-secondary);">${sample.report.issue}</span></div>
        <div><strong style="color:var(--accent-cyan);">Customer Intent:</strong> <span style="color:var(--text-secondary);">${sample.report.intent}</span></div>
        <div><strong style="color:var(--accent-cyan);">Sentiment Shift:</strong> <span style="color:var(--text-secondary);">${sample.report.trajectory}</span></div>
        <div><strong style="color:var(--accent-emerald);">CX QA Verdict:</strong> <span style="color:#a7f3d0;">${sample.report.score}</span></div>
      </div>
    `;
  }
};

// --- Initialize UI & Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  renderProjects("all");
  loadDiarizationSample(0);
  if (window.initBlender3DViewer) {
    window.initBlender3DViewer();
  }

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });

  // Custom Cursor Halo Follower
  const halo = document.getElementById("cursor-halo");
  window.addEventListener("pointermove", (e) => {
    if (halo) {
      halo.style.left = `${e.clientX}px`;
      halo.style.top = `${e.clientY}px`;
    }
  });

  document.querySelectorAll("a, button, input").forEach((el) => {
    el.addEventListener("pointerenter", () => halo && halo.classList.add("active"));
    el.addEventListener("pointerleave", () => halo && halo.classList.remove("active"));
  });

  // Argon Dock Formation Pills
  document.querySelectorAll("[data-formation]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-formation]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (window.portfolio3DAPI) {
        window.portfolio3DAPI.setFormation(btn.dataset.formation);
      }
    });
  });

  // Argon Dock Sliders
  const bindSlider = (id, valId, stateKey, suffix = "") => {
    const input = document.getElementById(id);
    const valSpan = document.getElementById(valId);
    if (!input) return;
    input.addEventListener("input", () => {
      const v = parseFloat(input.value);
      if (window.portfolio3DState) window.portfolio3DState[stateKey] = v;
      if (valSpan) valSpan.textContent = v + suffix;
    });
  };

  bindSlider("slider-bubbles", "val-bubbles", "bubbleCount", "");
  bindSlider("slider-repel", "val-repel", "repulsionRadius", "m");
  bindSlider("slider-speed", "val-speed", "floatSpeed", "×");
  bindSlider("slider-lock", "val-lock", "returnStrength", "×");

  // Minimize / Expand Argon Dock
  const dockToggle = document.getElementById("dock-toggle-btn");
  const dock = document.getElementById("argon-dock");
  if (dockToggle && dock) {
    dockToggle.addEventListener("click", () => {
      dock.classList.toggle("minimized");
      dockToggle.textContent = dock.classList.contains("minimized")
        ? "▲ Controls"
        : "▼ Compact";
    });
  }

  // Close modal on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
});
