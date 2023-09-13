import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AuthError } from "firebase/auth";
import { Alert } from "react-bootstrap";

import { useAppSelector } from "../../hooks/useAppStore";

const Profile = () => {
  const [error, setError] = useState<AuthError | null>(null);
  const [idToken, setIdToken] = useState<string>();

  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!authState.user) return;

    try {
      authState.user.getIdToken().then((idToken) => {
        setIdToken(idToken);
      });
    } catch (error) {
      const authError = error as AuthError;
      setError(authError);
    }
  }, [authState.user]);

  return (
    <>
      <Container>
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
        <article>
          <h1>Profile</h1>
          <p>
            <strong>Email:</strong> {authState.user?.email}
          </p>

          <p>
            <strong>UID:</strong> {authState.user?.uid}
          </p>

          <p>
            <strong>Provider:</strong> {authState.user?.providerId}
          </p>

          <p>
            <strong>Display Name:</strong> {authState.user?.displayName}
          </p>

          <p>
            <strong>Phone Number:</strong> {authState.user?.phoneNumber}
          </p>

          <p>
            <strong>Email Verified:</strong>{" "}
            {authState.user?.emailVerified ? "Yes" : "No"}
          </p>

          <p>
            <strong>Created At:</strong> {authState.user?.metadata.creationTime}
          </p>

          <p>
            <strong>Last Signed In At:</strong>{" "}
            {authState.user?.metadata.lastSignInTime}
          </p>

          <p>
            <strong>Refresh Token:</strong> {authState.user?.refreshToken}
          </p>

          <p>
            <strong>ID Token:</strong> {JSON.stringify(idToken, null, 4)}
          </p>
        </article>
      </Container>
    </>
  );
};

export default Profile;
