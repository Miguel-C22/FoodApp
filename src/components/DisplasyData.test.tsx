import React from "react";
import "@testing-library/jest-dom";
import "../components/Search"
import { render, screen, waitFor } from "@testing-library/react";
import DisplayData from "./DisplayData";

const mockData = [
    {
      id: 'id',
      image: 'https://www.image1.com',
      title: "Apple",
      spoonacularSourceUrl: "https://www.amazon.com",
      summary: "summary",
      servings: "servings",
      nutrition: {
        nutrients: [
            {
                name: "calories",
                amount: 100,
            },
        ],
    },
    },
  ];

describe("display data", () => {
    it("test for displaying all the data onces state receives it", async () => {
        render(<DisplayData foodData={mockData} loading={false} error={false}/>);

        // Simulate waiting for data and then check for "Apple"
        await waitFor(() => {
            expect(screen.getByText("Apple")).toBeInTheDocument();
            
            // Check for the image with alt text "Apple" and src attribute
            expect(screen.getByAltText("Apple")).toHaveAttribute('src', 'https://www.image1.com');

            // Check for the link to the recipe
            const link = screen.getByRole('link', { name: /view recipe/i });
            expect(link).toHaveAttribute('href', 'https://www.amazon.com');

            // Check for summary text
            expect(screen.getByText("summary")).toBeInTheDocument();
            
            // Check for calories and servings
            expect(screen.getByText("100")).toBeInTheDocument();
            expect(screen.getByText("servings")).toBeInTheDocument();
        });
    });

    it("loading while waiting to pass the data to state" , () => {
        render(<DisplayData foodData={mockData} loading={true} error={false}/>);

        expect(screen.getByRole('progressbar')).toBeInTheDocument(); 
        /*
            The CircularProgress MUI has a roll names progressbar, 
            If you create your own spinner component you would just 
            add a roll to it and use that for testing
        */
    })

    it("If data fails to get passed to state test for the error message to show up" , () => {
        render(<DisplayData foodData={mockData} loading={false} error={true}/>);

        expect(screen.getByText("Something went wrong please try again later 😢")).toBeInTheDocument()

    })
});