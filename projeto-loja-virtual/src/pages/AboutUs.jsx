// src/components/AboutUs.js
import React from 'react';
import '../styles/global.css'; 

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>Sobre a Loja Virtual</h1>
            <p>Bem-vindo à Loja Virtual, sua principal fonte de produtos incríveis e ofertas imperdíveis! Desde nossa fundação, temos nos dedicado a oferecer uma experiência de compra online excepcional, trazendo para você uma ampla seleção de produtos de qualidade e um atendimento ao cliente incomparável.</p>

            <h2>Nossa Missão</h2>
            <p>Na Loja Virtual, nossa missão é simples: conectar você aos melhores produtos com a maior conveniência possível. Trabalhamos incansavelmente para garantir que cada item disponível em nosso site passe por rigorosos padrões de qualidade, para que você possa comprar com confiança e satisfação.</p>

            <h2>O Que Oferecemos</h2>
            <ul>
                <li><strong>Variedade de Produtos:</strong> De eletrônicos e roupas a acessórios e itens para a casa, temos tudo o que você precisa em um só lugar.</li>
                <li><strong>Ofertas Exclusivas:</strong> Aproveite nossas promoções e ofertas especiais para economizar ainda mais em suas compras.</li>
                <li><strong>Entrega Rápida:</strong> Comprometemo-nos a entregar seus produtos de forma rápida e segura, para que você possa começar a aproveitar suas novas aquisições o mais breve possível.</li>
            </ul>

            <h2>Nossos Valores</h2>
            <ul>
                <li><strong>Qualidade:</strong> Garantimos a qualidade de todos os produtos que oferecemos.</li>
                <li><strong>Transparência:</strong> Mantemos uma comunicação clara e honesta com nossos clientes.</li>
                <li><strong>Inovação:</strong> Estamos sempre buscando novas maneiras de melhorar sua experiência de compra.</li>
            </ul>

            <h2>Entre em Contato</h2>
            <p>Se você tiver alguma dúvida ou precisar de assistência, nossa equipe de suporte está disponível para ajudar. Entre em contato conosco através do nosso formulário de contato ou pelas redes sociais.</p>

            <p>Obrigado por escolher a Loja Virtual. Estamos ansiosos para servi-lo!</p>
        </div>
    );
};

export default AboutUs;
