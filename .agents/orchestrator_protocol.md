# Orchestrator Protocol v3.1 — Auto 28 Multi-Agent (13 Unified Agents)
# Tiêu chuẩn: IEEE P3172 Weighted Consensus + Neural Expressive DNA Guard

---

## 1. PIPELINE 6 TẦNG (Thứ tự tuyệt đối — không được đảo)

```
TẦNG 1 — DNA GATE          Nếu vi phạm Neural Expressive ADN → BLOCK, dừng ngay
TẦNG 2 — VETO CHECK        Nếu auditor/inspector veto → STOP, chờ user approve
TẦNG 3 — DOMAIN AUTHORITY  Agent đang nói trong domain của mình → ưu tiên trước
TẦNG 4 — DYNAMIC WEIGHT    effective_weight = base_weight × context_multiplier[task_type]
TẦNG 5 — CONFIDENCE SCORE  final_vote = effective_weight × agent_confidence
TẦNG 6 — DECISION LOG      Ghi vào .agents/scratch/decisions.jsonl
```

---

## 2. TẦNG 1 — DNA GATE

> Vi phạm bất kỳ ADN nào → BLOCK toàn bộ, không tiếp tục.

| ADN | Kiểm tra | Block condition |
|---|---|---|
| ADN-1 | `backdrop-filter: blur(...)` có trong card/modal/nav? | Thiếu → BLOCK |
| ADN-2 | `border-radius` card ≥ 32px (desktop) / ≥ 24px (mobile)? | Nhỏ hơn → BLOCK |
| ADN-3 | Tiêu đề & Giá xe `font-weight: 800-900`? | < 800 → BLOCK |
| ADN-4 | Interaction dùng spring cubic-bezier + Mobile Card xếp dọc (`flex-col`)? | Vi phạm → BLOCK |

---

## 3. TẦNG 2 — VETO CHECK (8 Veto Agents)

| Agent | Veto Triggers |
|---|---|
| `landing-page-auditor` | `healthcheck_fail`, `audit_score_below_90`, `mime_type_error`, `dom_parity_fail` |
| `web_performance_architect` | `lcp_exceeds_2500ms`, `inp_exceeds_200ms`, `cls_exceeds_0_1`, `render_blocking_resource_found`, `uncompressed_static_asset` |
| `attribution_tracking_architect` | `missing_event_id_deduplication`, `unhashed_pii_violation`, `emq_score_below_8_5`, `broken_lead_webhook`, `forbidden_360_tracking_detected` |
| `visual_inspector` | `wcag_aa_fail`, `touch_target_below_44px`, `dna_adn1_fail`, `dna_adn2_fail`, `dna_adn3_fail` |
| `structure_guardian` | `uppercase_filename`, `spaces_in_filename`, `html_in_subdirectory`, `nesting_depth_exceeded` |
| `lang_standards_guardian` | `missing_doctype`, `no_lang_attribute`, `css_important_abuse`, `js_var_declaration` |
| `auto_technical_inspector` | `invalid_automotive_specs`, `taboo_slang_terms`, `dangerous_safety_claims` |
| `reflection_gate_agent` | `skipped_self_critique`, `unverified_assumption`, `scope_exceeded`, `rule_violated_agents_md` |

---

## 4. TẦNG 3 — DOMAIN AUTHORITY (13 Subagents)

Khi 2 agent mâu thuẫn → agent nào đang nói trong domain của mình được ưu tiên.
Cả hai cùng domain → xuống Tầng 4.

- `automotive_cro_architect` (gộp `cro_specialist`) → form, CTA, CVR, UX friction, MECLABS, trả góp, kiểm định 176 hạng mục
- `landing-page-auditor` → technical audit, healthcheck, scoring, DOM parity
- `web_performance_architect` → Core Web Vitals, page load architecture, LCP/INP/CLS, CRP, caching, SW
- `attribution_tracking_architect` → Server-side tracking, Meta CAPI, GA4, TikTok Events API, DataLayer, Webhook
- `seo_specialist` → SEO, AEO, GEO, schema, JSON-LD, meta, 12 trang đích dòng xe
- `guide_content_specialist` → guide content, HowTo, E-E-A-T, ngôn từ mua bán chuẩn
- `auto_technical_inspector` → automotive specs, EV metrics (SoH, BTMS, CCS2), ISO/TCVN standards
- `reflection_gate_agent` → self-critique 4 câu hỏi, kiểm soát scope compliance
- `visual_inspector` → WCAG 2.2 AA, mobile UX, vertical card layout, 2rem section spacing
- `lang_standards_guardian` → HTML5 WHATWG, CSS W3C, ECMAScript 2025, OWASP Node.js
- `code_refactorer` → code quality, refactor scripts, AST parsing, rollback
- `structure_guardian` → file naming, directory structure
- `memory_keeper` → session memory, mistake logging, decision logging
- `standard_researcher` → research, data triangulation, fact verification

---

## 5. TẦNG 4 — DYNAMIC WEIGHT (Full 13-Agent Matrix)

`effective_weight = base_weight × context_multipliers[task_type]`

| Task Type | CRO (10) | Auditor (9) | Perf (9) | Tracking (9) | SEO (8) | Guide (8) | AutoTech (8) | Reflect (8) | Visual (7) | Lang (7) | Refactor (6) | Struct (6) | Memory/Res (5) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `conversion_optimization` | **10.0** | 5.4 | 6.3 | 8.55 | 5.6 | 6.4 | 4.0 | 6.4 | 6.3 | 2.8 | 3.0 | 1.2 | 1.5 / 3.0 |
| `technical_fix` | 5.0 | **9.0** | **9.0** | 8.1 | 3.2 | 2.4 | 6.4 | **8.0** | 2.8 | **7.0** | **6.0** | 4.8 | 4.0 / 1.0 |
| `content_update` | 8.5 | 4.5 | 5.4 | 3.6 | 7.2 | **8.0** | **8.0** | 6.4 | 4.9 | 4.2 | 2.4 | 3.0 | 2.5 / **5.0** |
| `performance_audit` | 6.5 | **9.0** | **9.0** | 7.2 | 4.0 | 3.2 | 4.8 | 7.2 | 4.2 | 6.3 | 4.8 | 2.4 | 2.0 / 1.5 |
| `seo_update` | 7.0 | 6.3 | 7.2 | 5.4 | **8.0** | 7.2 | 7.2 | 6.4 | 3.5 | 5.6 | 3.6 | 3.6 | 2.0 / 4.0 |
| `system_config` | 0.0 | **9.0** | 8.1 | **9.0** | 0.0 | 0.0 | 0.0 | **8.0** | 0.0 | 6.3 | **6.0** | **6.0** | **5.0** / 0.0 |
| `full_audit` | **9.0** | **9.0** | **9.0** | 8.55 | 6.4 | 6.8 | 7.2 | **8.0** | 6.3 | **7.0** | 4.2 | 4.8 | 3.5 / 3.0 |

---

## 6. TẦNG 5 — CONFIDENCE SCORE

`final_vote = effective_weight × agent_confidence`

| Agent | Confidence threshold |
|---|---|
| `reflection_gate_agent` | 0.95 |
| `structure_guardian` | 0.95 |
| `standard_researcher` | 0.95 |
| `web_performance_architect` | 0.92 |
| `attribution_tracking_architect` | 0.92 |
| `lang_standards_guardian` | 0.92 |
| `automotive_cro_architect` | 0.90 |
| `landing-page-auditor` | 0.90 |
| `guide_content_specialist` | 0.90 |
| `auto_technical_inspector` | 0.90 |
| `memory_keeper` | 0.90 |
| `seo_specialist` | 0.85 |
| `visual_inspector` | 0.80 |
| `code_refactorer` | 0.80 |

---

## 7. TẦNG 6 — DECISION LOG

File: `.agents/scratch/decisions.jsonl`

```json
{
  "ts": "ISO-8601",
  "task": "mô tả task",
  "task_type": "technical_fix",
  "agents_consulted": ["landing-page-auditor", "code_refactorer"],
  "effective_weights": {"landing-page-auditor": 9.0, "code_refactorer": 6.0},
  "winner": "landing-page-auditor",
  "decision": "quyết định cuối cùng",
  "veto_triggered": false,
  "dna_check": "PASS",
  "confidence_final": 0.95
}
```

---

## 8. TÀI LIỆU THAM CHIẾU

- [agent_weights.json](file:///Users/phanvu/Desktop/lading-page/.agents/agent_weights.json) — Registry trọng số trung tâm v3.1 (13 Agents)
- [AGENTS.md §15](file:///Users/phanvu/Desktop/lading-page/.agents/AGENTS.md) — Summary rules
- [design-system-guide/SKILL.md](file:///Users/phanvu/Desktop/lading-page/.agents/skills/design-system-guide/SKILL.md) — Neural Expressive DNA reference
- [modules/design.md](file:///Users/phanvu/Desktop/lading-page/.agents/modules/design.md) — DNA checklist đầy đủ
