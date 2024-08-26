import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this import
import Menu from '../../containers/Menu';

describe("When Menu is created", () => {
  it("displays a list of mandatory links and the logo", async () => {
    render(<Menu />);

    // Check if the mandatory links are present
    expect(await screen.findByText("Nos services")).toBeInTheDocument();
    expect(await screen.findByText("Nos réalisations")).toBeInTheDocument();
    expect(await screen.findByText("Notre équipe")).toBeInTheDocument();
  });

  it("changes the document location hash when contact button is clicked", () => {
    render(<Menu />);
    
    // Simulate a click on the contact button
    const contactButton = screen.getByText("Contact");
    contactButton.click();
    
    // Verify if the location hash was updated
    expect(window.location.hash).toBe("#contact");
  });
});
