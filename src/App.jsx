import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebase/firebase";
import { ref, get } from "firebase/database";
import { setUser, logoutUser } from "./store/userSlice";
import { setFavorites, setWatched } from "./store/moviesSlice";
import {
  fetchFavoritesFromFirebase,
  fetchWatchedFromFirebase,
} from "./firebase/firebase";

import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Movies } from "./pages/Movies/Movies";
import { Serials } from "./pages/Serials/Serials";
import { NotFound } from "./components/NotFound/NotFound";
import { MovieDetails } from "./components/MovieDetails/MovieDetails";

import "./App.css";
import { UserProfile } from "./pages/UserProfile/UserProfile";

function App() {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );

        // Завантажуємо дані про улюблені та переглянуті фільми
        const favorites = await fetchFavoritesFromFirebase(user.uid);
        const watched = await fetchWatchedFromFirebase(user.uid);

        dispatch(setFavorites(favorites || []));
        dispatch(setWatched(watched || []));
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <div className="loader-wrapper">
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/serials" element={<Serials />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
