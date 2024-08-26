import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Pour des assertions supplémentaires comme `toBeInTheDocument`
import ServiceCard from "../ServiceCard";  // Assurez-vous que le chemin vers votre fichier est correct

describe("ServiceCard Component", () => {
  it("renders the image with the correct src and alt attributes", () => {
    const imageSrc = "test-image.jpg";
    const imageAlt = "Test Alt Text";

    render(
      <ServiceCard imageSrc={imageSrc} imageAlt={imageAlt}>
        <p>Test Children</p>
      </ServiceCard>
    );

    const imgElement = screen.getByTestId("card-image-testid");
    expect(imgElement).toHaveAttribute("src", imageSrc);
    expect(imgElement).toHaveAttribute("alt", imageAlt);
  });

  it("renders children inside the text container", () => {
    render(
      <ServiceCard imageSrc="test-image.jpg">
        <p>Test Children</p>
      </ServiceCard>
    );

    const childElement = screen.getByText("Test Children");
    expect(childElement).toBeInTheDocument();
  });

  it("renders with a default alt attribute when none is provided", () => {
    render(
      <ServiceCard imageSrc="test-image.jpg">
        <p>Test Children</p>
      </ServiceCard>
    );

    const imgElement = screen.getByTestId("card-image-testid");
    expect(imgElement).toHaveAttribute("alt", "Image");
  });
});
