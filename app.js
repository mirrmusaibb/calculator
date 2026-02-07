class CalculatorState {
  constructor() {
    this.resetAll();
    this.history = [];
    this.memory = 0;
    this.mode = "standard";
  }

  resetAll() {
    this.current = "0";
    this.previous = null;
    this.operator = null;
    this.waitingForNew = false;
  }
}

class CalculatorEngine {
  static compute(a, b, op) {
    a = Number(a);
    b = Number(b);
    switch (op) {
      case "add": return a + b;
      case "subtract": return a - b;
      case "multiply": return a * b;
      case "divide": return b === 0 ? "Error" : a / b;
      default: return b;
    }
  }

  static percent(state) {
    if (!state.operator || state.previous === null) return;
    const base = Number(state.previous);
    state.current = String((base * Number(state.current)) / 100);
  }
}

const state = new CalculatorState();
const resultEl = document.getElementById("result");
const exprEl = document.getElementById("expression");
const historyEl = document.getElementById("history");

function updateDisplay() {
  resultEl.textContent = state.current;
  exprEl.textContent = state.previous && state.operator
    ? `${state.previous} ${symbol(state.operator)}`
    : "";
}

function symbol(op) {
  return { add: "+", subtract: "−", multiply: "×", divide: "÷" }[op];
}

function handleDigit(d) {
  if (state.waitingForNew) {
    state.current = d;
    state.waitingForNew = false;
  } else {
    state.current = state.current === "0" ? d : state.current + d;
  }
}

function handleOperator(op) {
  if (state.operator && !state.waitingForNew) {
    const res = CalculatorEngine.compute(
      state.previous,
      state.current,
      state.operator
    );
    state.previous = res;
    state.current = String(res);
  } else {
    state.previous = state.current;
  }
  state.operator = op;
  state.waitingForNew = true;
}

function handleEquals() {
  if (!state.operator) return;
  const res = CalculatorEngine.compute(
    state.previous,
    state.current,
    state.operator
  );
  state.history.unshift(`${state.previous} ${symbol(state.operator)} ${state.current} = ${res}`);
  historyEl.innerHTML = state.history.map(h => `<div>${h}</div>`).join("");
  state.current = String(res);
  state.operator = null;
  state.previous = null;
  state.waitingForNew = true;
}

document.body.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.digit) handleDigit(btn.dataset.digit);
  if (btn.dataset.action) {
    const a = btn.dataset.action;
    if (["add","subtract","multiply","divide"].includes(a)) handleOperator(a);
    if (a === "equals") handleEquals();
    if (a === "clear") state.resetAll();
    if (a === "decimal" && !state.current.includes(".")) state.current += ".";
    if (a === "percent") CalculatorEngine.percent(state);
    if (a === "backspace") state.current = state.current.length > 1
      ? state.current.slice(0, -1)
      : "0";
    if (a === "mc") state.memory = 0;
    if (a === "mr") state.current = String(state.memory);
    if (a === "mplus") state.memory += Number(state.current);
    if (a === "mminus") state.memory -= Number(state.current);
    if (a === "ms") state.memory = Number(state.current);
  }

  updateDisplay();
});

document.querySelectorAll(".mode-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode-switch button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".keypad").forEach(k => k.classList.add("hidden"));
    document.getElementById(`keypad-${btn.dataset.mode}`).classList.remove("hidden");
  });
});

updateDisplay();
