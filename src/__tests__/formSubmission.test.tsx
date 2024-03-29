import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Index from "../pages/index";

describe("IndexPage form submission integration test", () => {
  let submitButton: Node | Window,
    nameInput: Node | Window,
    emailInput: Node | Window,
    checkbox: Node | Window;

  beforeEach(() => {
    const { getByLabelText, getByText, getByTestId } = render(<Index />);
    submitButton = getByText("Sign me up!");
    nameInput = getByLabelText("Name");
    emailInput = getByLabelText("Email");
    checkbox = getByTestId("checkbox-consent");
  });

  it("should disable submit button when form payload does not pass validation", async () => {
    fireEvent.change(nameInput, { target: { value: "1" } });
    fireEvent.change(emailInput, { target: { value: "invalid email" } });
    fireEvent.click(checkbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("should submit form when values pass validation", async () => {
    fireEvent.change(nameInput, { target: { value: "Richard Parker" } });
    fireEvent.change(emailInput, { target: { value: "richard@gmail.com" } });
    fireEvent.click(checkbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("should display success component when form is submitted", async () => {
    //@ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
      })
    );

    fireEvent.change(nameInput, { target: { value: "Richard Parker" } });
    fireEvent.change(emailInput, { target: { value: "richard@gmail.com" } });
    fireEvent.click(checkbox);

    fireEvent.submit(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByTestId("success-message");
      expect(successMessage).toBeInTheDocument();
    });
  });

  it("should display error when form submission failed", async () => {
    //@ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        statusText: "Unauthorized",
      })
    );

    fireEvent.change(nameInput, { target: { value: "Richard Parker" } });
    fireEvent.change(emailInput, { target: { value: "richard@gmail.com" } });
    fireEvent.click(checkbox);

    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorMessage = screen.getByTestId("error-message");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
