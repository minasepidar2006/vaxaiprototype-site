import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, FlaskConical, Compass, Boxes, Database, Settings2,
  ChevronDown, Info, AlertTriangle, CheckCircle2, XCircle,
  Clock, ArrowLeft, ArrowRight, FileSearch2, Dna, ShieldCheck, Link2,
  Layers, GitBranch, Search, Play, Sparkles, Microscope,
  BarChart3, Grid3x3, ExternalLink, Wifi, WifiOff, Loader2, Server, ToggleLeft, ToggleRight
} from "lucide-react";

/* ============================================================================
   VaxAI Pro — پروتوتایپ (بدون بک‌اند، بدون دیتابیس)
   یک اپ تک‌فایلی React. تمام داده‌ها mock و درون‌حافظه‌ای‌اند، برگرفته از
   کدبوک VaxAI. اجرای پایپ‌لاین با یک تایمر شبیه‌سازی می‌شود تا همان
   ارکستراسیون سه‌فازی مستندشده (ترتیبی → فن‌آوت → ترتیبی) را نشان دهد.
   ========================================================================== */

/* -------------------------------- توکن‌های طراحی -------------------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap');

    :root{
      --bg: #F3F5F6;
      --surface: #FFFFFF;
      --surface-sunken: #EDF0F2;
      --ink: #16232C;
      --ink-muted: #5B6B76;
      --ink-faint: #8B99A3;
      --line: #DCE3E7;
      --line-strong: #C3CDD3;
      --teal: #0B6E63;
      --teal-ink: #06463F;
      --teal-soft: #E4F2EF;
      --blue: #2A5C8A;
      --blue-soft: #E7EFF6;
      --amber: #9C6B1F;
      --amber-soft: #F6EEDD;
      --red: #A93A2E;
      --red-soft: #F7E7E4;
      --mono-bg: #101A20;
      --mono-ink: #CFE8DC;
      --radius: 10px;
      --radius-sm: 6px;
      --shadow: 0 1px 2px rgba(20,32,40,0.04), 0 1px 8px rgba(20,32,40,0.04);
      --font-display: "Vazirmatn", "Tahoma", sans-serif;
      --font-body: "Vazirmatn", "Tahoma", "Segoe UI", sans-serif;
      --font-mono: "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
    }
    .vx-root{
      background: var(--bg);
      color: var(--ink);
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      font-size: 14px;
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
      direction: rtl;
    }
    .vx-root *{ box-sizing: border-box; }
    .vx-root ::selection{ background: var(--teal-soft); color: var(--teal-ink); }

    /* رشته‌های فنی/انگلیسی (توالی، شناسه، آلل و ...) همیشه چپ‌به‌راست بمانند */
    .vx-mono, .vx-seq{ direction: ltr; unicode-bidi: embed; font-family: var(--font-mono); }

    /* ---------- سایدبار ---------- */
    .vx-sidebar{
      width: 236px;
      flex-shrink: 0;
      background: var(--surface);
      border-inline-start: 1px solid var(--line);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
    }
    .vx-brand{
      padding: 20px 18px 14px 18px;
      border-bottom: 1px solid var(--line);
    }
    .vx-brand-mark{ display:flex; align-items:center; gap:9px; }
    .vx-brand-name{
      font-family: var(--font-display);
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--ink);
    }
    .vx-brand-tag{
      font-size: 10.5px;
      color: var(--ink-faint);
      margin-top: 3px;
    }
    .vx-nav{ padding: 10px 10px; flex: 1; overflow-y:auto; }
    .vx-nav-section-label{
      font-size: 10.8px;
      color: var(--ink-faint);
      padding: 14px 10px 6px 10px;
      font-weight: 700;
    }
    .vx-nav-item{
      display:flex; align-items:center; gap:10px;
      padding: 8px 10px;
      border-radius: var(--radius-sm);
      color: var(--ink-muted);
      cursor: pointer;
      font-size: 13.4px;
      font-weight: 500;
      margin-bottom: 1px;
      transition: background .12s ease, color .12s ease;
      border: 1px solid transparent;
    }
    .vx-nav-item:hover{ background: var(--surface-sunken); color: var(--ink); }
    .vx-nav-item.active{
      background: var(--teal-soft);
      color: var(--teal-ink);
      font-weight: 700;
    }
    .vx-nav-item svg{ flex-shrink:0; }
    .vx-sidebar-foot{
      padding: 12px 16px 16px 16px;
      border-top: 1px solid var(--line);
      font-size: 11px;
      color: var(--ink-faint);
      line-height: 1.7;
    }

    /* ---------- بدنه‌ی اصلی ---------- */
    .vx-main{ flex: 1; min-width: 0; display:flex; flex-direction:column; }
    .vx-topbar{
      display:flex; align-items:center; justify-content:space-between;
      padding: 14px 28px;
      border-bottom: 1px solid var(--line);
      background: var(--surface);
      position: sticky; top:0; z-index: 5;
    }
    .vx-topbar-crumb{
      font-size: 12.3px; color: var(--ink-faint);
      display:flex; align-items:center; gap:7px;
    }
    .vx-content{ padding: 28px 32px 64px 32px; max-width: 1180px; }

    .vx-page-title{
      font-family: var(--font-display);
      font-size: 25px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--ink);
      margin: 0 0 5px 0;
    }
    .vx-page-sub{ color: var(--ink-muted); font-size: 13.6px; max-width: 640px; }
    .vx-page-head{ margin-bottom: 22px; display:flex; align-items:flex-end; justify-content:space-between; gap: 20px; flex-wrap: wrap; }

    /* ---------- پایه‌ها ---------- */
    .vx-card{
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }
    .vx-card-pad{ padding: 18px 20px; }
    .vx-btn{
      display:inline-flex; align-items:center; gap:7px;
      font-family: var(--font-body); font-weight: 700; font-size: 13.2px;
      padding: 9px 15px; border-radius: var(--radius-sm);
      border: 1px solid var(--line-strong); background: var(--surface); color: var(--ink);
      cursor: pointer; transition: all .12s ease;
    }
    .vx-btn:hover{ border-color: var(--ink-faint); }
    .vx-btn.primary{ background: var(--teal); border-color: var(--teal); color: white; }
    .vx-btn.primary:hover{ background: var(--teal-ink); }
    .vx-btn.ghost{ border-color: transparent; background: transparent; }
    .vx-btn.ghost:hover{ background: var(--surface-sunken); }
    .vx-btn:disabled{ opacity: .45; cursor: not-allowed; }
    .vx-btn.small{ padding: 6px 11px; font-size: 12.2px; }

    .vx-pill{
      display:inline-flex; align-items:center; gap:5px;
      font-size: 11.3px; font-weight: 800;
      padding: 3px 10px; border-radius: 100px;
    }
    .vx-pill.teal{ background: var(--teal-soft); color: var(--teal-ink); }
    .vx-pill.blue{ background: var(--blue-soft); color: var(--blue); }
    .vx-pill.amber{ background: var(--amber-soft); color: var(--amber); }
    .vx-pill.red{ background: var(--red-soft); color: var(--red); }
    .vx-pill.gray{ background: var(--surface-sunken); color: var(--ink-muted); }

    .vx-hr{ height:1px; background: var(--line); border:none; margin: 16px 0; }

    /* ---------- نوار توالی (عنصر امضادار) ---------- */
    .vx-seq{
      background: var(--mono-bg);
      color: var(--mono-ink);
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      font-size: 12.5px;
      letter-spacing: 0.02em;
      overflow-x: auto;
      white-space: nowrap;
      line-height: 1.9;
      text-align: left;
    }
    .vx-res{ padding: 1px 0; }
    .vx-res.hydrophobic{ color: #9FE3C9; }
    .vx-res.polar{ color: #A9D3F5; }
    .vx-res.charged-pos{ color: #F5B992; }
    .vx-res.charged-neg{ color: #F0A0A0; }
    .vx-res.special{ color: #E4D598; }

    /* ---------- اخطار الزامی ---------- */
    .vx-disclaimer{
      display:flex; gap: 9px; align-items:flex-start;
      background: var(--amber-soft);
      border: 1px solid #E7D6AE;
      color: #6B4E15;
      padding: 10px 13px;
      border-radius: var(--radius-sm);
      font-size: 12.3px;
      line-height: 1.7;
      margin: 4px 0 20px 0;
    }
    .vx-disclaimer svg{ flex-shrink:0; margin-top:2px; }

    /* ---------- نوار اطمینان (موتیف امضادار) ---------- */
    .vx-confbar{ display:flex; align-items:center; gap:8px; }
    .vx-confbar-track{
      flex:1; height:5px; background: var(--surface-sunken); border-radius: 3px; overflow:hidden;
      min-width: 60px;
    }
    .vx-confbar-fill{ height:100%; background: var(--teal); border-radius:3px; }
    .vx-confbar-fill.amber{ background: var(--amber); }
    .vx-confbar-fill.red{ background: var(--red); }

    /* ---------- جدول ---------- */
    .vx-table{ width:100%; border-collapse: collapse; font-size: 13.2px; }
    .vx-table th{
      text-align: start; font-size: 10.8px;
      color: var(--ink-faint); font-weight:800; padding: 8px 12px; border-bottom: 1px solid var(--line);
      white-space: nowrap;
      position: sticky; top: 0; background: var(--surface);
    }
    .vx-table td{ padding: 10px 12px; border-bottom: 1px solid var(--line); vertical-align: middle; }
    .vx-table tr:last-child td{ border-bottom: none; }
    .vx-table tr.clickable{ cursor:pointer; }
    .vx-table tr.clickable:hover{ background: var(--surface-sunken); }

    /* ---------- کارت سناریو ---------- */
    .vx-scenario-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .vx-scenario-card{
      border: 1.5px solid var(--line); border-radius: var(--radius); padding: 18px;
      cursor: pointer; background: var(--surface); transition: all .12s ease;
      display:flex; flex-direction:column; gap: 10px;
    }
    .vx-scenario-card:hover{ border-color: var(--ink-faint); }
    .vx-scenario-card.selected{ border-color: var(--teal); background: var(--teal-soft); }
    .vx-scenario-icon{
      width: 36px; height:36px; border-radius: 9px; display:flex; align-items:center; justify-content:center;
      background: var(--surface-sunken); color: var(--ink-muted);
    }
    .vx-scenario-card.selected .vx-scenario-icon{ background: var(--teal); color: white; }
    .vx-scenario-title{ font-weight:800; font-size: 14.8px; }
    .vx-scenario-desc{ font-size: 12.4px; color: var(--ink-muted); line-height:1.7; }

    /* ---------- تایم‌لاین فاز ---------- */
    .vx-phase{ margin-bottom: 22px; }
    .vx-phase-label{
      font-size: 11.3px; color: var(--ink-faint);
      font-weight:800; margin-bottom: 10px; display:flex; align-items:center; gap:8px;
    }
    .vx-step-grid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(190px,1fr)); gap: 10px; }
    .vx-step{
      border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 11px 12px;
      background: var(--surface); display:flex; flex-direction:column; gap:6px;
    }
    .vx-step.running{ border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-soft); }
    .vx-step.completed{ border-color: var(--line); }
    .vx-step.warn{ border-color: var(--amber); background: var(--amber-soft); }
    .vx-step.failed{ border-color: var(--red); background: var(--red-soft); }
    .vx-step-name{ font-size: 12.6px; font-weight: 700; display:flex; align-items:center; justify-content:space-between; gap:6px;}
    .vx-step-meta{ font-size: 11px; color: var(--ink-faint); }

    /* ---------- سلول heatmap ---------- */
    .vx-heat-cell{
      width: 100%; height: 30px; border-radius: 4px; display:flex; align-items:center; justify-content:center;
      font-family: var(--font-mono); font-size: 10.5px; font-weight:700; color: var(--ink); direction: ltr;
    }
    .vx-heat-missing{
      background: repeating-linear-gradient(45deg, #EEF1F2, #EEF1F2 4px, #E2E7E9 4px, #E2E7E9 8px);
      color: var(--ink-faint); font-style: italic; font-family: var(--font-body);
    }

    /* ---------- متفرقه ---------- */
    .vx-kv{ display:grid; grid-template-columns: 150px 1fr; gap: 7px 14px; font-size: 13.2px; }
    .vx-kv dt{ color: var(--ink-faint); font-weight:700; }
    .vx-kv dd{ margin:0; }
    .vx-empty{
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      padding: 50px 20px; color: var(--ink-faint); text-align:center; gap:8px;
    }
    .vx-tag-row{ display:flex; gap:6px; flex-wrap:wrap; }
    .vx-link{ color: var(--teal); font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:4px; }
    .vx-link:hover{ text-decoration:underline; }
    .vx-grid-2{ display:grid; grid-template-columns: 1.3fr 1fr; gap: 16px; align-items:start; }
    .vx-stat-num{ font-family: var(--font-display); font-size: 26px; font-weight:800; }
    .vx-stat-label{ font-size: 11.6px; color: var(--ink-faint); margin-top:2px;}
    .vx-provenance{ display:flex; flex-direction:column; gap:0; margin-top: 4px; }
    .vx-prov-node{ display:flex; gap:10px; align-items:flex-start; position:relative; padding-bottom: 18px; }
    .vx-prov-node:last-child{ padding-bottom:0; }
    .vx-prov-dot{ width:9px; height:9px; border-radius:50%; background: var(--teal); margin-top:4px; flex-shrink:0; position:relative; z-index:1;}
    .vx-prov-node:not(:last-child)::before{
      content:""; position:absolute; inset-inline-start:4px; top:13px; bottom:-4px; width:1px; background: var(--line-strong);
    }
    .vx-prov-title{ font-weight:700; font-size:12.9px; }
    .vx-prov-desc{ font-size:11.9px; color:var(--ink-muted); }

    @keyframes vx-spin{ to{ transform: rotate(360deg); } }
    .vx-spin{ animation: vx-spin 0.9s linear infinite; }

    .vx-live-row{
      display:flex; align-items:center; justify-content:space-between; gap:14px;
      padding: 13px 4px; border-bottom: 1px solid var(--line);
    }
    .vx-live-row:last-child{ border-bottom: none; }
    .vx-toggle{
      display:inline-flex; align-items:center; gap:8px; cursor:pointer; user-select:none;
      font-size: 13px; font-weight: 700;
    }

    @media (max-width: 880px){
      .vx-sidebar{ display:none; }
      .vx-scenario-grid{ grid-template-columns: 1fr; }
      .vx-grid-2{ grid-template-columns: 1fr; }
    }
  `}</style>
);

/* -------------------------------- داده‌ی نمونه ------------------------------- */

const RESIDUE_CLASS = (r) => {
  if ("AILMFWVC".includes(r)) return "hydrophobic";
  if ("STNQY".includes(r)) return "polar";
  if ("KRH".includes(r)) return "charged-pos";
  if ("DE".includes(r)) return "charged-neg";
  return "special";
};

const SeqStrip = ({ seq, maxChars = 90 }) => {
  const s = seq.length > maxChars ? seq.slice(0, maxChars) + "…" : seq;
  return (
    <div className="vx-seq">
      {s.split("").map((r, i) => (
        <span key={i} className={`vx-res ${RESIDUE_CLASS(r)}`}>{r}</span>
      ))}
    </div>
  );
};

const PROJECTS = [
  { id: "cmv", name: "سیتومگالوویروس انسانی", short: "CMV", target: "gB / کمپلکس پنتامری", status: "فعال" },
  { id: "ebv", name: "ویروس اپشتین-بار", short: "EBV", target: "gp350 / gH-gL", status: "فعال" },
  { id: "bkpyv", name: "پلی‌ومویروس BK", short: "BKPyV", target: "VP1", status: "غیرفعال" },
];

const CMV_CANDIDATES = [
  {
    id: "cmv-c1", project: "cmv", seq: "GHAHKVPRRPADEETLKQV", level: "پپتید", purpose: "mhci_screen",
    protein: "گلیکوپروتئین B (UL55)", start: 45, end: 64, rank: 1, score: 0.87,
    conservation: 0.94, evidenceBest: "exact", evidencePos: 4, evidenceNeg: 1, literature: 3,
    missing: [],
  },
  {
    id: "cmv-c2", project: "cmv", seq: "NETFYCPWHQFSLDPTAKS", level: "پپتید", purpose: "mhcii_screen",
    protein: "گلیکوپروتئین B (UL55)", start: 210, end: 229, rank: 2, score: 0.81,
    conservation: 0.88, evidenceBest: "substring", evidencePos: 2, evidenceNeg: 0, literature: 1,
    missing: ["structure_quality_tier"],
  },
  {
    id: "cmv-c3", project: "cmv", seq: "KLVDPRTGKVYERRAVLQ", level: "پپتید", purpose: "bcell_screen",
    protein: "گلیکوپروتئین B (UL55)", start: 588, end: 606, rank: 3, score: 0.76,
    conservation: 0.91, evidenceBest: "exact", evidencePos: 3, evidenceNeg: 0, literature: 2,
    missing: [],
  },
  {
    id: "cmv-c4", project: "cmv", seq: "AYPRSQVLTGHNKLIEVDS", level: "پپتید", purpose: "mhci_screen",
    protein: "زیرواحد پنتامر UL130", start: 12, end: 31, rank: 4, score: 0.69,
    conservation: 0.72, evidenceBest: "same_protein_only", evidencePos: 0, evidenceNeg: 0, literature: 0,
    missing: ["bcell_bepipred3_avg"],
  },
  {
    id: "cmv-c5", project: "cmv", seq: "TPCDVFQKGHRLASNYWEI", level: "پپتید", purpose: "mhcii_screen",
    protein: "زیرواحد پنتامر UL128", start: 88, end: 107, rank: 5, score: 0.63,
    conservation: 0.58, evidenceBest: "same_protein_only", evidencePos: 0, evidenceNeg: 1, literature: 1,
    missing: [],
  },
  {
    id: "cmv-c6", project: "cmv", seq: "SDRKPEHVLNGTAFYICQW", level: "پپتید", purpose: "mhci_screen",
    protein: "گلیکوپروتئین B (UL55)", start: 720, end: 739, rank: 6, score: 0.55,
    conservation: 0.66, evidenceBest: "substring", evidencePos: 1, evidenceNeg: 2, literature: 1,
    missing: ["conservation_score"],
  },
  {
    id: "cmv-c7", project: "cmv", seq: "MESRIWCLVVFLGCVAMEA", level: "پروتئین", purpose: "antigen_ranking",
    protein: "گلیکوپروتئین B (UL55)", start: 0, end: 907, rank: 7, score: 0.51,
    conservation: 0.79, evidenceBest: "exact", evidencePos: 6, evidenceNeg: 3, literature: 5,
    missing: [],
  },
];

const EBV_CANDIDATES = [
  {
    id: "ebv-c1", project: "ebv", seq: "FLYALALLLGHYCPFTLQV", level: "پپتید", purpose: "mhci_screen",
    protein: "گلیکوپروتئین gp350 (BLLF1)", start: 30, end: 49, rank: 1, score: 0.83,
    conservation: 0.90, evidenceBest: "exact", evidencePos: 3, evidenceNeg: 0, literature: 2,
    missing: [],
  },
  {
    id: "ebv-c2", project: "ebv", seq: "PKYVAVSDTHDTMKFRVTA", level: "پپتید", purpose: "mhcii_screen",
    protein: "گلیکوپروتئین gp350 (BLLF1)", start: 142, end: 161, rank: 2, score: 0.77,
    conservation: 0.84, evidenceBest: "substring", evidencePos: 2, evidenceNeg: 0, literature: 1,
    missing: ["accessibility_avg"],
  },
  {
    id: "ebv-c3", project: "ebv", seq: "QHGQLTKEVLNMWYSDPRC", level: "پپتید", purpose: "bcell_screen",
    protein: "گلیکوپروتئین gp350 (BLLF1)", start: 370, end: 389, rank: 3, score: 0.70,
    conservation: 0.88, evidenceBest: "exact", evidencePos: 2, evidenceNeg: 0, literature: 2,
    missing: [],
  },
  {
    id: "ebv-c4", project: "ebv", seq: "TARNGVLKDPQFYSEWHIC", level: "پپتید", purpose: "mhci_screen",
    protein: "زیرواحد gH (BXLF2)", start: 88, end: 107, rank: 4, score: 0.60,
    conservation: 0.55, evidenceBest: "same_protein_only", evidencePos: 0, evidenceNeg: 1, literature: 1,
    missing: ["bcell_bepipred3_avg"],
  },
  {
    id: "ebv-c5", project: "ebv", seq: "MEALPYFVGVLTALLVCYL", level: "پروتئین", purpose: "antigen_ranking",
    protein: "گلیکوپروتئین gp350 (BLLF1)", start: 0, end: 907, rank: 5, score: 0.54,
    conservation: 0.81, evidenceBest: "exact", evidencePos: 5, evidenceNeg: 2, literature: 4,
    missing: [],
  },
];

const BKPYV_CANDIDATES = [
  {
    id: "bkpyv-c1", project: "bkpyv", seq: "GKSDLKPCVKLTPLCVTLN", level: "پپتید", purpose: "mhci_screen",
    protein: "پروتئین کپسید VP1", start: 60, end: 79, rank: 1, score: 0.58,
    conservation: 0.61, evidenceBest: "substring", evidencePos: 1, evidenceNeg: 1, literature: 1,
    missing: ["accessibility_avg"],
  },
  {
    id: "bkpyv-c2", project: "bkpyv", seq: "SNPSVEELHKTLARGSTIR", level: "پپتید", purpose: "mhcii_screen",
    protein: "پروتئین کپسید VP1", start: 130, end: 149, rank: 2, score: 0.52,
    conservation: 0.49, evidenceBest: "same_protein_only", evidencePos: 0, evidenceNeg: 0, literature: 0,
    missing: ["bcell_bepipred3_avg"],
  },
  {
    id: "bkpyv-c3", project: "bkpyv", seq: "DYWQGGTKPLVKQYPYHIE", level: "پپتید", purpose: "bcell_screen",
    protein: "پروتئین کپسید VP1", start: 210, end: 229, rank: 3, score: 0.47,
    conservation: 0.66, evidenceBest: "same_protein_only", evidencePos: 0, evidenceNeg: 1, literature: 0,
    missing: [],
  },
  {
    id: "bkpyv-c4", project: "bkpyv", seq: "KLNPFTHAVQEYRSGMDLV", level: "پپتید", purpose: "mhci_screen",
    protein: "پروتئین کوچک کپسید VP2", start: 15, end: 34, rank: 4, score: 0.41,
    conservation: 0.38, evidenceBest: "same_protein_only", evidencePos: 0, evidenceNeg: 0, literature: 0,
    missing: ["mhcii_iedb"],
  },
  {
    id: "bkpyv-c5", project: "bkpyv", seq: "MAPTKRKGERKDPVQLPGT", level: "پروتئین", purpose: "antigen_ranking",
    protein: "پروتئین کپسید VP1", start: 0, end: 362, rank: 5, score: 0.36,
    conservation: 0.58, evidenceBest: "same_protein_only", evidencePos: 0, evidenceNeg: 2, literature: 1,
    missing: [],
  },
];

const CANDIDATES = [...CMV_CANDIDATES, ...EBV_CANDIDATES, ...BKPYV_CANDIDATES];

const PURPOSE_LABEL = {
  mhci_screen: "غربالگری MHC-I",
  mhcii_screen: "غربالگری MHC-II",
  bcell_screen: "غربالگری سلول B",
  antigen_ranking: "رتبه‌بندی آنتی‌ژن",
};

const FEATURE_COLUMNS = [
  { key: "mhci_netmhcpan", label: "MHC-I · NetMHCpan" },
  { key: "mhci_mhcflurry", label: "MHC-I · MHCflurry" },
  { key: "mhcii_iedb", label: "MHC-II · IEDB" },
  { key: "bcell_bepipred3_avg", label: "سلول B · BepiPred3" },
  { key: "conservation_score", label: "حفاظت‌شدگی" },
  { key: "accessibility_avg", label: "دسترس‌پذیری سطحی" },
  { key: "unpaired_cysteine_count", label: "سیستئین آزاد" },
];

const FEATURE_VALUES = {
  c1: { mhci_netmhcpan: 0.91, mhci_mhcflurry: 0.85, mhcii_iedb: 0.40, bcell_bepipred3_avg: 0.55, conservation_score: 0.94, accessibility_avg: 0.72, unpaired_cysteine_count: 0 },
  c2: { mhci_netmhcpan: 0.38, mhci_mhcflurry: 0.42, mhcii_iedb: 0.88, bcell_bepipred3_avg: 0.61, conservation_score: 0.88, accessibility_avg: null, unpaired_cysteine_count: 1 },
  c3: { mhci_netmhcpan: 0.30, mhci_mhcflurry: 0.28, mhcii_iedb: 0.35, bcell_bepipred3_avg: 0.83, conservation_score: 0.91, accessibility_avg: 0.81, unpaired_cysteine_count: 0 },
  c4: { mhci_netmhcpan: 0.74, mhci_mhcflurry: 0.70, mhcii_iedb: 0.20, bcell_bepipred3_avg: null, conservation_score: 0.72, accessibility_avg: 0.44, unpaired_cysteine_count: 2 },
  c5: { mhci_netmhcpan: 0.22, mhci_mhcflurry: 0.19, mhcii_iedb: 0.65, bcell_bepipred3_avg: 0.30, conservation_score: 0.58, accessibility_avg: 0.39, unpaired_cysteine_count: 0 },
  c6: { mhci_netmhcpan: 0.60, mhci_mhcflurry: 0.55, mhcii_iedb: 0.18, bcell_bepipred3_avg: 0.24, conservation_score: null, accessibility_avg: 0.29, unpaired_cysteine_count: 3 },
  c7: { mhci_netmhcpan: 0.52, mhci_mhcflurry: 0.49, mhcii_iedb: 0.44, bcell_bepipred3_avg: 0.40, conservation_score: 0.79, accessibility_avg: 0.51, unpaired_cysteine_count: 4 },
};

const EVIDENCE_LINKS = {
  c1: [
    { id: "e1", confidence: "exact", outcome: "positive", assay: "T cell assay – ELISPOT", mhc: "HLA-A*02:01", pmid: "18316" },
    { id: "e2", confidence: "exact", outcome: "positive", assay: "T cell assay – ICS", mhc: "HLA-A*02:01", pmid: "18316" },
    { id: "e3", confidence: "substring", outcome: "positive", assay: "MHC binding assay", mhc: "HLA-A*02:01", pmid: "22984" },
    { id: "e4", confidence: "substring", outcome: "positive", assay: "T cell assay – ELISPOT", mhc: "HLA-A*11:01", pmid: "30871" },
    { id: "e5", confidence: "same_protein_only", outcome: "negative", assay: "MHC binding assay", mhc: "HLA-B*07:02", pmid: "22984" },
  ],
  c2: [
    { id: "e6", confidence: "substring", outcome: "positive", assay: "T cell assay – proliferation", mhc: "HLA-DRB1*07:01", pmid: "27110" },
    { id: "e7", confidence: "substring", outcome: "positive", assay: "MHC binding assay", mhc: "HLA-DRB1*07:01", pmid: "27110" },
  ],
  c3: [
    { id: "e8", confidence: "exact", outcome: "positive", assay: "B cell assay – ELISA", mhc: null, pmid: "19004" },
    { id: "e9", confidence: "exact", outcome: "positive", assay: "B cell assay – Western blot", mhc: null, pmid: "19004" },
    { id: "e10", confidence: "exact", outcome: "positive", assay: "B cell assay – ELISA", mhc: null, pmid: "24455" },
  ],
  c4: [],
  c5: [
    { id: "e11", confidence: "same_protein_only", outcome: "negative", assay: "T cell assay – ELISPOT", mhc: "HLA-DRB1*15:01", pmid: "20117" },
  ],
  c6: [
    { id: "e12", confidence: "substring", outcome: "positive", assay: "MHC binding assay", mhc: "HLA-A*03:01", pmid: "21390" },
    { id: "e13", confidence: "same_protein_only", outcome: "negative", assay: "T cell assay – ELISPOT", mhc: "HLA-A*03:01", pmid: "21390" },
    { id: "e14", confidence: "same_protein_only", outcome: "negative", assay: "T cell assay – ICS", mhc: "HLA-A*24:02", pmid: "26602" },
  ],
  c7: [
    { id: "e15", confidence: "exact", outcome: "positive", assay: "Neutralization assay", mhc: null, pmid: "18316" },
    { id: "e16", confidence: "exact", outcome: "positive", assay: "B cell assay – ELISA", mhc: null, pmid: "19004" },
  ],
};

const EXPLANATIONS = {
  c1: {
    topFeatures: [
      { name: "mhci_netmhcpan", contribution: 0.21, dir: "positive" },
      { name: "conservation_score", contribution: 0.18, dir: "positive" },
      { name: "mhci_mhcflurry", contribution: 0.15, dir: "positive" },
      { name: "bcell_bepipred3_avg", contribution: 0.06, dir: "positive" },
      { name: "mhcii_iedb", contribution: -0.03, dir: "negative" },
    ],
    confidence: 0.90,
    limitations: ["شواهد آزمایشگاهی منفی نیز برای این کاندید یا اپی‌توپ‌های مرتبط با آن ثبت شده است."],
  },
  c2: {
    topFeatures: [
      { name: "mhcii_iedb", contribution: 0.24, dir: "positive" },
      { name: "conservation_score", contribution: 0.16, dir: "positive" },
      { name: "bcell_bepipred3_avg", contribution: 0.10, dir: "positive" },
    ],
    confidence: 0.71,
    limitations: ["یک یا چند فیچر مهم در امتیازدهی این کاندید در دسترس نبوده است (کیفیت ساختار)."],
  },
  c3: {
    topFeatures: [
      { name: "bcell_bepipred3_avg", contribution: 0.27, dir: "positive" },
      { name: "conservation_score", contribution: 0.19, dir: "positive" },
      { name: "accessibility_avg", contribution: 0.12, dir: "positive" },
    ],
    confidence: 0.86,
    limitations: [],
  },
  c4: {
    topFeatures: [
      { name: "mhci_netmhcpan", contribution: 0.19, dir: "positive" },
      { name: "unpaired_cysteine_count", contribution: -0.08, dir: "negative" },
      { name: "conservation_score", contribution: 0.07, dir: "positive" },
    ],
    confidence: 0.52,
    limitations: [
      "این رتبه‌بندی بر پایه‌ی وزن مساوی بین فیچرهاست، نه وزن یادگرفته‌شده از داده‌ی تجربی کافی.",
      "یک یا چند فیچر مهم در امتیازدهی این کاندید در دسترس نبوده است (میانگین BepiPred3).",
    ],
  },
  c5: {
    topFeatures: [
      { name: "mhcii_iedb", contribution: 0.14, dir: "positive" },
      { name: "conservation_score", contribution: -0.09, dir: "negative" },
    ],
    confidence: 0.48,
    limitations: [
      "این رتبه‌بندی بر پایه‌ی وزن مساوی بین فیچرهاست، نه وزن یادگرفته‌شده از داده‌ی تجربی کافی.",
      "شواهد آزمایشگاهی منفی نیز برای این کاندید یا اپی‌توپ‌های مرتبط با آن ثبت شده است.",
    ],
  },
  c6: {
    topFeatures: [
      { name: "mhci_netmhcpan", contribution: 0.13, dir: "positive" },
      { name: "unpaired_cysteine_count", contribution: -0.12, dir: "negative" },
    ],
    confidence: 0.44,
    limitations: [
      "شواهد آزمایشگاهی منفی نیز برای این کاندید یا اپی‌توپ‌های مرتبط با آن ثبت شده است.",
      "یک یا چند فیچر مهم در امتیازدهی این کاندید در دسترس نبوده است (امتیاز حفاظت‌شدگی).",
    ],
  },
  c7: {
    topFeatures: [
      { name: "conservation_score", contribution: 0.15, dir: "positive" },
      { name: "mhci_netmhcpan", contribution: 0.11, dir: "positive" },
      { name: "unpaired_cysteine_count", contribution: -0.10, dir: "negative" },
    ],
    confidence: 0.68,
    limitations: ["ساختار این پروتئین تجربی نیست؛ از یک مدل پیش‌بینی محاسباتی به‌دست آمده است."],
  },
};

const VALIDATION_GATES = [
  {
    id: "recovery",
    name: "Recovery@K",
    desc: "آیا آنتی‌ژن‌ها/اپی‌توپ‌های شناخته‌شده‌ی پاتوژن‌های Case Study در رتبه‌های بالای Shortlist قرار می‌گیرند؟",
    scenarios: ["OPTIMIZE", "DISCOVER"],
    results: [
      { caseStudy: "CMV (gB، پنتامر)", metric: "۸ از ۱۰ اپی‌توپ شناخته‌شده در ۲۰ رتبه‌ی برتر", passed: true },
      { caseStudy: "EBV (gp350، gH-gL)", metric: "۶ از ۱۰ اپی‌توپ شناخته‌شده در ۲۰ رتبه‌ی برتر", passed: true },
      { caseStudy: "BKPyV (VP1)", metric: "۳ از ۸ اپی‌توپ شناخته‌شده در ۲۰ رتبه‌ی برتر", passed: false },
    ],
  },
  {
    id: "independent",
    name: "Independent Evidence + Expert Review",
    desc: "آیا کاندیدهای نوظهور رتبه‌بالا در برابر شواهدی که در کالیبراسیون استفاده نشده‌اند، و بازبینی دستی متخصص، پابرجا می‌مانند؟",
    scenarios: ["DISCOVER", "DESIGN"],
    results: [
      { caseStudy: "CMV (gB، پنتامر)", metric: "بازبینی متخصص: در انتظار", passed: null },
      { caseStudy: "EBV (gp350، gH-gL)", metric: "بازبینی متخصص: در انتظار", passed: null },
      { caseStudy: "BKPyV (VP1)", metric: "بازبینی متخصص: در انتظار", passed: null },
    ],
  },
  {
    id: "sanity",
    name: "Computational Sanity",
    desc: "آیا خروجی مدل‌ها در بازه‌ی فیزیکی/بیولوژیکی معقول قرار دارد (امتیاز binding، pLDDT، RSA، بازه‌ی entropy)؟",
    scenarios: ["OPTIMIZE", "DISCOVER", "DESIGN"],
    results: [
      { caseStudy: "CMV (gB، پنتامر)", metric: "۰ نقض بازه از ۳٬۶۱۲ ردیف", passed: true },
      { caseStudy: "EBV (gp350، gH-gL)", metric: "۰ نقض بازه از ۲٬۸۹۰ ردیف", passed: true },
      { caseStudy: "BKPyV (VP1)", metric: "۰ نقض بازه از ۱٬۲۰۴ ردیف", passed: true },
    ],
  },
];

const RUNS = [
  { id: "RUN-1042", project: "CMV", scenario: "OPTIMIZE", status: "COMPLETED_WITH_WARNINGS", started: "۱۴۰۵/۰۶/۰۶ ۰۹:۱۴", candidates: 3612 },
  { id: "RUN-1039", project: "EBV", scenario: "DISCOVER", status: "COMPLETED", started: "۱۴۰۵/۰۶/۰۵ ۲۲:۰۳", candidates: 8990 },
  { id: "RUN-1031", project: "BKPyV", scenario: "OPTIMIZE", status: "COMPLETED", started: "۱۴۰۵/۰۶/۰۳ ۱۱:۴۷", candidates: 1204 },
  { id: "RUN-1028", project: "CMV", scenario: "DESIGN", status: "FAILED", started: "۱۴۰۵/۰۶/۰۲ ۱۶:۳۲", candidates: 1 },
];

/* -------------------------------- طرح فازها ------------------------------ */

const PHASE_PLANS = {
  OPTIMIZE: {
    phase1: ["هماهنگ‌سازی داده", "تولید کاندید"],
    phase2: ["تحلیل توالی", "تحلیل ایمنی", "حفاظت‌شدگی", "تحلیل ساختار", "قابلیت تولید", "موتور شواهد"],
    phase3: ["ماتریس فیچر", "رتبه‌بندی", "توضیح‌پذیری"],
    finalWarning: { module: "حفاظت‌شدگی", reason: "۱ گروه پروتئینی به‌خاطر تک‌سویه‌بودن رد شد" },
  },
  DISCOVER: {
    phase1: ["هماهنگ‌سازی داده", "تولید کاندید (کل پروتئوم)"],
    phase2: ["تحلیل توالی", "تحلیل ایمنی", "حفاظت‌شدگی", "تحلیل ساختار", "قابلیت تولید", "موتور شواهد"],
    phase3: ["ماتریس فیچر", "رتبه‌بندی", "توضیح‌پذیری"],
    finalWarning: { module: "تحلیل ساختار", reason: "۲ پروتئین در batch پیش‌بینی ESMFold با timeout مواجه شدند" },
  },
  DESIGN: {
    phase1: ["دریافت اپی‌توپ‌های منتخب", "ساخت Construct"],
    phase2: ["تحلیل ساختار (construct)", "بازارزیابی ایمنی", "قابلیت تولید (construct)"],
    phase3: ["ماتریس فیچر", "رتبه‌بندی", "توضیح‌پذیری"],
    finalWarning: null,
  },
};

/* -------------------------------- اتصال زنده به منابع خارجی --------------------------------
   این بخش فراخوانی واقعی fetch از مرورگر به چند API عمومی و بدون‌نیاز-به-کلید انجام می‌دهد
   (UniProt REST، AlphaFold DB، RCSB PDB Data API، NCBI E-utils/PubMed) — بدون هیچ بک‌اند
   واسط. طبق اصل Resilience خود کدبوک: قطع یا مسدود بودن یک سرویس هرگز نباید UI را بشکند؛
   همیشه یک fallback به داده‌ی نمونه‌ی مستندشده وجود دارد و این تفاوت صریح نشان داده می‌شود.
   نکته‌ی مهم: اگر این پیش‌نمایش داخل یک iframe sandbox شده اجرا شود (مثلاً پیش‌نمایش درون
   چت)، ممکن است host محیط، دسترسی شبکه‌ی بیرونی را مسدود کرده باشد؛ در آن صورت همه‌ی
   فراخوانی‌ها با خطا/timeout مواجه و به‌طور شفاف به داده‌ی نمونه سقوط می‌کنند — نه کرش. */

const LIVE_ENDPOINTS = {
  uniprot: { name: "UniProt REST", url: "https://rest.uniprot.org/uniprotkb/P06473.json" },
  alphafold: { name: "AlphaFold DB", url: "https://alphafold.ebi.ac.uk/api/prediction/P06473" },
  rcsb: { name: "RCSB PDB Data API", url: "https://data.rcsb.org/rest/v1/core/entry/5CXF" },
  pubmed: { name: "NCBI E-utils / PubMed", url: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=18316342,19004183&retmode=json" },
  iedb: { name: "IEDB Tools API", url: null }, // POST-only، بدون CORS مرورگری — نیازمند سرور واسط
};

function useLiveResource(url, enabled, timeoutMs = 7000) {
  const [state, setState] = useState({ status: "idle", data: null, error: null, ms: null });
  useEffect(() => {
    if (!enabled || !url) {
      setState({ status: enabled ? "unsupported" : "disabled", data: null, error: null, ms: null });
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    const started = performance.now();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    setState({ status: "loading", data: null, error: null, ms: null });
    fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } })
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then((data) => {
        if (!cancelled) setState({ status: "success", data, error: null, ms: Math.round(performance.now() - started) });
      })
      .catch((err) => {
        if (!cancelled) {
          const msg = err.name === "AbortError" ? "timeout" : (err.message || "خطای شبکه");
          setState({ status: "error", data: null, error: msg, ms: Math.round(performance.now() - started) });
        }
      })
      .finally(() => clearTimeout(timer));
    return () => { cancelled = true; controller.abort(); clearTimeout(timer); };
  }, [url, enabled, timeoutMs]);
  return state;
}

const LiveBadge = ({ status, ms, error }) => {
  if (status === "disabled") return <span className="vx-pill gray"><WifiOff size={11} /> حالت زنده خاموش</span>;
  if (status === "unsupported") return <span className="vx-pill gray"><Server size={11} /> نیازمند سرور واسط</span>;
  if (status === "loading") return <span className="vx-pill blue"><Loader2 size={11} className="vx-spin" /> در حال اتصال…</span>;
  if (status === "success") return <span className="vx-pill teal"><Wifi size={11} /> زنده · {ms}ms</span>;
  if (status === "error") return <span className="vx-pill amber" title={error}><WifiOff size={11} /> fallback به نمونه</span>;
  return null;
};

/* -------------------------------- کامپوننت‌های کوچک -------------------------------- */

const ScientificDisclaimer = () => (
  <div className="vx-disclaimer">
    <Info size={14} />
    <span>این نتیجه یک <strong>اولویت‌بندی محاسباتی (Computational Prioritization)</strong> است و جایگزین اعتبارسنجی آزمایشگاهی یا بالینی نیست.</span>
  </div>
);

const ConfPill = ({ level }) => {
  const map = {
    exact: { cls: "teal", label: "تطبیق دقیق" },
    substring: { cls: "blue", label: "تطبیق substring" },
    same_protein_only: { cls: "gray", label: "فقط هم‌پروتئینی" },
  };
  const m = map[level] || map.same_protein_only;
  return <span className={`vx-pill ${m.cls}`}>{m.label}</span>;
};

const SCENARIO_LABEL = { OPTIMIZE: "بهینه‌سازی", DISCOVER: "کشف", DESIGN: "طراحی" };

const ScenarioBadge = ({ s }) => {
  const map = { OPTIMIZE: "teal", DISCOVER: "blue", DESIGN: "amber" };
  return <span className={`vx-pill ${map[s] || "gray"}`}><span className="vx-mono">{s}</span></span>;
};

const StatusPill = ({ status }) => {
  const map = {
    COMPLETED: { cls: "teal", label: "تکمیل‌شده" },
    COMPLETED_WITH_WARNINGS: { cls: "amber", label: "تکمیل‌شده · با هشدار" },
    RUNNING: { cls: "blue", label: "در حال اجرا" },
    QUEUED: { cls: "gray", label: "در صف" },
    FAILED: { cls: "red", label: "شکست‌خورده" },
  };
  const m = map[status] || map.QUEUED;
  return <span className={`vx-pill ${m.cls}`}>{m.label}</span>;
};

const ConfBar = ({ value, tone }) => {
  const cls = tone === "amber" ? "amber" : tone === "red" ? "red" : "";
  return (
    <div className="vx-confbar">
      <div className="vx-confbar-track">
        <div className={`vx-confbar-fill ${cls}`} style={{ width: `${Math.round(value * 100)}%` }} />
      </div>
      <span className="vx-mono" style={{ fontSize: 11.6, color: "var(--ink-muted)", minWidth: 32 }}>
        {(value * 100).toFixed(0)}٪
      </span>
    </div>
  );
};

const HeatCell = ({ value }) => {
  if (value === null || value === undefined) {
    return <div className="vx-heat-cell vx-heat-missing">— نامعلوم</div>;
  }
  const alpha = 0.12 + value * 0.72;
  return (
    <div className="vx-heat-cell" style={{ background: `rgba(11,110,99,${alpha})`, color: value > 0.55 ? "white" : "var(--ink)" }}>
      {value.toFixed(2)}
    </div>
  );
};

/* -------------------------------- ناوبری -------------------------------- */

const NAV_SECTIONS = [
  { label: "نمای کلی", items: [{ id: "dashboard", label: "داشبورد", icon: LayoutDashboard }] },
  {
    label: "اجرای تحلیل",
    items: [
      { id: "new-analysis", label: "تحلیل جدید", icon: Sparkles },
      { id: "optimize", label: "بهینه‌سازی (Optimize)", icon: FlaskConical },
      { id: "discover", label: "کشف (Discover)", icon: Compass },
      { id: "design", label: "طراحی (Design)", icon: Boxes },
    ],
  },
  {
    label: "نتایج",
    items: [
      { id: "pipeline-run", label: "اجرای پایپ‌لاین", icon: GitBranch },
      { id: "candidates", label: "کاندیدها", icon: Dna },
      { id: "ranking", label: "رتبه‌بندی", icon: BarChart3 },
      { id: "feature-matrix", label: "ماتریس فیچر", icon: Grid3x3 },
      { id: "validation", label: "اعتبارسنجی", icon: ShieldCheck },
    ],
  },
  {
    label: "سیستم",
    items: [
      { id: "data-sources", label: "منابع داده", icon: Database },
      { id: "settings", label: "تنظیمات", icon: Settings2 },
    ],
  },
];

const PAGE_LABEL = {};
NAV_SECTIONS.forEach((s) => s.items.forEach((i) => (PAGE_LABEL[i.id] = i.label)));
PAGE_LABEL["candidate-detail"] = "جزئیات کاندید";
PAGE_LABEL["evidence"] = "کارت شواهد";

const Sidebar = ({ page, setPage }) => (
  <aside className="vx-sidebar">
    <div className="vx-brand">
      <div className="vx-brand-mark">
        <Microscope size={20} color="var(--teal)" />
        <span className="vx-brand-name">VaxAI</span>
      </div>
      <div className="vx-brand-tag">اولویت‌بندی محاسباتی واکسن</div>
    </div>
    <nav className="vx-nav">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          <div className="vx-nav-section-label">{section.label}</div>
          {section.items.map((item) => {
            const Icon = item.icon;
            const active = page === item.id || (page === "candidate-detail" && item.id === "candidates") || (page === "evidence" && item.id === "candidates");
            return (
              <div key={item.id} className={`vx-nav-item ${active ? "active" : ""}`} onClick={() => setPage(item.id)}>
                <Icon size={15.5} />
                {item.label}
              </div>
            );
          })}
        </div>
      ))}
    </nav>
    <div className="vx-sidebar-foot">پروتوتایپ · بدون دیتابیس<br />فقط داده‌ی نمایشی</div>
  </aside>
);

const TopBar = ({ page, activeProject, liveEnabled }) => {
  const proj = PROJECTS.find((p) => p.id === activeProject);
  return (
    <div className="vx-topbar">
      <div className="vx-topbar-crumb">
        <span className="vx-mono">{proj?.short || "VaxAI"}</span>
        <span>/</span>
        <span style={{ color: "var(--ink)", fontWeight: 700 }}>{PAGE_LABEL[page] || page}</span>
      </div>
      <div className="vx-tag-row">
        <span className={`vx-pill ${liveEnabled ? "teal" : "gray"}`}>
          {liveEnabled ? <Wifi size={11} /> : <WifiOff size={11} />} {liveEnabled ? "اتصال زنده روشن" : "اتصال زنده خاموش"}
        </span>
        <span className="vx-pill gray">نسخه‌ی پروتوتایپ</span>
      </div>
    </div>
  );
};

/* -------------------------------- صفحات -------------------------------- */

const DashboardPage = ({ setPage, setActiveProject }) => (
  <div>
    <div className="vx-page-head">
      <div>
        <h1 className="vx-page-title">داشبورد</h1>
        <p className="vx-page-sub">پروژه‌های فعال، آخرین اجراهای پایپ‌لاین، و جایگاه فعلی سیستم روی نردبان ادعا.</p>
      </div>
      <button className="vx-btn primary" onClick={() => setPage("new-analysis")}><Sparkles size={14} /> تحلیل جدید</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
      {[
        { label: "پروژه‌ی فعال", value: "۳" },
        { label: "اجرای پایپ‌لاین (۳۰ روز)", value: "۱۲" },
        { label: "کاندید رتبه‌بندی‌شده", value: "۱۸.۷ هزار" },
        { label: "Gate های پاس‌شده", value: "۲ از ۳" },
      ].map((s) => (
        <div key={s.label} className="vx-card vx-card-pad">
          <div className="vx-stat-num">{s.value}</div>
          <div className="vx-stat-label">{s.label}</div>
        </div>
      ))}
    </div>

    <div className="vx-grid-2">
      <div className="vx-card vx-card-pad">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <strong style={{ fontSize: 14.2 }}>آخرین اجراهای پایپ‌لاین</strong>
          <span className="vx-link" onClick={() => setPage("pipeline-run")}>مشاهده‌ی همه <ArrowLeft size={12} /></span>
        </div>
        <table className="vx-table">
          <thead><tr><th>اجرا</th><th>پروژه</th><th>سناریو</th><th>وضعیت</th><th>کاندید</th></tr></thead>
          <tbody>
            {RUNS.map((r) => (
              <tr key={r.id} className="clickable" onClick={() => setPage("pipeline-run")}>
                <td className="vx-mono">{r.id}</td>
                <td>{r.project}</td>
                <td><ScenarioBadge s={r.scenario} /></td>
                <td><StatusPill status={r.status} /></td>
                <td className="vx-mono">{r.candidates.toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="vx-card vx-card-pad">
        <strong style={{ fontSize: 14.2 }}>نردبان ادعا — جایگاه فعلی</strong>
        <p style={{ fontSize: 12.4, color: "var(--ink-muted)", margin: "8px 0 14px 0" }}>
          مرجع داخلی برای این‌که سیستم فعلاً چه چیزی را ادعا می‌کند و چه چیزی را نه. VaxAI روی سطح ۲ قرار دارد.
        </p>
        {[
          { level: "۱", label: "بازیابی و سازمان‌دهی شواهد شناخته‌شده", state: "reached" },
          { level: "۲", label: "اولویت‌بندی محاسباتی / رتبه‌بندی", state: "current" },
          { level: "۳", label: "پیش‌بینی اثربخشی بالینی", state: "not reached" },
          { level: "۴", label: "جایگزینی اعتبارسنجی آزمایشگاهی/حیوانی", state: "not reached" },
        ].map((l) => (
          <div key={l.level} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderTop: "1px solid var(--line)" }}>
            <span className={`vx-pill ${l.state === "current" ? "teal" : l.state === "reached" ? "blue" : "gray"}`} style={{ minWidth: 28, justifyContent: "center" }}>{l.level}</span>
            <span style={{ fontSize: 12.7, color: l.state === "not reached" ? "var(--ink-faint)" : "var(--ink)" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="vx-hr" />
    <strong style={{ fontSize: 14.2, display: "block", marginBottom: 12 }}>پروژه‌ها</strong>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
      {PROJECTS.map((p) => (
        <div key={p.id} className="vx-card vx-card-pad" style={{ cursor: "pointer" }} onClick={() => { setActiveProject(p.id); setPage("candidates"); }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14.6 }} className="vx-mono">{p.short}</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>{p.name}</div>
            </div>
            <span className={`vx-pill ${p.status === "فعال" ? "teal" : "gray"}`}>{p.status}</span>
          </div>
          <div style={{ marginTop: 10, fontSize: 12.2, color: "var(--ink-faint)" }}>هدف: {p.target}</div>
        </div>
      ))}
    </div>
  </div>
);

const NewAnalysisPage = ({ setPage, scenario, setScenario }) => {
  const scenarios = [
    { id: "OPTIMIZE", icon: FlaskConical, title: "بهینه‌سازی (Optimize)", desc: "پاتوژن شناخته‌شده، کاندیدهای شناخته‌شده — رتبه‌بندی مجدد و غنی‌سازی با شواهد و تحلیل ساختاری تازه." },
    { id: "DISCOVER", icon: Compass, title: "کشف (Discover)", desc: "پاتوژن جدید یا کل پروتئوم، بدون کاندید از‌پیش‌مشخص. اجرا به‌صورت Blind — بدون هیچ سرنخ دستی درباره‌ی آنتی‌ژن‌ها." },
    { id: "DESIGN", icon: Boxes, title: "طراحی (Design)", desc: "اپی‌توپ‌های منتخب ← ساخت محاسباتی یک construct چند‌اپی‌توپی برای ارزیابی." },
  ];
  const nextPage = scenario ? scenario.toLowerCase() : null;
  return (
    <div>
      <div className="vx-page-head">
        <div>
          <h1 className="vx-page-title">تحلیل جدید</h1>
          <p className="vx-page-sub">یک پروژه انتخاب کن، یک سناریو مشخص کن، و به پایپ‌لاین متناظرش برو.</p>
        </div>
      </div>

      <div className="vx-card vx-card-pad" style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 800, fontSize: 13.7, marginBottom: 10 }}>۱. پروژه و پاتوژن</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {PROJECTS.map((p) => (
            <span key={p.id} className="vx-pill gray" style={{ padding: "7px 13px", fontSize: 12.6, fontWeight: 700 }}>
              <span className="vx-mono">{p.short}</span> — {p.target}
            </span>
          ))}
          <span className="vx-pill gray" style={{ padding: "7px 13px", fontSize: 12.6, fontWeight: 500, color: "var(--ink-faint)" }}>
            + بارگذاری توالی / سویه…
          </span>
        </div>
      </div>

      <div className="vx-card vx-card-pad">
        <div style={{ fontWeight: 800, fontSize: 13.7, marginBottom: 12 }}>۲. سناریو</div>
        <div className="vx-scenario-grid">
          {scenarios.map((s) => {
            const Icon = s.icon;
            const sel = scenario === s.id;
            return (
              <div key={s.id} className={`vx-scenario-card ${sel ? "selected" : ""}`} onClick={() => setScenario(s.id)}>
                <div className="vx-scenario-icon"><Icon size={17} /></div>
                <div className="vx-scenario-title">{s.title}</div>
                <div className="vx-scenario-desc">{s.desc}</div>
              </div>
            );
          })}
        </div>

        {scenario === "DISCOVER" && (
          <div className="vx-disclaimer" style={{ marginTop: 16, marginBottom: 0 }}>
            <AlertTriangle size={14} />
            <span>سناریوی Discover به‌صورت <strong>Blind</strong> اجرا می‌شود: نتایج بدون سرنخ دستی درباره‌ی این‌که کدام پروتئین‌ها آنتی‌ژن شناخته‌شده‌اند اولویت‌بندی می‌شوند.</span>
          </div>
        )}

        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
          <button className="vx-btn primary" disabled={!scenario} onClick={() => setPage(nextPage)}>
            ادامه به {scenario ? SCENARIO_LABEL[scenario] : "…"} <ArrowLeft size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ScenarioLandingPage = ({ scenario, setPage, startRun }) => {
  const config = {
    OPTIMIZE: {
      icon: FlaskConical,
      title: "بهینه‌سازی (Optimize)",
      desc: "پاتوژن شناخته‌شده ← آنتی‌ژن‌های کاندید شناخته‌شده ← رتبه‌بندی بهبودیافته با شواهد تازه، ساختار، حفاظت‌شدگی و قابلیت تولید.",
      inputLabel: "کاندیدهای شناخته‌شده در محدوده",
      inputValue: "گلیکوپروتئین B (UL55)، کمپلکس پنتامری (UL128/UL130/UL131A)",
    },
    DISCOVER: {
      icon: Compass,
      title: "کشف (Discover)",
      desc: "پروتئوم یا پاتوژن جدید ← بدون کاندید از‌پیش‌مشخص ← اسکن محاسباتی Blind روی کل فضای پروتئینی.",
      inputLabel: "دامنه‌ی پروتئوم",
      inputValue: "کل پروتئوم (تمام پروتئین‌های هماهنگ‌شده، بدون فیلتر protein_ids)",
    },
    DESIGN: {
      icon: Boxes,
      title: "طراحی (Design)",
      desc: "اپی‌توپ‌های منتخب و شواهددار ← ترکیب حریصانه (greedy) با یک راهبرد linker ← بازارزیابی به‌عنوان یک کاندید جدید.",
      inputLabel: "منبع اپی‌توپ",
      inputValue: "۶ اپی‌توپ برتر از RUN-1042 (بهینه‌سازی · CMV)",
    },
  }[scenario];

  if (!config) {
    return (
      <div className="vx-empty">
        <Compass size={26} />
        <div>ابتدا یک سناریو از <span className="vx-link" onClick={() => setPage("new-analysis")}>تحلیل جدید</span> انتخاب کن.</div>
      </div>
    );
  }
  const Icon = config.icon;
  return (
    <div>
      <div className="vx-page-head">
        <div>
          <h1 className="vx-page-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon size={24} color="var(--teal)" /> {config.title}
          </h1>
          <p className="vx-page-sub">{config.desc}</p>
        </div>
      </div>

      <div className="vx-card vx-card-pad" style={{ marginBottom: 16 }}>
        <dl className="vx-kv">
          <dt>پروژه</dt><dd>سیتومگالوویروس انسانی (CMV)</dd>
          <dt>{config.inputLabel}</dt><dd>{config.inputValue}</dd>
          {scenario === "OPTIMIZE" && <><dt>آلل‌های HLA هدف</dt><dd className="vx-mono">HLA-A*02:01, HLA-A*01:01, HLA-A*03:01</dd></>}
          {scenario === "DESIGN" && <><dt>محدودیت‌های construct</dt><dd>حداکثر ۶ اپی‌توپ · حداکثر ۳۰۰ residue · linker: GPGPG · حداقل حفاظت‌شدگی ۰.۷۵</dd></>}
        </dl>
      </div>

      {scenario === "DISCOVER" && (
        <div className="vx-disclaimer">
          <AlertTriangle size={14} />
          <span>تأیید حالت Blind لازم است: نتایج بدون سرنخ دستی درباره‌ی آنتی‌ژن‌ها اولویت‌بندی خواهند شد.</span>
        </div>
      )}

      <button className="vx-btn primary" onClick={() => { startRun(scenario); setPage("pipeline-run"); }}>
        <Play size={14} /> شروع اجرای {config.title}
      </button>
    </div>
  );
};

const PipelineRunPage = ({ scenario, runStatus, runStepStates, elapsed, setPage, startRun }) => {
  const plan = PHASE_PLANS[scenario || "OPTIMIZE"];
  const stepStatus = (name) => runStepStates[name] || "pending";

  const Step = ({ name }) => {
    const st = stepStatus(name);
    const cls = st === "running" ? "running" : st === "completed" ? "completed" : st === "warn" ? "warn" : st === "failed" ? "failed" : "";
    const label = { pending: "در صف", running: "در حال اجرا", completed: "تکمیل‌شده", warn: "هشدار", failed: "شکست‌خورده" }[st];
    return (
      <div className={`vx-step ${cls}`}>
        <div className="vx-step-name">
          {name}
          {st === "running" && <Clock size={13} color="var(--blue)" />}
          {st === "completed" && <CheckCircle2 size={13} color="var(--teal)" />}
          {st === "warn" && <AlertTriangle size={13} color="var(--amber)" />}
          {st === "failed" && <XCircle size={13} color="var(--red)" />}
        </div>
        <div className="vx-step-meta">{label}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="vx-page-head">
        <div>
          <h1 className="vx-page-title">اجرای پایپ‌لاین</h1>
          <p className="vx-page-sub">
            {scenario ? <>سناریو: <ScenarioBadge s={scenario} /></> : "هیچ اجرای فعالی وجود ندارد — از صفحه‌ی تحلیل جدید شروع کن."}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {runStatus === "idle" && (
            <button className="vx-btn primary" onClick={() => startRun(scenario || "OPTIMIZE")}><Play size={14} /> شروع اجرا</button>
          )}
          {(runStatus === "completed" || runStatus === "completed_with_warnings") && (
            <>
              <button className="vx-btn" onClick={() => setPage("candidates")}>مشاهده‌ی کاندیدها</button>
              <button className="vx-btn primary" onClick={() => setPage("ranking")}>مشاهده‌ی Shortlist <ArrowLeft size={14} /></button>
            </>
          )}
        </div>
      </div>

      {runStatus !== "idle" && (
        <div className="vx-card vx-card-pad" style={{ marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 22 }}>
            <div><span style={{ color: "var(--ink-faint)", fontSize: 11.6 }}>شناسه‌ی اجرا</span><div className="vx-mono" style={{ fontWeight: 800 }}>RUN-{9100 + (scenario ? scenario.length : 0)}</div></div>
            <div><span style={{ color: "var(--ink-faint)", fontSize: 11.6 }}>زمان سپری‌شده</span><div className="vx-mono" style={{ fontWeight: 800 }}>{elapsed} ثانیه</div></div>
          </div>
          <StatusPill status={runStatus === "running" ? "RUNNING" : runStatus === "completed" ? "COMPLETED" : "COMPLETED_WITH_WARNINGS"} />
        </div>
      )}

      {runStatus === "idle" ? (
        <div className="vx-empty vx-card">
          <GitBranch size={26} />
          <div>هیچ اجرایی در جریان نیست. یک اجرا شروع کن تا ارکستراسیون فازبه‌فاز را ببینی.</div>
        </div>
      ) : (
        <>
          <div className="vx-phase">
            <div className="vx-phase-label"><Layers size={12} /> فاز ۱ — ترتیبی (Sequential)</div>
            <div className="vx-step-grid">{plan.phase1.map((n) => <Step key={n} name={n} />)}</div>
          </div>
          <div className="vx-phase">
            <div className="vx-phase-label"><GitBranch size={12} /> فاز ۲ — فن‌آوت (موازی)</div>
            <div className="vx-step-grid">{plan.phase2.map((n) => <Step key={n} name={n} />)}</div>
          </div>
          <div className="vx-phase">
            <div className="vx-phase-label"><Link2 size={12} /> فاز ۳ — ترتیبی (Fan-in)</div>
            <div className="vx-step-grid">{plan.phase3.map((n) => <Step key={n} name={n} />)}</div>
          </div>

          {runStatus === "completed_with_warnings" && plan.finalWarning && (
            <div className="vx-disclaimer" style={{ background: "var(--amber-soft)" }}>
              <AlertTriangle size={14} />
              <span><strong>{plan.finalWarning.module}</strong>: {plan.finalWarning.reason} — پایپ‌لاین ادامه یافت؛ این یک هشدار ثبت‌شده است، نه یک شکست.</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const CandidatesPage = ({ setPage, setSelectedCandidateId, activeProject }) => {
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = CANDIDATES.filter((c) => {
    if (purposeFilter !== "all" && c.purpose !== purposeFilter) return false;
    if (query && !c.protein.toLowerCase().includes(query.toLowerCase()) && !c.seq.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="vx-page-head">
        <div>
          <h1 className="vx-page-title">کاندیدها</h1>
          <p className="vx-page-sub">تمام کاندیدهای تولیدشده برای این پروژه، در همه‌ی سناریوها. سطح پپتید و پروتئین.</p>
        </div>
      </div>
      <ScientificDisclaimer />

      <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
        <div className="vx-card" style={{ display: "flex", alignItems: "center", padding: "0 10px", flex: "0 0 260px" }}>
          <Search size={14} color="var(--ink-faint)" />
          <input
            placeholder="جستجوی پروتئین یا توالی…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: "none", outline: "none", padding: "9px 8px", fontSize: 13.2, flex: 1, background: "transparent", fontFamily: "var(--font-body)" }}
          />
        </div>
        <select
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
          className="vx-card"
          style={{ padding: "9px 10px", fontSize: 12.6, border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)" }}
        >
          <option value="all">همه‌ی purpose ها</option>
          <option value="mhci_screen">غربالگری MHC-I</option>
          <option value="mhcii_screen">غربالگری MHC-II</option>
          <option value="bcell_screen">غربالگری سلول B</option>
          <option value="antigen_ranking">رتبه‌بندی آنتی‌ژن (پروتئین)</option>
        </select>
        <span style={{ fontSize: 12.2, color: "var(--ink-faint)" }}>{filtered.length} کاندید</span>
      </div>

      <div className="vx-card">
        <table className="vx-table">
          <thead>
            <tr>
              <th>رتبه</th><th>توالی</th><th>پروتئین</th><th>هدف</th>
              <th>امتیاز</th><th>حفاظت‌شدگی</th><th>بهترین شاهد</th><th>ادبیات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="clickable" onClick={() => { setSelectedCandidateId(c.id); setPage("candidate-detail"); }}>
                <td className="vx-mono">#{c.rank}</td>
                <td className="vx-mono" style={{ fontSize: 12.2 }}>{c.seq.length > 22 ? c.seq.slice(0, 22) + "…" : c.seq}</td>
                <td style={{ fontSize: 12.6 }}>{c.protein}</td>
                <td><span className="vx-pill gray">{PURPOSE_LABEL[c.purpose]}</span></td>
                <td><ConfBar value={c.score} /></td>
                <td className="vx-mono">{(c.conservation * 100).toFixed(0)}٪</td>
                <td><ConfPill level={c.evidenceBest} /></td>
                <td className="vx-mono">{c.literature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CandidateDetailPage = ({ candidateId, setPage, liveEnabled }) => {
  const c = CANDIDATES.find((x) => x.id === candidateId) || CANDIDATES[0];
  const fv = FEATURE_VALUES[c.id];
  const exp = EXPLANATIONS[c.id];
  const isGB = c.protein.includes("UL55");

  const liveUniprot = useLiveResource(isGB ? LIVE_ENDPOINTS.uniprot.url : null, liveEnabled);
  const liveRcsb = useLiveResource(isGB ? LIVE_ENDPOINTS.rcsb.url : null, liveEnabled);

  return (
    <div>
      <button className="vx-btn ghost small" style={{ marginBottom: 12 }} onClick={() => setPage("candidates")}>
        <ArrowRight size={13} /> بازگشت به کاندیدها
      </button>
      <div className="vx-page-head">
        <div>
          <h1 className="vx-page-title" style={{ fontSize: 22 }}>کاندید <span className="vx-mono">{c.id.toUpperCase()}</span></h1>
          <p className="vx-page-sub">{c.protein} · residue های {c.start}–{c.end} · سطح {c.level} · {PURPOSE_LABEL[c.purpose]}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="vx-btn" onClick={() => setPage("evidence")}><FileSearch2 size={14} /> کارت شواهد</button>
          <button className="vx-btn" onClick={() => setPage("feature-matrix")}><Grid3x3 size={14} /> ماتریس فیچر</button>
        </div>
      </div>
      <ScientificDisclaimer />

      <div className="vx-card vx-card-pad" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11.6, color: "var(--ink-faint)", marginBottom: 8, fontWeight: 800 }}>توالی</div>
        <SeqStrip seq={c.seq} maxChars={120} />
      </div>

      {isGB && (
        <div className="vx-card vx-card-pad" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <strong style={{ fontSize: 13.7 }}>پروتئین و ساختار — دریافت زنده</strong>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>UniProt · P06473</span>
                <LiveBadge status={liveUniprot.status} ms={liveUniprot.ms} error={liveUniprot.error} />
              </div>
              {liveUniprot.status === "success" ? (
                <div style={{ fontSize: 12.6 }}>
                  <div>{liveUniprot.data?.proteinDescription?.recommendedName?.fullName?.value || "—"}</div>
                  <div className="vx-mono" style={{ color: "var(--ink-muted)", marginTop: 3 }}>
                    طول: {liveUniprot.data?.sequence?.length ?? "—"} residue · organism taxid: {liveUniprot.data?.organism?.taxonId ?? "—"}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: 12.4, color: "var(--ink-faint)" }}>داده‌ی نمونه: گلیکوپروتئین B، ۹۰۷ residue، Human Cytomegalovirus (taxid 10359)</div>
              )}
            </div>
            <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>RCSB PDB · 5CXF</span>
                <LiveBadge status={liveRcsb.status} ms={liveRcsb.ms} error={liveRcsb.error} />
              </div>
              {liveRcsb.status === "success" ? (
                <div style={{ fontSize: 12.6 }}>
                  <div>{liveRcsb.data?.struct?.title || "—"}</div>
                  <div className="vx-mono" style={{ color: "var(--ink-muted)", marginTop: 3 }}>
                    رزولوشن: {liveRcsb.data?.rcsb_entry_info?.resolution_combined?.[0] ?? "—"} Å · روش: {liveRcsb.data?.exptl?.[0]?.method ?? "—"}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: 12.4, color: "var(--ink-faint)" }}>داده‌ی نمونه: ساختار تجربی، رزولوشن ~۳.۶ Å (طبق مثال ماژول ۰۷)</div>
              )}
            </div>
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 8 }}>
            این همان Decision Tree ماژول ۰۷ است: ابتدا PDB تجربی بررسی می‌شود؛ نتیجه‌ی این کارت مستقیماً از API عمومی RCSB/UniProt خوانده می‌شود، نه mock.
          </div>
        </div>
      )}

      <div className="vx-grid-2">
        <div>
          <div className="vx-card vx-card-pad" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <strong style={{ fontSize: 13.7 }}>رتبه و امتیاز</strong>
              <span className="vx-pill teal">رتبه‌ی #{c.rank}</span>
            </div>
            <ConfBar value={c.score} />
            {exp && (
              <>
                <div className="vx-hr" />
                <div style={{ fontSize: 11.6, color: "var(--ink-faint)", marginBottom: 8, fontWeight: 800 }}>سهم فیچرهای برتر</div>
                {exp.topFeatures.map((f) => (
                  <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
                    <span className="vx-mono" style={{ fontSize: 12.2, flex: 1 }}>{f.name}</span>
                    <span className="vx-mono" style={{ fontSize: 12.2, fontWeight: 800, color: f.dir === "positive" ? "var(--teal-ink)" : "var(--red)" }}>
                      {f.dir === "positive" ? "+" : ""}{f.contribution.toFixed(2)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="vx-card vx-card-pad">
            <strong style={{ fontSize: 13.7, display: "block", marginBottom: 10 }}>عکس فوری فیچرها</strong>
            <dl className="vx-kv">
              {FEATURE_COLUMNS.map((col) => (
                <React.Fragment key={col.key}>
                  <dt>{col.label}</dt>
                  <dd className="vx-mono">{fv[col.key] === null || fv[col.key] === undefined ? <span style={{ color: "var(--ink-faint)", fontStyle: "italic", fontFamily: "var(--font-body)" }}>نامعلوم</span> : fv[col.key]}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </div>

        <div>
          <div className="vx-card vx-card-pad" style={{ marginBottom: 16 }}>
            <strong style={{ fontSize: 13.7, display: "block", marginBottom: 10 }}>خلاصه‌ی شواهد</strong>
            <div style={{ display: "flex", gap: 18, marginBottom: 8 }}>
              <div><div className="vx-stat-num vx-mono" style={{ fontSize: 20, color: "var(--teal-ink)" }}>{c.evidencePos}</div><div className="vx-stat-label">مثبت</div></div>
              <div><div className="vx-stat-num vx-mono" style={{ fontSize: 20, color: "var(--red)" }}>{c.evidenceNeg}</div><div className="vx-stat-label">منفی</div></div>
              <div><div className="vx-stat-num vx-mono" style={{ fontSize: 20 }}>{c.literature}</div><div className="vx-stat-label">ادبیات</div></div>
            </div>
            <ConfPill level={c.evidenceBest} />
            <div style={{ marginTop: 10 }}>
              <span className="vx-link" onClick={() => setPage("evidence")}>مشاهده‌ی کارت کامل شواهد <ArrowLeft size={12} /></span>
            </div>
          </div>

          <div className="vx-card vx-card-pad">
            <strong style={{ fontSize: 13.7, display: "block", marginBottom: 10 }}>زنجیره‌ی Provenance</strong>
            <div className="vx-provenance">
              {[
                { t: "رکورد خام ingestion", d: "IEDB epitope_search · UniProt P06473" },
                { t: "موجودیت هماهنگ‌شده", d: "پروتئین UL55 · گروه اپی‌توپ resolve شده" },
                { t: "تولید کاندید", d: `Sliding window، purpose=${c.purpose}` },
                { t: "ردیف ماتریس فیچر", d: "۷ فیچر، نرمال‌شده درون همان pipeline_run" },
                { t: "رتبه‌بندی", d: "multi_criteria_logistic · کالیبره‌شده" },
              ].map((n) => (
                <div key={n.t} className="vx-prov-node">
                  <div className="vx-prov-dot" />
                  <div>
                    <div className="vx-prov-title">{n.t}</div>
                    <div className="vx-prov-desc vx-mono" style={{ fontSize: 11.5 }}>{n.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {exp && exp.limitations.length > 0 && (
        <div className="vx-card vx-card-pad" style={{ marginTop: 16, borderColor: "#E7D6AE" }}>
          <strong style={{ fontSize: 13.4, display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <AlertTriangle size={14} color="var(--amber)" /> محدودیت‌ها
          </strong>
          <ul style={{ margin: 0, paddingRight: 18, fontSize: 12.7, color: "var(--ink-muted)", lineHeight: 1.9 }}>
            {exp.limitations.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

const EvidenceCardPage = ({ candidateId, setPage, liveEnabled }) => {
  const c = CANDIDATES.find((x) => x.id === candidateId) || CANDIDATES[0];
  const ev = EVIDENCE_LINKS[c.id] || [];
  const pmids = [...new Set(ev.map((e) => e.pmid))];
  const pubmedUrl = pmids.length
    ? `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmids.join(",")}&retmode=json`
    : null;
  const livePubmed = useLiveResource(pubmedUrl, liveEnabled);

  const titleFor = (pmid) => {
    if (livePubmed.status !== "success") return null;
    const rec = livePubmed.data?.result?.[pmid];
    return rec?.title || null;
  };

  return (
    <div>
      <button className="vx-btn ghost small" style={{ marginBottom: 12 }} onClick={() => setPage("candidate-detail")}>
        <ArrowRight size={13} /> بازگشت به کاندید
      </button>
      <div className="vx-page-head">
        <div>
          <h1 className="vx-page-title">کارت شواهد</h1>
          <p className="vx-page-sub">شواهد تجربی و ادبیاتی قابل‌ردیابی برای <span className="vx-mono">{c.id.toUpperCase()}</span> — {c.protein}.</p>
        </div>
        {pmids.length > 0 && <LiveBadge status={livePubmed.status} ms={livePubmed.ms} error={livePubmed.error} />}
      </div>

      {ev.length === 0 ? (
        <div className="vx-card vx-empty">
          <FileSearch2 size={24} />
          <div>هیچ شاهد آزمایشگاهی مستقیمی هنوز به این کاندید پیوند نخورده است.</div>
          <div style={{ fontSize: 12.4 }}>بهترین سطح تطبیق: <ConfPill level={c.evidenceBest} /></div>
        </div>
      ) : (
        <div className="vx-card">
          <table className="vx-table">
            <thead><tr><th>تطبیق</th><th>نتیجه</th><th>نوع آزمایش</th><th>محدودیت MHC</th><th>منبع (PMID)</th><th>عنوان مقاله (زنده از PubMed)</th></tr></thead>
            <tbody>
              {ev.map((e) => {
                const liveTitle = titleFor(e.pmid);
                return (
                  <tr key={e.id}>
                    <td><ConfPill level={e.confidence} /></td>
                    <td>
                      <span className={`vx-pill ${e.outcome === "positive" ? "teal" : "red"}`}>
                        {e.outcome === "positive" ? <CheckCircle2 size={11} /> : <XCircle size={11} />} {e.outcome === "positive" ? "مثبت" : "منفی"}
                      </span>
                    </td>
                    <td className="vx-mono" style={{ fontSize: 12.4 }}>{e.assay}</td>
                    <td className="vx-mono">{e.mhc || "—"}</td>
                    <td>
                      <a
                        className="vx-link vx-mono"
                        style={{ fontSize: 12.5 }}
                        href={`https://pubmed.ncbi.nlm.nih.gov/${e.pmid}/`}
                        target="_blank" rel="noreferrer"
                      >
                        PMID:{e.pmid} <ExternalLink size={10} />
                      </a>
                    </td>
                    <td style={{ fontSize: 12.2, maxWidth: 260 }}>
                      {liveTitle ? liveTitle : <span style={{ color: "var(--ink-faint)", fontStyle: "italic" }}>{livePubmed.status === "loading" ? "در حال دریافت…" : "در دسترس نیست"}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {pmids.length > 0 && (
        <div style={{ fontSize: 11.3, color: "var(--ink-faint)", margin: "8px 2px 0 2px" }}>
          توجه: ستون «عنوان مقاله» واقعاً و زنده از PubMed خوانده می‌شود؛ اما پیوند بین این PMID خاص و این کاندید در
          این پروتوتایپ نمایشی و مصنوعی است (چون هیچ اجرای واقعی 09_EVIDENCE_ENGINE پشت آن نیست).
        </div>
      )}

      <div className="vx-hr" />
      <div className="vx-card vx-card-pad">
        <strong style={{ fontSize: 13.4, display: "block", marginBottom: 8 }}>چرا این برای رتبه‌بندی اهمیت دارد</strong>
        <p style={{ fontSize: 12.7, color: "var(--ink-muted)", margin: 0, lineHeight: 1.9 }}>
          شواهد منفی آزمایشگاهی نگه‌داشته و وزن‌دهی می‌شود، نه دور ریخته — کاندیدی با شواهد منفی قوی در رتبه‌بندی
          جریمه می‌شود، نه نادیده گرفته. هر پیوند شواهد تا رکورد خام ingestion و منبع assay اصلی قابل‌ردیابی است.
        </p>
      </div>
    </div>
  );
};

const RankingPage = ({ setPage, setSelectedCandidateId }) => {
  const [openId, setOpenId] = useState(null);
  const sorted = [...CANDIDATES].sort((a, b) => a.rank - b.rank);
  return (
    <div>
      <div className="vx-page-head">
        <div>
          <h1 className="vx-page-title">رتبه‌بندی</h1>
          <p className="vx-page-sub">Shortlist برای RUN-1042 · بهینه‌سازی · CMV. مدل: multi_criteria_logistic (کالیبره‌شده روی ۴۷ کاندید Benchmark).</p>
        </div>
      </div>
      <ScientificDisclaimer />

      <div className="vx-card">
        {sorted.map((c) => {
          const exp = EXPLANATIONS[c.id];
          const open = openId === c.id;
          return (
            <div key={c.id} style={{ borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px" }}>
                <span className="vx-pill teal vx-mono" style={{ minWidth: 32, justifyContent: "center" }}>#{c.rank}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.2 }}>{c.protein}</div>
                  <div className="vx-mono" style={{ fontSize: 11.6, color: "var(--ink-faint)" }}>{c.seq.slice(0, 30)}{c.seq.length > 30 ? "…" : ""}</div>
                </div>
                <div style={{ width: 130 }}><ConfBar value={c.score} tone={c.score < 0.6 ? "amber" : undefined} /></div>
                <button className="vx-btn small ghost" onClick={() => setOpenId(open ? null : c.id)}>
                  {open ? "پنهان کن" : "چرا این رتبه؟"} <ChevronDown size={13} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
                </button>
                <button className="vx-btn small" onClick={() => { setSelectedCandidateId(c.id); setPage("candidate-detail"); }}>باز کردن</button>
              </div>
              {open && exp && (
                <div style={{ padding: "0 18px 16px 18px", background: "var(--surface-sunken)" }}>
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    <div style={{ minWidth: 220 }}>
                      <div style={{ fontSize: 10.8, color: "var(--ink-faint)", fontWeight: 800, margin: "10px 0 6px" }}>سهم فیچرها</div>
                      {exp.topFeatures.map((f) => (
                        <div key={f.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.2, padding: "3px 0", maxWidth: 260 }}>
                          <span className="vx-mono">{f.name}</span>
                          <span className="vx-mono" style={{ fontWeight: 800, color: f.dir === "positive" ? "var(--teal-ink)" : "var(--red)" }}>{f.dir === "positive" ? "+" : ""}{f.contribution.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ minWidth: 220 }}>
                      <div style={{ fontSize: 10.8, color: "var(--ink-faint)", fontWeight: 800, margin: "10px 0 6px" }}>شواهد</div>
                      <div style={{ fontSize: 12.5 }}>{c.evidencePos} مثبت · {c.evidenceNeg} منفی · بهترین تطبیق: <ConfPill level={c.evidenceBest} /></div>
                    </div>
                    {exp.limitations.length > 0 && (
                      <div style={{ minWidth: 260, flex: 1 }}>
                        <div style={{ fontSize: 10.8, color: "var(--ink-faint)", fontWeight: 800, margin: "10px 0 6px" }}>محدودیت‌ها</div>
                        <ul style={{ margin: 0, paddingRight: 16, fontSize: 12.2, color: "var(--ink-muted)", lineHeight: 1.8 }}>
                          {exp.limitations.map((l, i) => <li key={i}>{l}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FeatureMatrixPage = ({ setPage, setSelectedCandidateId }) => (
  <div>
    <div className="vx-page-head">
      <div>
        <h1 className="vx-page-title">ماتریس فیچر</h1>
        <p className="vx-page-sub">مقادیر خام فیچر به‌ازای هر کاندید. سلول‌های هاشورخورده یعنی مقدار برای آن کاندید در دسترس نبوده، نه صفر.</p>
      </div>
    </div>
    <ScientificDisclaimer />
    <div className="vx-card" style={{ overflowX: "auto" }}>
      <table className="vx-table" style={{ minWidth: 900 }}>
        <thead>
          <tr>
            <th>کاندید</th>
            {FEATURE_COLUMNS.map((col) => <th key={col.key}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {CANDIDATES.map((c) => (
            <tr key={c.id} className="clickable" onClick={() => { setSelectedCandidateId(c.id); setPage("candidate-detail"); }}>
              <td>
                <div className="vx-mono" style={{ fontWeight: 800, fontSize: 12.2 }}>{c.id.toUpperCase()}</div>
                <div style={{ fontSize: 11.2, color: "var(--ink-faint)" }}>{c.protein}</div>
              </td>
              {FEATURE_COLUMNS.map((col) => (
                <td key={col.key} style={{ minWidth: 110 }}>
                  {col.key === "unpaired_cysteine_count"
                    ? <div className="vx-mono" style={{ textAlign: "center" }}>{FEATURE_VALUES[c.id][col.key]}</div>
                    : <HeatCell value={FEATURE_VALUES[c.id][col.key]} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ValidationPage = () => (
  <div>
    <div className="vx-page-head">
      <div>
        <h1 className="vx-page-title">اعتبارسنجی</h1>
        <p className="vx-page-sub">سه Gate اعتبارسنجی، روی سه پاتوژن Case Study اعمال شده‌اند. Gate ها نوع چک‌اند؛ Optimize/Discover/Design سناریو‌اند — این دو مستقل از هم‌اند.</p>
      </div>
    </div>

    {VALIDATION_GATES.map((g) => (
      <div key={g.id} className="vx-card vx-card-pad" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15.4 }}>Gate · {g.name}</div>
            <div style={{ fontSize: 12.4, color: "var(--ink-muted)", maxWidth: 560, marginTop: 3 }}>{g.desc}</div>
          </div>
          <div className="vx-tag-row">{g.scenarios.map((s) => <ScenarioBadge key={s} s={s} />)}</div>
        </div>
        <table className="vx-table">
          <thead><tr><th>Case Study</th><th>متریک</th><th>نتیجه</th></tr></thead>
          <tbody>
            {g.results.map((r) => (
              <tr key={r.caseStudy}>
                <td>{r.caseStudy}</td>
                <td className="vx-mono" style={{ fontSize: 12.3 }}>{r.metric}</td>
                <td>
                  {r.passed === true && <span className="vx-pill teal"><CheckCircle2 size={11} /> پاس‌شده</span>}
                  {r.passed === false && <span className="vx-pill red"><XCircle size={11} /> پاس نشده</span>}
                  {r.passed === null && <span className="vx-pill gray"><Clock size={11} /> در انتظار</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

const PlaceholderPage = ({ title, desc, Icon }) => (
  <div>
    <div className="vx-page-head">
      <div>
        <h1 className="vx-page-title">{title}</h1>
        <p className="vx-page-sub">{desc}</p>
      </div>
    </div>
    <div className="vx-card vx-empty">
      <Icon size={26} />
      <div>در این پروتوتایپ فقط یک placeholder سبک است — تمرکز دمو نیست.</div>
    </div>
  </div>
);

const DataSourceRow = ({ id, liveEnabled }) => {
  const ep = LIVE_ENDPOINTS[id];
  const live = useLiveResource(ep.url, liveEnabled);
  let detail = "—";
  if (live.status === "success") {
    if (id === "uniprot") detail = `${live.data?.proteinDescription?.recommendedName?.fullName?.value || "دریافت شد"} · ${live.data?.sequence?.length || "?"} residue`;
    if (id === "alphafold") detail = Array.isArray(live.data) && live.data[0] ? `pLDDT در دسترس · ${live.data[0].modelCreatedDate || ""}` : "دریافت شد";
    if (id === "rcsb") detail = `${live.data?.struct?.title || "PDB 5CXF"} · ${live.data?.rcsb_entry_info?.resolution_combined?.[0] ?? "—"} Å`;
    if (id === "pubmed") detail = `${Object.keys(live.data?.result || {}).filter((k) => k !== "uids").length} چکیده دریافت شد`;
  }
  return (
    <div className="vx-live-row">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--surface-sunken)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Server size={15} color="var(--ink-muted)" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13.4 }}>{ep.name}</div>
          <div className="vx-mono" style={{ fontSize: 11, color: "var(--ink-faint)", maxWidth: 420, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {ep.url || "بدون endpoint قابل‌فراخوانی از مرورگر"}
          </div>
          {live.status === "success" && <div style={{ fontSize: 11.6, color: "var(--ink-muted)", marginTop: 3 }}>{detail}</div>}
          {live.status === "error" && <div style={{ fontSize: 11.6, color: "var(--amber)", marginTop: 3 }}>{live.error}</div>}
        </div>
      </div>
      <LiveBadge status={live.status} ms={live.ms} error={live.error} />
    </div>
  );
};

const DataSourcesPage = ({ liveEnabled, setLiveEnabled }) => (
  <div>
    <div className="vx-page-head">
      <div>
        <h1 className="vx-page-title">منابع داده</h1>
        <p className="vx-page-sub">وضعیت اتصال زنده به منابع خارجی — فراخوانی واقعی و مستقیم از مرورگر، بدون هیچ بک‌اند واسط.</p>
      </div>
      <div className="vx-toggle" onClick={() => setLiveEnabled((v) => !v)}>
        {liveEnabled ? <ToggleRight size={26} color="var(--teal)" /> : <ToggleLeft size={26} color="var(--ink-faint)" />}
        اتصال زنده {liveEnabled ? "روشن" : "خاموش"}
      </div>
    </div>

    <div className="vx-disclaimer">
      <Info size={14} />
      <span>
        این فراخوانی‌ها واقعی‌اند (UniProt، AlphaFold DB، RCSB PDB، NCBI E-utils — همگی بدون کلید API). اگر این پیش‌نمایش
        داخل یک محیط sandbox شده (مثل iframe چت) نمایش داده شود، ممکن است دسترسی شبکه‌ی بیرونی توسط host مسدود باشد؛
        در آن صورت هر ردیف با «fallback به نمونه» مشخص می‌شود، نه کرش. برای تضمین اتصال، فایل را دانلود و مستقیماً
        در مرورگر باز کن.
      </span>
    </div>

    <div className="vx-card vx-card-pad">
      {Object.keys(LIVE_ENDPOINTS).map((id) => <DataSourceRow key={id} id={id} liveEnabled={liveEnabled} />)}
    </div>

    <div className="vx-hr" />
    <div className="vx-card vx-card-pad">
      <strong style={{ fontSize: 13.4, display: "block", marginBottom: 8 }}>چرا IEDB Tools API زنده فراخوانی نمی‌شود</strong>
      <p style={{ fontSize: 12.6, color: "var(--ink-muted)", margin: 0, lineHeight: 1.9 }}>
        طبق ماژول ۰۵ کدبوک، IEDB Tools API یک endpoint سمت سرور و POST-محور است و به‌طور معمول برای فراخوانی مستقیم
        از مرورگر (CORS) باز نیست. در معماری واقعی VaxAI (بخش <span className="vx-mono">17_BACKEND_API</span>)، این
        فراخوانی از طریق بک‌اند انجام می‌شود، نه از سمت کلاینت — همین محدودیت هم یکی از دلایلی است که این پروتوتایپ
        بدون بک‌اند واقعی نمی‌تواند NetMHCpan/MHC-II را زنده فرا بخواند.
      </p>
    </div>
  </div>
);

const SettingsPage = ({ liveEnabled, setLiveEnabled }) => (
  <div>
    <div className="vx-page-head">
      <div>
        <h1 className="vx-page-title">تنظیمات</h1>
        <p className="vx-page-sub">محیط اجرا، سرویس‌های predictor، کاربران — در این پروتوتایپ فقط کنترل اتصال زنده فعال است.</p>
      </div>
    </div>
    <div className="vx-card vx-card-pad" style={{ marginBottom: 16 }}>
      <div className="vx-toggle" onClick={() => setLiveEnabled((v) => !v)} style={{ marginBottom: 8 }}>
        {liveEnabled ? <ToggleRight size={26} color="var(--teal)" /> : <ToggleLeft size={26} color="var(--ink-faint)" />}
        تلاش برای اتصال زنده به منابع خارجی
      </div>
      <p style={{ fontSize: 12.5, color: "var(--ink-muted)", margin: 0, lineHeight: 1.8 }}>
        وقتی روشن است، صفحات «منابع داده»، «جزئیات کاندید» و «کارت شواهد» سعی می‌کنند مستقیماً از مرورگر به
        UniProt، AlphaFold DB، RCSB PDB و NCBI/PubMed متصل شوند. در صورت شکست یا مسدود بودن شبکه، به‌صورت خودکار
        و بی‌صدا به داده‌ی نمونه‌ی مستندشده در کدبوک سقوط می‌کند.
      </p>
    </div>
    <div className="vx-card vx-empty">
      <Settings2 size={26} />
      <div>بقیه‌ی تنظیمات (predictor services، مدیریت کاربران) در این پروتوتایپ پیاده‌سازی نشده‌اند.</div>
    </div>
  </div>
);

/* -------------------------------- ریشه‌ی اپ -------------------------------- */

export default function VaxAIPrototype() {
  const [page, setPage] = useState("dashboard");
  const [activeProject, setActiveProject] = useState("cmv");
  const [scenario, setScenario] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState("c1");

  const [runStatus, setRunStatus] = useState("idle");
  const [runStepStates, setRunStepStates] = useState({});
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const elapsedRef = useRef(null);
  const [liveEnabled, setLiveEnabled] = useState(true);

  const startRun = (sc) => {
    setScenario(sc);
    const plan = PHASE_PLANS[sc];
    const allSteps = [...plan.phase1, ...plan.phase2, ...plan.phase3];
    const initial = {};
    allSteps.forEach((s) => (initial[s] = "pending"));
    setRunStepStates(initial);
    setRunStatus("running");
    setElapsed(0);

    clearInterval(timerRef.current);
    clearInterval(elapsedRef.current);
    elapsedRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);

    let cursor = 0;
    const sequence = [];
    plan.phase1.forEach((s) => sequence.push({ type: "single", steps: [s] }));
    sequence.push({ type: "group", steps: plan.phase2 });
    plan.phase3.forEach((s) => sequence.push({ type: "single", steps: [s] }));

    const runNext = () => {
      if (cursor >= sequence.length) {
        setRunStepStates((prev) => {
          const updated = { ...prev };
          if (plan.finalWarning) updated[plan.finalWarning.module] = "warn";
          return updated;
        });
        setRunStatus(plan.finalWarning ? "completed_with_warnings" : "completed");
        clearInterval(elapsedRef.current);
        return;
      }
      const group = sequence[cursor];
      setRunStepStates((prev) => {
        const updated = { ...prev };
        group.steps.forEach((s) => (updated[s] = "running"));
        return updated;
      });
      setTimeout(() => {
        setRunStepStates((prev) => {
          const updated = { ...prev };
          group.steps.forEach((s) => (updated[s] = "completed"));
          return updated;
        });
        cursor += 1;
        timerRef.current = setTimeout(runNext, 500);
      }, group.type === "group" ? 1600 : 700);
    };
    timerRef.current = setTimeout(runNext, 300);
  };

  useEffect(() => () => { clearInterval(timerRef.current); clearInterval(elapsedRef.current); }, []);

  let content;
  switch (page) {
    case "dashboard":
      content = <DashboardPage setPage={setPage} setActiveProject={setActiveProject} />;
      break;
    case "new-analysis":
      content = <NewAnalysisPage setPage={setPage} scenario={scenario} setScenario={setScenario} />;
      break;
    case "optimize":
      content = <ScenarioLandingPage scenario="OPTIMIZE" setPage={setPage} startRun={startRun} />;
      break;
    case "discover":
      content = <ScenarioLandingPage scenario="DISCOVER" setPage={setPage} startRun={startRun} />;
      break;
    case "design":
      content = <ScenarioLandingPage scenario="DESIGN" setPage={setPage} startRun={startRun} />;
      break;
    case "pipeline-run":
      content = <PipelineRunPage scenario={scenario} runStatus={runStatus} runStepStates={runStepStates} elapsed={elapsed} setPage={setPage} startRun={startRun} />;
      break;
    case "candidates":
      content = <CandidatesPage setPage={setPage} setSelectedCandidateId={setSelectedCandidateId} activeProject={activeProject} />;
      break;
    case "candidate-detail":
      content = <CandidateDetailPage candidateId={selectedCandidateId} setPage={setPage} liveEnabled={liveEnabled} />;
      break;
    case "evidence":
      content = <EvidenceCardPage candidateId={selectedCandidateId} setPage={setPage} liveEnabled={liveEnabled} />;
      break;
    case "ranking":
      content = <RankingPage setPage={setPage} setSelectedCandidateId={setSelectedCandidateId} />;
      break;
    case "feature-matrix":
      content = <FeatureMatrixPage setPage={setPage} setSelectedCandidateId={setSelectedCandidateId} />;
      break;
    case "validation":
      content = <ValidationPage />;
      break;
    case "data-sources":
      content = <DataSourcesPage liveEnabled={liveEnabled} setLiveEnabled={setLiveEnabled} />;
      break;
    case "settings":
      content = <SettingsPage liveEnabled={liveEnabled} setLiveEnabled={setLiveEnabled} />;
      break;
    default:
      content = <DashboardPage setPage={setPage} setActiveProject={setActiveProject} />;
  }

  return (
    <div className="vx-root" dir="rtl" lang="fa">
      <GlobalStyle />
      <Sidebar page={page} setPage={setPage} />
      <div className="vx-main">
        <TopBar page={page} activeProject={activeProject} liveEnabled={liveEnabled} />
        <div className="vx-content">{content}</div>
      </div>
    </div>
  );
}
