import './Ceremonia/Ceremonias.css'
import CosasImportantes from './CosasImportantes';
const DressCode = () => {
  return (
     <section className="ceremonias-container dresscode-container">
        <div className="evento">
          <div className="icono">
            <img src="/icons/dresscode.gif" alt="Code" />
          </div>
          <div className="info">
            <h1 className="ceremonias-titulo" >Dress code</h1>
            <h4  className="ceremonias-titulo2">Formal Elegante</h4>

            <p> <br />
            El blanco y el azul son colores hermosos,<br />
            pero en nuestra boda son exclusivos para la <strong>NOVIA</strong> y las <strong>DAMAS DE HONOR</strong>.</p>
          </div>
        </div>
</section>
  );
};

export default DressCode;