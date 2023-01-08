import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import React from "react";
import selectEvent from "react-select-event";

describe("Register component", () => {
  it("should render Register component correctly", () => {
    render(<Register />);
    const element = screen.getByRole("heading", { level: 2 });
    expect(element).toBeInTheDocument();
  });
  it("should test for presence of subheading in the component", () => {
    render(<Register />);
    const element = screen.getByRole("heading", {
      name: /please enter your details below to register yourself\./i,
    });
    expect(element).toBeInTheDocument();
  });

  it("should show error message when all the fields are not entered", async () => {
    render(<Register />);
    const buttonElement = screen.getByRole("button", {
      name: /register/i,
    });
    await userEvent.click(buttonElement);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });
  it("should not show any error message when the component is loaded", () => {
    render(<Register />);
    const alertElement = screen.queryByRole("alert");
    expect(alertElement).not.toBeInTheDocument();
  });
  it("should show success message when the registration is successful", async () => {
    render(<Register />);
    const buttonElement = screen.getByRole("button");

    const state = {
      name: "lucas",
      email: "lucas@hotmail.com",
      password: "123456",
    };
    const selectedSkill = "React";

    const getInput = screen.getByTestId("name");
    fireEvent.change(getInput, { target: { value: state.name } });

    const getInputemail = screen.getByTestId("email");
    fireEvent.change(getInputemail, { target: { value: state.email } });

    const getInputpassword = screen.getByTestId("password");
    fireEvent.change(getInputpassword, { target: { value: state.password } });

    const option = screen.getByLabelText("Select your Skills");
    await selectEvent.select(option, selectedSkill)

    const getInputnews = screen.getByTestId("news");
    fireEvent.click(getInputnews);

    await userEvent.click(buttonElement);

    const alertElement = screen.getByTestId("success-alert");
    expect(alertElement).toBeInTheDocument();
  });
});
