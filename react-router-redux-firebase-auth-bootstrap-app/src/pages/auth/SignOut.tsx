import { useState } from "react";
import { Button, Card, Image, Navbar, Stack, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signOut, AuthError } from "firebase/auth";

import { useAppSelector, useAppDispatch } from "../../hooks/useAppStore";
import {
  logoutFailure,
  logoutRequest,
  logoutSuccess,
} from "../../features/auth/authSlice";
import { auth } from "../../firebase";

const SignOut = () => {
  const [error, setError] = useState<AuthError | null>(null);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    if (authState.loading) {
      return;
    }

    dispatch(logoutRequest());
    try {
      await signOut(auth);
      dispatch(logoutSuccess());
    } catch (error) {
      const authError = error as AuthError;
      setError(authError);
      dispatch(logoutFailure());
    }
  };

  return (
    <Stack gap={3} className="d-flex flex-column align-items-center pt-5 p-2">
      <Navbar.Brand as={Link} to="/">
        <Image src="https://via.placeholder.com/60" roundedCircle />
      </Navbar.Brand>

      {error ? (
        <Alert
          show={!!error}
          onClose={() => setError(null)}
          variant="danger"
          className="w-100 m-0"
          dismissible
          style={{ maxWidth: "350px" }}
        >
          <Alert.Heading className="m-0">{error.name}</Alert.Heading>
          <hr />
          <p className="m-0">{error.code}</p>
        </Alert>
      ) : null}

      <Card className="w-100" style={{ maxWidth: "350px" }}>
        <Card.Body>
          <Stack gap={4}>
            <h3 className="text-center m-0">
              Are you sure you want to sign out?
            </h3>
            <Button variant="primary" className="w-100" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );
};

export default SignOut;
