import { fireEvent, render } from "@testing-library/react";
import { Session } from "next-auth";
import { describe, expect, test, vi, Mock, afterAll } from "vitest";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

const mockSession: Session = {
  user: {
    id: "1",
    name: "Test",
    email: "test@test.test",
    image: "https://testimages.org/img/testimages_screenshot.jpg",
  },
  expires: "1",
};

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  useSession: vi.fn(),
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(() => ({
    router: {
      push: vi.fn(),
    },
  })),
}));

vi.mock("next-auth/react");

describe("Navbar", () => {
  (signIn as Mock).mockImplementation(() => vi.fn());
  (signOut as Mock).mockImplementation(() => vi.fn());

  (useSession as Mock).mockReturnValue({
    data: mockSession,
    status: "authenticated",
  });

  const { container, rerender, getByText } = render(<Navbar />);

  test("should match snapshot when logout", () => {
    (useSession as Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });

    rerender(<Navbar />);
    expect(container).toMatchSnapshot("logout");
  });

  test("should match snapshot when login", () => {
    rerender(<Navbar />);

    (useSession as Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });

    expect(container).toMatchSnapshot("login");
  });

  test("should call signIn when click on login button", async () => {
    (useSession as Mock).mockImplementation(() => ({
      data: null,
      status: "unauthenticated",
    }));

    rerender(<Navbar />);

    fireEvent.click(getByText("Sign in"));

    expect(signIn).toHaveBeenCalled();
  });

  test("should call signOut when click on logout button", async () => {
    const mockRouter = {
      push: vi.fn(), // the component uses `router.push` only
    };
    (useRouter as Mock).mockReturnValue(mockRouter);

    (useSession as Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });

    rerender(<Navbar />);

    fireEvent.click(getByText("Sign out"));

    expect(signOut).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });

  afterAll(() => {
    (signIn as Mock).mockRestore();
    (signOut as Mock).mockRestore();
    (useSession as Mock).mockRestore();
  });
});
