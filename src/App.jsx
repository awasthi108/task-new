import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect, useState } from "react";
import TaskPage from "./pages/TaskPage";

function App() {
  const [currUser, setCurrUser] = useState(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      return {
        isLoggedIn: true,
        fullName: "Guest",
      };
    } else {
      return {
        isLoggedIn: false,
        fullName: "Guest",
      };
    }
  });

  const afterLogin = (respObj) => {
    const newStateOfUser = {
      isLoggedIn: true,
      fullName: respObj.data.user.fullName,
    };
    localStorage.setItem("isLoggedIn", true);
    setCurrUser(newStateOfUser);
  };

  const getLoggedInUserInfo = async () => {
    try {
      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/me", {
        credentials: "include",
      }); // By default, fetch uses "GET"

      if (!resp.ok) {
        throw new Error("Failed to fetch user info!");
      }

      const respObj = await resp.json();
      console.log(respObj);

      setCurrUser({
        isLoggedIn: true,
        fullName: respObj.data?.user?.fullName || "Guest",
        email: respObj.data?.user?.email || "",
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      alert("Error fetching user info: " + error.message);
      setCurrUser({
        isLoggedIn: false,
        fullName: "Guest",
        email: "",
      });
    }
  };

  useEffect(() => {
    if (currUser.isLoggedIn) {
      getLoggedInUserInfo();
    }
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("isLoggedIn");

      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/users/logout",
        {
          credentials: "include",
        }
      );

      const respObj = await resp.json();

      if (respObj.status === "success") {
        setCurrUser({
          isLoggedIn: false,
          fullName: "Guest",
        });
      } else {
        throw new Error(respObj.message || "Logout failed!");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Error in Logout! " + error.message);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              currUser.isLoggedIn ? (
                <HomePage currUser={currUser} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/tasks"
            element={
              currUser.isLoggedIn ? (
                <TaskPage currUser={currUser} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/login"
            element={
              currUser.isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginPage afterLogin={afterLogin} />
              )
            }
          />
          <Route
            path="/sign-up"
            element={currUser.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/tasks"
            element={
              currUser.isLoggedIn ? <TaskPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="*"
            element={
              <div>
                Page not found <Link to="/">Home</Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
