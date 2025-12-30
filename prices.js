const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-1Qxtw6V-yS2FV5jsU0tOrEsUIZxXlCzGT0DuTLQf2aGoNHcRwzpsr-s6dzm8m5H24e4MJO_TCkds/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    const container = document.getElementById("precios");

    rows.forEach(row => {
      const [concepto, precio, moneda] = row.split(",");
      if (concepto && precio) {
        const div = document.createElement("div");
        div.className = "precio-item";
        div.innerHTML = `
          <span>${concepto}</span>
          <strong>$${precio} ${moneda}</strong>
        `;
        container.appendChild(div);
      }
    });
  });
