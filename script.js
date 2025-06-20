const calendar = document.getElementById("calendar");
const modal = document.getElementById("modal");
const noteField = document.getElementById("note");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
let selectedDate = null;

function generateCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  document.getElementById("month-label").innerText =
    today.toLocaleString("default", { month: "long" }) + " " + year;

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";
    const dateStr = `${year}-${month + 1}-${day}`;
    cell.dataset.date = dateStr;
    cell.innerHTML = `<div>${day}</div>`;

    const saved = JSON.parse(localStorage.getItem(dateStr));
    if (saved) {
      const dot = document.createElement("div");
      dot.className = `dot ${saved.status}`;
      cell.appendChild(dot);
      if (saved.note) {
        const note = document.createElement("div");
        note.innerText = saved.note;
        note.style.fontSize = "10px";
        note.style.marginTop = "10px";
        cell.appendChild(note);
      }
    }

    cell.addEventListener("click", () => {
      selectedDate = dateStr;
      modal.classList.remove("hidden");
      noteField.value = saved ? saved.note : "";
      document.querySelectorAll('input[name="status"]').forEach(input => {
        input.checked = saved && input.value === saved.status;
      });
    });

    calendar.appendChild(cell);
  }
}

saveBtn.onclick = () => {
  const status = document.querySelector('input[name="status"]:checked')?.value;
  const note = noteField.value;
  if (status) {
    localStorage.setItem(
      selectedDate,
      JSON.stringify({ status, note })
    );
    modal.classList.add("hidden");
    generateCalendar();
  }
};

cancelBtn.onclick = () => {
  modal.classList.add("hidden");
};

generateCalendar();
