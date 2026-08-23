/**
 * 🧮 LOAN & INTEREST CALCULATOR ENGINE (VIETNAM BANK STANDARD)
 * Phiên bản: 4.0 (Chuẩn Ngân Hàng Việt Nam: Năm đầu Cố Định, Năm sau Thả Nổi, Tối đa 60 Tháng)
 */

(function () {
  "use strict";

  // 1. STATE (Chuẩn tín dụng ô tô tại Việt Nam)
  const state = {
    loanAmount: 200000000, // 200 Triệu VNĐ mặc định
    loanTermMonths: 60, // Tối đa 60 tháng (5 năm)
    fixedRateYear: 7.5, // Lãi suất cố định năm đầu (%/năm)
    floatingRateYear: 10.5, // Lãi suất thả nổi các năm sau (%/năm)
    showFullSchedule: false
  };

  // Helper: Format Currency (VND)
  function formatVND(amount) {
    if (isNaN(amount) || amount === null) return "0 đ";
    return Math.round(amount).toLocaleString("vi-VN") + " đ";
  }

  function formatShortMillion(amount) {
    if (isNaN(amount)) return "0 Tr";
    const millions = amount / 1000000;
    return (millions >= 100 ? Math.round(millions) : millions.toFixed(1)) + " Triệu";
  }

  // 2. CORE CALCULATION ENGINE (2 GIAI ĐOẠN: CỐ ĐỊNH NĂM ĐẦU & THẢ NỔI NĂM SAU)
  function calculateLoan() {
    const loanAmount = state.loanAmount;
    const term = Math.min(60, Math.max(12, state.loanTermMonths)); // Khóa cứng 12 - 60 tháng
    const monthlyPrincipal = term > 0 ? loanAmount / term : 0;
    const schedule = [];
    let totalInterestPaid = 0;

    for (let i = 1; i <= term; i++) {
      const isYear1 = i <= 12;
      const currentAnnualRate = isYear1 ? state.fixedRateYear : state.floatingRateYear;
      const monthlyRate = (currentAnnualRate / 100) / 12;

      const startBalance = loanAmount - (i - 1) * monthlyPrincipal;
      const interest = startBalance * monthlyRate;
      const payment = monthlyPrincipal + interest;
      const endBalance = Math.max(0, startBalance - monthlyPrincipal);

      totalInterestPaid += interest;

      schedule.push({
        month: i,
        isYear1: isYear1,
        ratePct: currentAnnualRate,
        startBalance: startBalance,
        principal: monthlyPrincipal,
        interest: interest,
        totalPayment: payment,
        endBalance: endBalance
      });
    }

    const firstMonthInterest = schedule.length > 0 ? schedule[0].interest : 0;
    const firstMonthPayment = schedule.length > 0 ? schedule[0].totalPayment : 0;
    const month13Payment = schedule.length >= 13 ? schedule[12].totalPayment : null;
    const month13Interest = schedule.length >= 13 ? schedule[12].interest : null;
    const lastMonthPayment = schedule.length > 0 ? schedule[schedule.length - 1].totalPayment : 0;
    const averageMonthlyPayment = schedule.length > 0 ? (loanAmount + totalInterestPaid) / term : 0;
    const totalOverallCost = loanAmount + totalInterestPaid;

    // Financial Ratio Calculations (Gốc vs Lãi)
    const pctPrincipal = totalOverallCost > 0 ? ((loanAmount / totalOverallCost) * 100).toFixed(1) : "85";
    const pctInterest = totalOverallCost > 0 ? ((totalInterestPaid / totalOverallCost) * 100).toFixed(1) : "15";

    return {
      loanAmount,
      term,
      monthlyPrincipal,
      firstMonthInterest,
      firstMonthPayment,
      month13Payment,
      month13Interest,
      lastMonthPayment,
      averageMonthlyPayment,
      totalInterestPaid,
      totalOverallCost,
      pctPrincipal,
      pctInterest,
      schedule
    };
  }

  // 3. DOM UPDATER
  function updateUI() {
    const calc = calculateLoan();

    // 3.1 Summary Card Highlights
    const elFirstMonth = document.getElementById("calc-first-month-val");
    const elFirstMonthSub = document.getElementById("calc-first-month-sub");
    const elMonth13Box = document.getElementById("calc-month13-box");
    const elMonth13Val = document.getElementById("calc-month13-val");
    const elLoanAmountVal = document.getElementById("calc-loan-amount-val");
    const elMonthlyPrincipal = document.getElementById("calc-monthly-principal-val");
    const elFirstInterest = document.getElementById("calc-first-interest-val");
    const elLastMonth = document.getElementById("calc-last-month-val");
    const elAvgMonth = document.getElementById("calc-avg-month-val");
    const elTotalInterest = document.getElementById("calc-total-interest-val");
    const elTotalCost = document.getElementById("calc-total-cost-val");
    const elLoanBadge = document.getElementById("badge-loan-amount");

    if (elFirstMonth) elFirstMonth.textContent = formatVND(calc.firstMonthPayment);
    if (elFirstMonthSub) {
      elFirstMonthSub.textContent = "(Gốc: " + formatVND(calc.monthlyPrincipal) + " + Lãi cố định năm đầu: " + formatVND(calc.firstMonthInterest) + ")";
    }

    if (elMonth13Box && elMonth13Val) {
      if (calc.month13Payment !== null) {
        elMonth13Box.style.display = "flex";
        elMonth13Val.textContent = formatVND(calc.month13Payment) + "/tháng";
      } else {
        elMonth13Box.style.display = "none";
      }
    }

    if (elLoanAmountVal) elLoanAmountVal.textContent = formatVND(calc.loanAmount);
    if (elMonthlyPrincipal) elMonthlyPrincipal.textContent = formatVND(calc.monthlyPrincipal) + "/tháng";
    if (elFirstInterest) elFirstInterest.textContent = formatVND(calc.firstMonthInterest);
    if (elLastMonth) elLastMonth.textContent = formatVND(calc.lastMonthPayment);
    if (elAvgMonth) elAvgMonth.textContent = "~" + formatVND(calc.averageMonthlyPayment);
    if (elTotalInterest) elTotalInterest.textContent = formatVND(calc.totalInterestPaid);
    if (elTotalCost) elTotalCost.textContent = formatVND(calc.totalOverallCost);
    if (elLoanBadge) elLoanBadge.textContent = formatShortMillion(calc.loanAmount);

    // 3.2 Mobile Sticky Bar Value
    const elMobileQuoteVal = document.getElementById("mobile-quote-val");
    const elMobileLoanTitle = document.getElementById("mobile-quote-car-name");
    if (elMobileQuoteVal) elMobileQuoteVal.textContent = formatVND(calc.firstMonthPayment) + "/tháng";
    if (elMobileLoanTitle) elMobileLoanTitle.textContent = "Vay " + formatShortMillion(calc.loanAmount) + " (" + (state.loanTermMonths / 12) + "N - Tối đa 5N)";

    // 3.3 Label Badges on Sliders
    const elLoanTermBadge = document.getElementById("badge-loan-term");
    const elFixedRateBadge = document.getElementById("badge-fixed-rate");
    const elFloatingRateBadge = document.getElementById("badge-floating-rate");

    if (elLoanTermBadge) elLoanTermBadge.textContent = (state.loanTermMonths / 12) + " Năm (" + state.loanTermMonths + " Tháng)";
    if (elFixedRateBadge) elFixedRateBadge.textContent = state.fixedRateYear + "% / năm";
    if (elFloatingRateBadge) elFloatingRateBadge.textContent = state.floatingRateYear + "% / năm";

    // 3.4 Visual Ratio Bar (Tiền Gốc vs Tiền Lãi)
    const elBarLoan = document.getElementById("ratio-bar-loan");
    const elBarInterest = document.getElementById("ratio-bar-interest");
    const elLblLoan = document.getElementById("ratio-lbl-loan");
    const elLblInterest = document.getElementById("ratio-lbl-interest");

    if (elBarLoan) elBarLoan.style.width = calc.pctPrincipal + "%";
    if (elBarInterest) elBarInterest.style.width = calc.pctInterest + "%";
    if (elLblLoan) elLblLoan.textContent = "Tiền gốc: " + formatShortMillion(calc.loanAmount) + " (" + calc.pctPrincipal + "%)";
    if (elLblInterest) elLblInterest.textContent = "Tiền lãi: " + formatShortMillion(calc.totalInterestPaid) + " (" + calc.pctInterest + "%)";

    // 3.5 Slider Dynamic Background Fills
    const sliderTerm = document.getElementById("slider-loan-term");
    const sliderFixedRate = document.getElementById("slider-fixed-rate");
    const sliderFloatingRate = document.getElementById("slider-floating-rate");

    if (sliderTerm) {
      const pct = ((state.loanTermMonths - 12) / (60 - 12)) * 100;
      sliderTerm.style.setProperty("--slider-fill", pct + "%");
    }
    if (sliderFixedRate) {
      const pct = ((state.fixedRateYear - 5.5) / (9.5 - 5.5)) * 100;
      sliderFixedRate.style.setProperty("--slider-fill", pct + "%");
    }
    if (sliderFloatingRate) {
      const pct = ((state.floatingRateYear - 9.0) / (13.5 - 9.0)) * 100;
      sliderFloatingRate.style.setProperty("--slider-fill", pct + "%");
    }

    // 3.6 Method Explanation Box
    const elFormulaDesc = document.getElementById("formula-method-desc");
    if (elFormulaDesc) {
      let descHtml = "• <strong>Năm 1 (Tháng 1 - 12):</strong> Áp dụng lãi suất ưu đãi cố định <strong>" + state.fixedRateYear + "%/năm</strong>. Tiền trả tháng đầu: <strong>" + formatVND(calc.firstMonthPayment) + "</strong> (giảm dần đều mỗi tháng).<br>";
      if (calc.schedule.length > 12) {
        descHtml += "• <strong>Năm 2 - " + (calc.term / 12) + " (Tháng 13 - " + calc.term + "):</strong> Chuyển sang lãi suất thả nổi thị trường ước tính <strong>" + state.floatingRateYear + "%/năm</strong>. Tiền trả tháng 13 là <strong>" + formatVND(calc.month13Payment) + "</strong> (sau đó tiếp tục giảm dần về <strong>" + formatVND(calc.lastMonthPayment) + "</strong> ở tháng cuối).";
      } else {
        descHtml += "• Khoản vay 12 tháng được cố định lãi suất ưu đãi trọn gói toàn bộ kỳ hạn.";
      }
      elFormulaDesc.innerHTML = descHtml;
    }

    // 3.7 Render Amortization Schedule Table
    renderScheduleTable(calc.schedule);
  }

  // 4. AMORTIZATION TABLE RENDERER
  function renderScheduleTable(schedule) {
    const tbody = document.getElementById("amortization-table-body");
    const toggleBtn = document.getElementById("btn-toggle-schedule");
    if (!tbody) return;

    const displayRows = state.showFullSchedule ? schedule : schedule.slice(0, 12);

    let html = "";
    displayRows.forEach(row => {
      const badgeHtml = row.isYear1
        ? "<span style=\"background: rgba(16,185,129,0.12); color: #059669; font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px;\">Cố định " + row.ratePct + "%</span>"
        : "<span style=\"background: rgba(245,158,11,0.12); color: #D97706; font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px;\">Thả nổi " + row.ratePct + "%</span>";

      html += "<tr>" +
        "<td><strong>Tháng " + row.month + "</strong></td>" +
        "<td>" + badgeHtml + "</td>" +
        "<td>" + formatVND(row.startBalance) + "</td>" +
        "<td>" + formatVND(row.principal) + "</td>" +
        "<td style=\"color: #EF4444; font-weight: 600;\">" + formatVND(row.interest) + "</td>" +
        "<td class=\"td-total\">" + formatVND(row.totalPayment) + "</td>" +
        "<td>" + formatVND(row.endBalance) + "</td>" +
      "</tr>";
    });

    tbody.innerHTML = html;

    if (toggleBtn) {
      if (schedule.length <= 12) {
        toggleBtn.style.display = "none";
      } else {
        toggleBtn.style.display = "inline-flex";
        toggleBtn.textContent = state.showFullSchedule
          ? "Thu gọn xem 12 tháng đầu ▲"
          : "Xem chi tiết toàn bộ " + schedule.length + " tháng (" + (schedule.length / 12) + " năm) ▼";
      }
    }
  }

  // 5. COPY TO ZALO SCRIPT
  function copyZaloScript() {
    const calc = calculateLoan();
    const termYears = state.loanTermMonths / 12;

    let text = "📊 BẢNG TÍNH LÃI SUẤT VAY Ô TÔ (CHUẨN NGÂN HÀNG VN) - AUTO 28\n" +
"━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
"🏦 SỐ TIỀN CẦN VAY: " + formatVND(calc.loanAmount) + "\n" +
"⏳ Thời gian vay: " + termYears + " năm (" + state.loanTermMonths + " tháng - Tối đa 5 năm)\n" +
"📌 Tiền gốc trả đều hàng tháng: " + formatVND(calc.monthlyPrincipal) + "/tháng\n" +
"━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
"📈 GIAI ĐOẠN 1 (NĂM ĐẦU CỐ ĐỊNH " + state.fixedRateYear + "%/NĂM):\n" +
"👉 Tháng 1 (Trả cao nhất): " + formatVND(calc.firstMonthPayment) + "/tháng\n" +
"   (Gốc: " + formatVND(calc.monthlyPrincipal) + " | Lãi cố định: " + formatVND(calc.firstMonthInterest) + ")\n";

    if (calc.schedule.length > 12) {
      text += "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
"📉 GIAI ĐOẠN 2 (NĂM SAU THẢ NỔI ~" + state.floatingRateYear + "%/NĂM):\n" +
"👉 Tháng 13 (Bắt đầu thả nổi): " + formatVND(calc.month13Payment) + "/tháng\n" +
"👉 Tháng cuối cùng (Thấp nhất): " + formatVND(calc.lastMonthPayment) + "/tháng\n";
    } else {
      text += "👉 Tháng cuối cùng: " + formatVND(calc.lastMonthPayment) + "/tháng\n";
    }

    text += "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
"💰 Tổng tiền lãi toàn kỳ: " + formatVND(calc.totalInterestPaid) + "\n" +
"💳 Tổng thanh toán (Gốc + Lãi): " + formatVND(calc.totalOverallCost) + "\n" +
"━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
"🛡️ CHÍNH SÁCH HỖ TRỢ VAY TẠI AUTO 28:\n" +
"✓ Vay tối đa 50% - 60% giá trị xe lướt, thời hạn tối đa 5 năm (60 tháng).\n" +
"✓ Duyệt hồ sơ nhanh qua CCCD trong 15 phút, giải ngân 24h.\n\n" +
"📞 Hotline tư vấn: 0888.81.38.38\n" +
"📍 Showroom: 8F Trịnh Hoài Đức, P. Hiệp Phú, TP. Thủ Đức, TP.HCM\n" +
"🌐 Bảng tính trực tuyến: https://auto28.vn/tinh-tra-gop.html";

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("📋 Đã sao chép bảng tính lãi suất Zalo!");
      }).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }

    if (window.TrackingPipeline && typeof window.TrackingPipeline.trackEvent === "function") {
      window.TrackingPipeline.trackEvent("loan_script_copied", {
        loan_amount: calc.loanAmount,
        term_months: state.loanTermMonths,
        fixed_rate: state.fixedRateYear,
        floating_rate: state.floatingRateYear
      });
    }
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast("📋 Đã sao chép bảng tính lãi suất Zalo!");
    } catch (err) {
      alert("Không thể sao chép tự động, bạn có thể chụp màn hình bảng tính!");
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    let toast = document.getElementById("calc-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "calc-toast";
      toast.className = "toast-capsule";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // 6. EVENT LISTENERS SETUP
  function initEventListeners() {
    // 6.1 Loan Amount Preset Chips
    const loanChips = document.querySelectorAll(".loan-amount-chip");
    loanChips.forEach(chip => {
      chip.addEventListener("click", function () {
        loanChips.forEach(c => c.classList.remove("active"));
        this.classList.add("active");

        const val = parseInt(this.getAttribute("data-amount"), 10);
        if (!isNaN(val)) {
          state.loanAmount = val;
          const loanInput = document.getElementById("input-loan-amount");
          if (loanInput) loanInput.value = state.loanAmount.toLocaleString("vi-VN");
          updateUI();
        }
      });
    });

    // 6.2 Custom Loan Amount Input
    const loanInput = document.getElementById("input-loan-amount");
    if (loanInput) {
      loanInput.addEventListener("input", function () {
        const rawVal = this.value.replace(/\D/g, "");
        const numVal = parseInt(rawVal, 10) || 0;
        state.loanAmount = numVal;
        this.value = numVal > 0 ? numVal.toLocaleString("vi-VN") : "";

        loanChips.forEach(c => {
          const chipVal = parseInt(c.getAttribute("data-amount"), 10);
          if (chipVal === numVal) {
            c.classList.add("active");
          } else {
            c.classList.remove("active");
          }
        });

        updateUI();
      });
    }

    // 6.3 Loan Term Slider & Quick Buttons (Max 60 Months)
    const sliderTerm = document.getElementById("slider-loan-term");
    if (sliderTerm) {
      sliderTerm.addEventListener("input", function () {
        state.loanTermMonths = parseInt(this.value, 10);
        updateQuickButtons(".quick-term-btn", state.loanTermMonths);
        updateUI();
      });
    }

    const termBtns = document.querySelectorAll(".quick-term-btn");
    termBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const val = parseInt(this.getAttribute("data-val"), 10);
        state.loanTermMonths = val;
        if (sliderTerm) sliderTerm.value = val;
        updateQuickButtons(".quick-term-btn", val);
        updateUI();
      });
    });

    // 6.4 Fixed Rate Year 1 Slider
    const sliderFixed = document.getElementById("slider-fixed-rate");
    if (sliderFixed) {
      sliderFixed.addEventListener("input", function () {
        state.fixedRateYear = parseFloat(this.value);
        document.querySelectorAll(".bank-select-btn").forEach(b => b.classList.remove("active"));
        updateUI();
      });
    }

    // 6.5 Floating Rate Years After Slider
    const sliderFloating = document.getElementById("slider-floating-rate");
    if (sliderFloating) {
      sliderFloating.addEventListener("input", function () {
        state.floatingRateYear = parseFloat(this.value);
        updateUI();
      });
    }

    // 6.6 Bank Quick Selector (Sets Year 1 Fixed Rate)
    const bankBtns = document.querySelectorAll(".bank-select-btn");
    bankBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        bankBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        const fixedRate = parseFloat(this.getAttribute("data-rate"));
        const floatingRate = parseFloat(this.getAttribute("data-floating")) || 10.5;

        if (!isNaN(fixedRate)) {
          state.fixedRateYear = fixedRate;
          if (sliderFixed) sliderFixed.value = fixedRate;
        }
        if (!isNaN(floatingRate)) {
          state.floatingRateYear = floatingRate;
          if (sliderFloating) sliderFloating.value = floatingRate;
        }
        updateUI();
      });
    });

    // 6.7 Toggle Schedule Table Button
    const btnToggleSchedule = document.getElementById("btn-toggle-schedule");
    if (btnToggleSchedule) {
      btnToggleSchedule.addEventListener("click", function () {
        state.showFullSchedule = !state.showFullSchedule;
        updateUI();
      });
    }

    // 6.8 Copy Zalo Button
    const btnCopyZalo = document.getElementById("btn-copy-zalo");
    if (btnCopyZalo) {
      btnCopyZalo.addEventListener("click", copyZaloScript);
    }

    // 6.9 Print Table Button
    const btnPrint = document.getElementById("btn-print-table");
    if (btnPrint) {
      btnPrint.addEventListener("click", function () {
        window.print();
      });
    }

    // 6.10 FAQ Accordion Interaction
    const faqItems = document.querySelectorAll(".faq-accordion-item");
    faqItems.forEach(item => {
      item.addEventListener("click", function () {
        const isActive = this.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isActive) {
          this.classList.add("active");
        }
      });
    });

    // Helper for quick active button states
    function updateQuickButtons(selector, currentVal) {
      const buttons = document.querySelectorAll(selector);
      buttons.forEach(btn => {
        const val = parseFloat(btn.getAttribute("data-val"));
        if (val === currentVal) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }
  }

  // 7. INITIALIZE ON DOM READY
  document.addEventListener("DOMContentLoaded", function () {
    const loanInput = document.getElementById("input-loan-amount");
    if (loanInput && state.loanAmount) {
      loanInput.value = state.loanAmount.toLocaleString("vi-VN");
    }
    initEventListeners();
    updateUI();
  });

})();
