import React from 'react';
import '@testing-library/jest-dom';
import DisplaySearches from "./DisplaySearches";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockData = [
    { id: 1, searchQuery: "Apple" },
    { id: 2, searchQuery: "Oranges" },
    { id: 3, searchQuery: "Peaches" },
]

jest.mock('../utils/getSearchQuery', () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve([])),
}));

describe("Display Search Chips" , () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
      });
    
    it("display all users searches" , () => {
        render(<DisplaySearches queryData={mockData} onSubmit={() => {}} setInput={() => {}} />)

        mockData.forEach((data) => {
            expect(screen.getByText(data.searchQuery)).toBeInTheDocument();
        });
    })
    it("displays message if there are no searches", async () => {
        // Render the component
        render(<DisplaySearches queryData={[]} onSubmit={() => {}} setInput={() => {}} />);
      
        // Wait for async effects to settle (since getSearchQuery returns a promise)
        await screen.findByText("No Searches yet added.");
      
        // Assert that the message is in the document
        expect(screen.getByText("No Searches yet added.")).toBeInTheDocument();
      });
    it("display updated searches when ones removed", async () => {
        render(<DisplaySearches queryData={mockData} onSubmit={() => {}} setInput={() => {}} />)
        
        const deleteButton = await screen.findByTestId(`delete-chip-${mockData[0].id}`);
        userEvent.click(deleteButton);
        
    })  
})