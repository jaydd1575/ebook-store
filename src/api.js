const BASE_URL = "http://localhost:5000/api";
// 🔐 Get Token
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// 📚 Books
export const fetchBooks = async (category = "All", search = "") => {
  let url = `${BASE_URL}/books?`;

  if (category && category !== "All") url += `category=${category}&`;
  if (category === "All") url += `featured=true&`;
  if (search) url += `search=${search}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken() || ""}`,
    },
  });

  return res.json();
};

// 📂 Categories
export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};

// 🔐 Login
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// 📝 Register
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};