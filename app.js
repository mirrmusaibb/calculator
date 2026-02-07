const result = document.getElementById("result");
const expr = document.getElementById("expression");
const sciRow = document.getElementById("sci-row");

let current = "0";
let previous = null;
let operator = null;

function update() {
  result.textContent = current;
  expr.textContent = previous && operator ? `${previous} ${operator}` : "";
}

function compute(a, b, op) {
  a = Number(a); b = Number(b);
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Error" : a / b;
}

function applyFunction(fn) {
  let x = Number(current);
  if (fn === "sin") current = String(Math.sin(x));
  if (fn === "cos") current = String(Math.cos(x));
  if (fn === "tan") current = String(Math.tan(x));
  if (fn === "sqrt") current = String(Math.sqrt(x));
}

document.body.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.num) {
    current = current === "0" ? btn.dataset.num : current + btn.dataset.num;
  }

  if (btn.dataset.op) {
    previous = current;
    operator = btn.dataset.op;
    current = "0";
  }

  if (btn.dataset.action === "eq") {
    if (operator) {
      current = String(compute(previous, current, operator));
      previous = null;
      operator = null;
    }
  }

  if (btn.dataset.action === "c") {
    current = "0"; previous = null; operator = null;
  }

  if (btn.dataset.action === "ce") {
    current = "0";
  }

  if (btn.dataset.action === "back") {
    current = current.length > 1 ? current.slice(0, -1) : "0";
  }

  if (btn.dataset.action === "dot" && !current.includes(".")) {
    current += ".";
  }

  if (btn.dataset.action === "sign") {
    current = String(-Number(current));
  }

  if (btn.dataset.action === "toggle-sci") {
    sciRow.classList.toggle("open");
  }

  if (btn.dataset.fn) {
    applyFunction(btn.dataset.fn);
  }

  update();
});

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", e => {
  if (e.key >= "0" && e.key <= "9") {
    current = current === "0" ? e.key : current + e.key;
  }

  if (["+","-","*","/"].includes(e.key)) {
    previous = current;
    operator = e.key;
    current = "0";
  }

  if (e.key === "Enter") {
    e.preventDefault();
    if (operator) {
      current = String(compute(previous, current, operator));
      previous = null;
      operator = null;
    }
  }

  if (e.key === "Backspace") {
    current = current.length > 1 ? current.slice(0, -1) : "0";
  }

  if (e.key === "Escape") {
    current = "0"; previous = null; operator = null;
  }

  if (e.key === ".") {
    if (!current.includes(".")) current += ".";
  }

  // Scientific shortcuts
  if (e.key.toLowerCase() === "s") applyFunction("sin");
  if (e.key.toLowerCase() === "c") applyFunction("cos");
  if (e.key.toLowerCase() === "t") applyFunction("tan");
  if (e.key.toLowerCase() === "r") applyFunction("sqrt");

  update();
});

update();
