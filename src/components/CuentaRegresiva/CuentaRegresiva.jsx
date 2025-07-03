import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './cuentaRegresiva.css';

const CuentaRegresiva = ({ fechaObjetivo }) => {
  const calcularTiempoRestante = () => {
    const diferencia = new Date(fechaObjetivo) - new Date();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    return { dias, horas, minutos, segundos };
  };

  const [tiempo, setTiempo] = useState(calcularTiempoRestante());

  useEffect(() => {
    const timer = setInterval(() => {
      setTiempo(calcularTiempoRestante());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Configuración del slider
  const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  speed: 800,
  slidesToShow: 1, // Uno solo para mejor enfoque
  slidesToScroll: 1,
  arrows: false,
  centerPadding: "0px",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

  return (
    <div className="cuenta-container">
      <h2 className="cuenta-titulo">¡Nos casamos!</h2>
      <div className="cuenta-valores">
        <div className="cuenta-caja"><p className='numero-container-p'>{tiempo.dias}</p><span>Días</span></div>
        <div className="cuenta-caja"><p className='numero-container-p'>{tiempo.horas}</p><span>Horas</span></div>
        <div className="cuenta-caja"><p className='numero-container-p'>{tiempo.minutos}</p><span>Minutos</span></div>
        <div className="cuenta-caja"><p className='numero-container-p'>{tiempo.segundos}</p><span>Segundos</span></div>
      </div>

      <div className="galeria-slider">
        <Slider {...settings}>
          <img src="/fotos/F1.jpeg" alt="Foto 1" />
          <img src="/fotos/F2.jpeg" alt="Foto 2" />
          <img src="/fotos/F4.jpeg" alt="Foto 5" />
          <img src="/fotos/F5.jpeg" alt="Foto 4" />
          <img src="/fotos/F6.jpeg" alt="Foto 5" />
          <img src="/fotos/F7.jpeg" alt="Foto 6" />
        </Slider>
      </div>
    </div>
  );
};

export default CuentaRegresiva;