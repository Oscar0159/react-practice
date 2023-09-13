import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Card,
  Form,
  Image,
  Navbar,
  Stack,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";

import { useAppSelector, useAppDispatch } from "../../hooks/useAppStore";
import {
  loginFailure,
  loginRequest,
} from "../../features/auth/authSlice";
import { auth } from "../../firebase";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const [error, setError] = useState<AuthError | null>(null);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const initialValues: SignInFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: yup.string().required("Password is required."),
  });

  const onSubmit = async (values: SignInFormValues) => {
    if (authState.loading) {
      return;
    }
    setError(null);

    const { email, password } = values;

    dispatch(loginRequest());
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const authError = error as AuthError;
      setError(authError);
      dispatch(loginFailure());
    }
  };

  const formik = useFormik<SignInFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Stack gap={3} className="d-flex flex-column align-items-center pt-5 p-2">
      <Navbar.Brand as={Link} to="/">
        <Image src="https://via.placeholder.com/60" roundedCircle />
      </Navbar.Brand>
      <h3 className="text-center">Sign In</h3>

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
          <Form onSubmit={formik.handleSubmit}>
            <Stack gap={3}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  disabled={authState.loading}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={!!formik.errors.email && formik.touched.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  disabled={authState.loading}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.password && formik.touched.password
                  }
                />
                {formik.touched.password && formik.errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Button
                type="submit"
                disabled={authState.loading}
                className="w-100"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>

      <Card className="w-100" style={{ maxWidth: "350px" }}>
        <Card.Body>
          <h6 className="text-center m-0">
            Don't have an account?
            <span className="ms-1">
              <Link to="/sign-up" className="text-decoration-none">
                Create an account
              </Link>
            </span>
          </h6>
        </Card.Body>
      </Card>
    </Stack>
  );
};

export default SignIn;
