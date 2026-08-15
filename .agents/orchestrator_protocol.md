# Orchestrator Protocol v2.0 — Auto 28 Multi-Agent
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

**Ví dụ minh họa — Task: sửa CTA button màu sắc:**
```
Tầng 1: visual_inspector kiểm tra → màu vi phạm WCAG AA → BLOCK ngay, không xử lý tiếp
Tầng 2: (bị block ở tầng 1, không đến tầng 2)
Kết quả: BLOCK — user được thông báo lý do DNA fail
```

**Ví dụ minh họa — Task: tối ưu form CVR:**
```
Tầng 1: DNA check PASS
Tầng 2: Không có veto
Tầng 3: cro_specialist có domain authority "form_ux" → ưu tiên
Tầng 4: cro_specialist effective_weight = 10 × 1.0 = 10.0
Tầng 5: final_vote = 10.0 × 0.92 = 9.2 (thắng)
Tầng 6: Ghi decision log
```

---

## 2. TẦNG 1 — DNA GATE

> Vi phạm bất kỳ ADN nào → BLOCK toàn bộ, không tiếp tục.

| ADN | Kiểm tra | Block condition |
|---|---|---|
| ADN-1 | `backdrop-blur` có trong card/modal? | Thiếu → BLOCK |
| ADN-2 | `border-radius` card ≥ 32px? | < 32px → BLOCK |
| ADN-3 | Tiêu đề `font-weight: 900`? | < 900 → BLOCK |
| ADN-4 | Interaction dùng spring physics? | CSS-only transition → BLOCK |

---

## 3. TẦNG 2 — VETO CHECK

| Agent | Veto Triggers |
|---|---|
| `landing-page-auditor` | `healthcheck_fail`, `audit_score_below_90`, `mime_type_error`, `dom_parity_fail` |
| `web_performance_architect` | `lcp_exceeds_2500ms`, `inp_exceeds_200ms`, `cls_exceeds_0_1`, `render_blocking_resource_found`, `uncompressed_static_asset` |
| `visual_inspector` | `wcag_aa_fail`, `touch_target_below_44px`, `dna_adn1_fail`, `dna_adn2_fail`, `dna_adn3_fail` |
| `structure_guardian` | `uppercase_filename`, `spaces_in_filename`, `html_in_subdirectory`, `nesting_depth_exceeded` |
| `lang_standards_guardian` | `missing_doctype`, `no_lang_attribute`, `css_important_abuse`, `js_var_declaration` |
| `auto_technical_inspector` | `invalid_automotive_specs`, `taboo_slang_terms`, `dangerous_safety_claims` |
| `reflection_gate_agent` | `skipped_self_critique`, `unverified_assumption` |

---

## 4. TẦNG 3 — DOMAIN AUTHORITY

Khi 2 agent mâu thuẫn → agent nào đang nói trong domain của mình được ưu tiên.
Cả hai cùng domain → xuống Tầng 4.

**Domain map nhanh:**
- `cro_specialist` → form, CTA, CVR, UX friction
- `landing-page-auditor` → technical audit, healthcheck, scoring
- `web_performance_architect` → Core Web Vitals, page load architecture, LCP/INP/CLS, CRP, caching, SW
- `seo_specialist` → SEO, AEO, schema, JSON-LD, meta
- `visual_inspector` → WCAG, mobile UX, DNA audit
- `code_refactorer` → code quality, refactor, scripts
- `standard_researcher` → research, data, fact verification
- `guide_content_specialist` → guide content, HowTo, E-E-A-T
- `auto_technical_inspector` → automotive specs, EV metrics, ISO standards
- `structure_guardian` → file naming, directory structure
- `lang_standards_guardian` → HTML5, CSS W3C, ECMAScript, security

---

## 5. TẦNG 4 — DYNAMIC WEIGHT

`effective_weight = base_weight × context_multipliers[task_type]`

| Task Type | CRO(10) | Auditor(9) | SEO(8) | Guide(8) | Visual(7) | Refactor(6) | Researcher(5) |
|---|---|---|---|---|---|---|---|
| `conversion_optimization` | **10.0** | 5.4 | 5.6 | 6.4 | 6.3 | 3.0 | 3.0 |
| `technical_fix` | 5.0 | **9.0** | 3.2 | 2.4 | 2.8 | **6.0** | 1.0 |
| `content_update` | 8.0 | 4.5 | **7.2** | **8.0** | 4.9 | 2.4 | **5.0** |
| `performance_audit` | 6.0 | **9.0** | 4.0 | 3.2 | 4.2 | 4.8 | 1.5 |
| `seo_update` | 7.0 | 6.3 | **8.0** | 7.2 | 3.5 | 3.6 | 4.0 |
| `system_config` | 0 | **9.0** | 0 | 0 | 0 | **6.0** | 0 |
| `full_audit` | 8.0 | **9.0** | 6.4 | 6.8 | 6.3 | 4.2 | 3.0 |

---

## 6. TẦNG 5 — CONFIDENCE SCORE

`final_vote = effective_weight × agent_confidence`

| Agent | Confidence threshold |
|---|---|
| `landing-page-auditor` | 0.90 |
| `standard_researcher` | 0.95 |
| `guide_content_specialist` | 0.90 |
| `lang_standards_guardian` | 0.92 |
| `cro_specialist` | 0.85 |
| `seo_specialist` | 0.85 |
| `auto_technical_inspector` | 0.90 |
| `visual_inspector` | 0.80 |
| `code_refactorer` | 0.80 |
| `reflection_gate_agent` | 0.95 |

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

- [agent_weights.json](file:///Users/phanvu/Desktop/lading-page/.agents/agent_weights.json) — Registry trọng số trung tâm v2.1
- [AGENTS.md §15](file:///Users/phanvu/Desktop/lading-page/.agents/AGENTS.md) — Summary rules
- [design-system-guide/SKILL.md](file:///Users/phanvu/Desktop/lading-page/.agents/skills/design-system-guide/SKILL.md) — Neural Expressive DNA reference
- [modules/design.md](file:///Users/phanvu/Desktop/lading-page/.agents/modules/design.md) — DNA checklist đầy đủ