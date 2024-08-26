import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // Importation pour les assertions supplémentaires
import ServiceCard from "./index";

describe("When a service card is created", () => {
  it("an image is displayed with alt value", () => {
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">
        {/* Les enfants sont requis, vous pouvez mettre du texte vide ou autre */}
        <div></div>
      </ServiceCard>
    );
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt', 'image-alt-text'); // Utilisez toHaveAttribute pour vérifier l'attribut
  });

  it("uses the default alt text if no alt value is provided", () => {
    render(
      <ServiceCard imageSrc="http://src-image">
        <div></div>
      </ServiceCard>
    );
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt', 'Image'); // Vérifiez le texte alternatif par défaut
  });

  it("a content is displayed", () => {
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">
        This is the card content
      </ServiceCard>
    );
    const contentElement = screen.getByText(/This is the card content/);
    expect(contentElement).toBeInTheDocument();
  });
});
