import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";

describe("When Modal is rendered", () => {
  it("displays the modal content when opened", () => {
    render(
      <Modal opened Content={<div>modal content</div>}>
        {() => null}
      </Modal>
    );
    // Vérifie que le contenu du modal est affiché
    expect(screen.getByText("modal content")).toBeInTheDocument();
  });

  describe("and the open button is clicked", () => {
    it("displays the content of the modal", () => {
      render(
        <Modal Content={<div>modal content</div>}>
          {({ setIsOpened }) => (
            <button data-testid="open-modal" onClick={() => setIsOpened(true)}>
              Open Modal
            </button>
          )}
        </Modal>
      );
      // Vérifie que le contenu du modal n'est pas affiché avant le clic
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();

      // Simule un clic sur le bouton pour ouvrir le modal
      fireEvent.click(screen.getByTestId("open-modal"));

      // Vérifie que le contenu du modal est affiché après le clic
      expect(screen.getByText("modal content")).toBeInTheDocument();
    });
  });

  describe("and the close button is clicked", () => {
    it("hides the content of the modal", () => {
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => null}
        </Modal>
      );

      // Vérifie que le contenu du modal est affiché
      expect(screen.getByText("modal content")).toBeInTheDocument();

      // Simule un clic sur le bouton pour fermer le modal
      fireEvent.click(screen.getByTestId("close-modal"));

      // Vérifie que le contenu du modal n'est plus affiché après le clic
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });
});
