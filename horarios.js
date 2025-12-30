const horariosURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-1Qxtw6V-yS2FV5jsU0tOrEsUIZxXlCzGT0DuTLQf2aGoNHcRwzpsr-s6dzm8m5H24e4MJO_TCkds/pub?gid=1655538274&single=true&output=csv";

const mapas = {
  "Doctores": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15051.741020494503!2d-99.1629995804581!3d19.41520321097339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff2473747723%3A0x74e09157a024c943!2sC.%20Dr.%20Lucio%20242%2C%20Doctores%2C%20Cuauht%C3%A9moc%2C%2006720%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico!5e0!3m2!1ses-419!2sus!4v1767062142902!5m2!1ses-419!2sus",
  "Roma": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15051.741020494503!2d-99.1629995804581!3d19.41520321097339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3ad1f378f9%3A0x6c1acf235153c617!2sMerida%20124%2C%20Roma%20Nte.%2C%20Cuauht%C3%A9moc%2C%2006700%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico!5e0!3m2!1ses-419!2sus!4v1767062240749!5m2!1ses-419!2sus"
};
fetch(horariosURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    const contenedor = document.getElementById("horarios-dinamicos");

    const estudios = {};

    rows.forEach(row => {
      const [estudio, clase, dia, hora] = row.split(",");
      if (!estudios[estudio]) {
        estudios[estudio] = [];
      }
      estudios[estudio].push({ clase, dia, hora });
    });

    for (const estudio in estudios) {
      const card = document.createElement("div");
      card.className = "estudio-card";

      let html = `
        <div class="estudio-info">
          <h3>Estudio ${estudio}</h3>
          <ul>
      `;

      estudios[estudio].forEach(item => {
        html += `<li><strong>${item.clase}</strong> | ${item.dia} <br> ${item.hora}</li>`;
      });

      html += `</ul></div>`;

      const mapa = mapas[estudio]
        ? `<iframe src="${mapas[estudio]}" loading="lazy"></iframe>`
        : "";

      card.innerHTML = html + mapa;
      contenedor.appendChild(card);
    }
  });
