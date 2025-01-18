import React from "react";
import "@testing-library/jest-dom";
import "../components/Search"
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Search from "../components/Search";

describe("Search Field", () => {
    const mockSetInput = jest.fn()
    it("search works by saving value to state", async () => {
        render(<Search onSubmit={() => {}} setInput={mockSetInput} input=""/>)

        const textField = await screen.findByTestId("input-food-field")

        userEvent.type(textField, "A")
        fireEvent.change(textField, "A")
    })
})