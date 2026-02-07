const result = document.getElementById("result");
const expr = document.getElementById("expression");
const sciRow = document.getElementById("sci-row");

let current = "0";
let previous = null;
let operator = null;
let justEvaluated = false;

/* ---------- DISPLAY ---------- */
function update() {
  result.textContent = current;
  expr.textContent =
    previous !== null && operator ? `${previous} ${operator}` : "";
}

/* ---------- CORE MATH ---------- */
function compute(a, b, op) {
  a = Number(a);
  b = Number(b);
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Error" : a / b;
  return b;
}

/* ---------- NUMBER INPUT ---------- */
function inputDigit(d) {
  if (justEvaluated) {
    current = d;
    justEvaluated = false;
    return;
  }
  current = current === "0" ? d : current + d;
}

/* ---------- OPERATORS ---------- */
function inputOperator(op) {
  if (operator && previous !== null && !justEvaluated) {
    current = String(compute(previous, current, operator));
  }
  previous = current;
  operator = op;
  justEvaluated = false;
  current = "0";
}

/* ---------- EQUALS ---------- */
function evaluate() {
  if (!operator || previous === null) return;
  current = String(compute(previous, current, operator));
  previous = null;
  operator = null;
  justEvaluated = true;
}

/* ---------- SCIENTIFIC ---------- */
function applyFunction(fn) {
  let x = Number(current);
  if (fn === "sin") current = String(Math.sin(x));
  if (fn === "cos") current = String(Math.cos(x));
  if (fn === "tan") current = String(Math.tan(x));
  if (fn === "sqrt") current = String(Math.sqrt(x));
  previous = null;
  operator = null;
  justEvaluated = true;
}

/* ---------- MOUSE INPUT ---------- */
document.body.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.num) inputDigit(btn.dataset.num);

  if (btn.dataset.op) inputOperator(btn.dataset.op);

  if (btn.dataset.action === "eq") evaluate();

  if (btn.dataset.action === "c") {
    current = "0";
    previous = null;
    operator = null;
    justEvaluated = false;
  }

  if (btn.dataset.action === "ce") {
    current = "0";
  }

  if (btn.dataset.action === "back") {
    current = current.length > 1 ? current.slice(0, -1) : "0";
  }

  if (btn.dataset.action === "dot") {
    if (!current.includes(".")) current += ".";
  }

  if (btn.dataset.action === "sign") {
    current = String(-Number(current));
  }

  if (btn.dataset.action === "toggle-sci") {
    sciRow.classList.toggle("open");
  }

  if (btn.dataset.fn) applyFunction(btn.dataset.fn);

  update();
});

/* ---------- KEYBOARD ---------- */
document.addEventListener("keydown", e => {
  if (e.key >= "0" && e.key <= "9") inputDigit(e.key);

  if (["+","-","*","/"].includes(e.key)) inputOperator(e.key);

  if (e.key === "Enter") {
    e.preventDefault();
    evaluate();
  }

  if (e.key === "Backspace") {
    current = current.length > 1 ? current.slice(0, -1) : "0";
  }

  if (e.key === "Escape") {
    current = "0";
    previous = null;
    operator = null;
    justEvaluated = false;
  }

  if (e.key === "." && !current.includes(".")) current += ".";

  // scientific shortcuts
  if (e.key.toLowerCase() === "s") applyFunction("sin");
  if (e.key.toLowerCase() === "c") applyFunction("cos");
  if (e.key.toLowerCase() === "t") applyFunction("tan");
  if (e.key.toLowerCase() === "r") applyFunction("sqrt");

  update();
});

update();
