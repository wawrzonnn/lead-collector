import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Index from "../pages/index";
import "@testing-library/jest-dom/extend-expect";

test("displays error message when name is 1234", async () => {
  render(<Index />);
  const nameInput = screen.getByLabelText("Name");
  const submitButton = screen.getByText("Sign me up!");
  await userEvent.type(nameInput, 1234 + "");
  userEvent.click(submitButton);
  expect(screen.getByText("Name is required")).toBeInTheDocument();
});

test("validation should fail when asd is passed as an email", async () => {
  render(<Index />);
  const emailInput = screen.getByLabelText("Email");
  const submitButton = screen.getByText("Sign me up!");
  await userEvent.type(emailInput, "asd");
  userEvent.click(submitButton);
  expect(screen.getByText("Email is required")).toBeInTheDocument();
});

test("validation should pass when joe@doe.pl is passed as an email", async () => {
  render(<Index />);
  const emailInput = screen.getByLabelText("Email");
  const submitButton = screen.getByText("Sign me up!");
  await userEvent.type(emailInput, "joe@doe.pl");
  userEvent.click(submitButton);
  expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
});

test("validation should pass when 'Joe' is passed as a name", async () => {
  render(<Index />);
  const nameInput = screen.getByLabelText("Name");
  const submitButton = screen.getByText("Sign me up!");
  await userEvent.type(nameInput, "Joe");
  userEvent.click(submitButton);
  expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
});

test("validation should fail when consentsAccepted is false", async () => {
  render(<Index />);
  const checkbox = screen.getByRole("checkbox");
  const submitButton = screen.getByText("Sign me up!");
  fireEvent.change(checkbox, { target: { checked: false } });
  userEvent.click(submitButton);
  await waitFor(() => {
    expect(
      screen.getByText("Acceptance of the privacy policy is required.")
    ).toBeInTheDocument();
  });
});
