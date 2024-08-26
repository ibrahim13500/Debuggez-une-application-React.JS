import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

beforeEach(() => {
  jest.resetAllMocks(); // Reset mocks before each test
});

describe("When Events is created", () => {
  it("a list of event cards is displayed", async () => {
    api.loadData.mockResolvedValue(data);  // mockResolvedValue to handle promises
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );

    await waitFor(() => screen.getByText("Conférence #productCON"));
    expect(screen.getByText("Conférence #productCON")).toBeInTheDocument();
  });

  describe("and an error occurs", () => {
    it("an error message is displayed", async () => {
      api.loadData.mockRejectedValue(new Error("Data fetch error"));
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      await waitFor(() => screen.getByText("An error occurred"));
      expect(screen.getByText("An error occurred")).toBeInTheDocument();
    });
  });

  describe("and we select a category", () => {
    it("a filtered list is displayed", async () => {
      api.loadData.mockResolvedValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      await waitFor(() => screen.getByText("Forum #productCON"));
      
      fireEvent.click(screen.getByTestId("collapse-button-testid"));
      fireEvent.click(screen.getByText("soirée entreprise"));

      await waitFor(() => screen.getByText("Conférence #productCON"));
      expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });

  describe("and we click on an event", () => {
    it("the event detail is displayed", async () => {
      api.loadData.mockResolvedValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      fireEvent.click(await screen.findByText("Conférence #productCON"));

      await waitFor(() => screen.getByText("24-25-26 Février"));
      await waitFor(() => screen.getByText("1 site web dédié"));
      
      expect(screen.getByText("24-25-26 Février")).toBeInTheDocument();
      expect(screen.getByText("1 site web dédié")).toBeInTheDocument();
    });
  });
});
