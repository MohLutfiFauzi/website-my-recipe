import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         recipes: Array.from({ length: 12 }, (_, i) => ({
//           id: i + 1,
//           name: `Recipe ${i + 1}`,
//           image: "https://via.placeholder.com/150",
//           rating: 4.5,
//           tags: ["Tag1", "Tag2", "Tag3"],
//         })),
//       }),
//   })
// );

test("renders App component with NavBar, image banner, and Footer", async () => {
  render(<App />);

  // image banner is rendered
  const banner = screen.getByTestId("image-banner");
  expect(banner).toBeInTheDocument();
  expect(banner).toHaveProperty(
    "src",
    "https://www.instacart.com/company/wp-content/uploads/2022/11/cooking-statistics-hero.jpg"
  );

  // footer is rendered
  const footer = screen.getByTestId("footer-text");
  expect(footer).toBeInTheDocument();
  expect(footer).toHaveTextContent("© 2024 Company, Inc. All rights reserved.");

  // link facebook is rendered
  const facebook = screen.getByTestId("link-facebook");
  expect(facebook).toBeInTheDocument();
  expect(facebook).toHaveProperty("href", "https://facebook.com/");

  // link x is rendered
  const x = screen.getByTestId("link-x");
  expect(x).toBeInTheDocument();
  expect(x).toHaveProperty("href", "https://x.com/");

  // link instagram is rendered
  const instagram = screen.getByTestId("link-instagram");
  expect(instagram).toBeInTheDocument();
  expect(instagram).toHaveProperty("href", "https://instagram.com/");

  // navbar is rendered
  const navbar = screen.getByTestId("my-recipe");
  expect(navbar).toBeInTheDocument();
  expect(navbar).toHaveTextContent("My Recipe");

  // input is rendered
  const input = screen.getByPlaceholderText("Recipe Name");
  expect(input).toBeInTheDocument();

  fireEvent.change(input, {
    target: { value: "test" },
  });
  expect(input).toHaveValue("test");

  // form is rendered
  const form = screen.getByTestId("form-search");
  expect(form).toBeInTheDocument();
  expect(form).toHaveTextContent("Search");

  fireEvent.submit(form);
  expect(input).toHaveValue("");

  fireEvent.change(input, {
    target: { value: "Classic Margherita Pizza" },
  });
  fireEvent.submit(form);
  const recipe = await waitFor(
    () => screen.getByText("Classic Margherita Pizza"),
    { timeout: 3000 }
  );
  expect(recipe).toBeInTheDocument();

  // await waitFor(() => {
  //   const recipeListItems = screen.getByTestId("/img-recipe-/i");
  //   expect(recipeListItems).toHaveLength(12);
  // });

  // const recipeItem = screen.getByText(/Recipe 1/i);
  // expect(recipeItem).toBeInTheDocument();
});
