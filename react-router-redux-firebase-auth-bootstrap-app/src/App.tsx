import { useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

import RootRoutes from "./routes/Root";
import { useAppDispatch } from "./hooks/useAppStore";
import { loginSuccess } from "./features/auth/authSlice";
import { auth } from "./firebase";

function App() {
  const [isPending, setIsPending] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setPersistence(auth, browserLocalPersistence);
        dispatch(loginSuccess(user));
      } else {
        // User is signed out
      }
      setIsPending(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{isPending ? <div>Loading...</div> : <RootRoutes />}</>;
}

export default App;
