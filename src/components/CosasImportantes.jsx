import React from "react";

const CosasImportantes = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>📌 Cosas importantes</h2>

      <ul style={styles.lista}>
        <li style={styles.item}>
          <strong style={styles.destacado}>👗 Vestimenta:</strong><br />
          El blanco y el azul son colores hermosos,<br />
          pero en nuestra boda son exclusivos para la <strong>NOVIA</strong> y las <strong>damas de honor</strong>.
        </li>
        <li style={styles.item}>
          <strong style={styles.destacado}>📸 Fotografía:</strong><br />
          Queremos que disfrutes el momento. Tenemos fotógrafo, así que guarda el celular y ¡déjate sorprender!
        </li>
        <li style={styles.item}>
          <strong style={styles.destacado}>🎟️ Invitados:</strong><br />
          La invitación es válida solo para las personas que aparecen en la lista. Agradecemos tu comprensión.
        </li>
        <li style={styles.item}>
          <strong style={styles.destacado}>⏰ Niños y puntualidad:</strong><br />
          Por favor, cuida a tus niños durante el evento y llega a tiempo para seguir el itinerario.
        </li>
      </ul>

      <div style={styles.gifContainer}>
        <img 
          src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" 
          alt="Fiesta gif" 
          style={styles.gif}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#526890",
    color: "#202d45",
    padding: "2rem",
    maxWidth: "700px",
    margin: "2rem auto",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  titulo: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    fontFamily: "'Galada', cursive",
  },
  lista: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    marginBottom: "1.5rem",
    fontSize: "1.1rem",
    lineHeight: "1.6",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "1rem",
    borderRadius: "8px",
  },
  destacado: {
    color: "#202d45",
  },
  gifContainer: {
    marginTop: "1.5rem",
    textAlign: "center",
  },
  gif: {
    width: "100px",
    borderRadius: "10px",
  },
};

export default CosasImportantes;