const BASE_URL = import.meta.env.VITE_API_URL || "https://ebook-backend-468p.onrender.com/api";

// ── Books ──
export const fetchBooks = async (category = "All", search = "") => {
  try {
    let url = `${import.meta.env.VITE_API_URL}/books`;

    const params = [];

    if (category && category !== "All") {
      params.push(`category=${category}`);
    }

    if (search) {
      params.push(`search=${search}`);
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    console.log("FETCH URL:", url);

    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch books");

    return await res.json();
  } catch (err) {
    console.error("fetchBooks error:", err);
    return [];
  }
};

// ── Categories ──
export const fetchCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error("fetchCategories error:", error);
    return [];
  }
};

// ── Auth ──
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    console.error("loginUser error:", error);
    return { message: "Login failed" };
  }
};

export const registerUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("registerUser error:", error);
    return { message: "Registration failed" };
  }
};