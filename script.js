const requisitos = {
  MA1002: ["MA1001"],
  MA1102: ["MA1101"],
  FI1100: ["FI1000", "MA1101", "MA1001"],
  CD1201: ["CD1100"],
  MA2001: ["MA1002", "MA1102"],
  MA2601: ["MA1002", "MA1102"],
  FI2001: ["FI1100", "MA1102", "MA1002"],
  FI2003: ["FI1100", "MA1002"],
  MA2002: ["MA2001", "MA2601"],
  IN2201: ["MA2001"],
  FI2002: ["MA2001", "MA2601", "FI2003"],
  FI2004: ["IQ2211", "FI2001", "MA2001"],
  CD2201: ["CD1201"]
};

const cursos = document.querySelectorAll(".curso");
const seleccionados = new Set();

function actualizarColores() {
  cursos.forEach(curso => {
    const id = curso.dataset.id;
    curso.classList.remove("seleccionado", "habilitado", "requisito");

    if (seleccionados.has(id)) {
      curso.classList.add("seleccionado");
    } else if (requisitos[id]) {
      if (requisitos[id].every(req => seleccionados.has(req))) {
        curso.classList.add("habilitado");
      }
    }

    // marcar requisitos si el curso está seleccionado
    if (seleccionados.has(id) && requisitos[id]) {
      requisitos[id].forEach(req => {
        const reqCurso = document.querySelector(`[data-id="${req}"]`);
        if (reqCurso) reqCurso.classList.add("requisito");
      });
    }
  });
}

cursos.forEach(curso => {
  curso.addEventListener("click", () => {
    const id = curso.dataset.id;
    if (seleccionados.has(id)) {
      seleccionados.delete(id);
    } else {
      seleccionados.add(id);
    }
    actualizarColores();
  });
});

actualizarColores();