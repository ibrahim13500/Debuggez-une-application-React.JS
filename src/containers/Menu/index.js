import React from 'react';  // Make sure this line is included
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => {
  const handleContactClick = () => {
    window.document.location.hash = "#contact";
  };

  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <a href="#nos-services">Nos services</a>
        </li>
        <li>
          <a href="#nos-realisations">Nos réalisations</a>
        </li>
        <li>
          <a href="#notre-equipe">Notre équipe</a>
        </li>
      </ul>
      <Button title="contact" onClick={handleContactClick}>
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
