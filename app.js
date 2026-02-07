const result = document.getElementById("result");
const expr = document.getElementById("expression");
const sciButtons = document.querySelectorAll(".sci");

let current = "0";
let previous = null;
let operator = null;
let sciMode = false;

function update() {
  result.textContent = current;
  expr.textContent = previous && operator ? `${previous} ${operator}` : "";
}

function calculate(a, b, op) {
  a = Number(a); b = Number(b);
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Error" : a / b;
}

document.querySelector(".buttons").addEventListener("click", e => {
  const btn = e.target;
  if (!btn.dataset) return;

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
      current = String(calculate(previous, current, operator));
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

  if (btn.dataset.fn) {
    let x = Number(current);
    if (btn.dataset.fn === "sin") current = String(Math.sin(x));
    if (btn.dataset.fn === "cos") current = String(Math.cos(x));
    if (btn.dataset.fn === "tan") current = String(Math.tan(x));
    if (btn.dataset.fn === "sqrt") current = String(Math.sqrt(x));
  }

  update();
});

document.getElementById("mode-btn").onclick = () => {
  sciMode = !sciMode;
  sciButtons.forEach(b => b.style.display = sciMode ? "block" : "none");
};
