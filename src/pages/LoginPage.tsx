import {
  Button,
  Card,
  Divider,
  Loader,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../firebase/auth";
import { useAuth } from "./useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const isValidJKUEmail = (email: string) => {
    const jkuRegex = /^K\d{8}@students\.jku\.at$/i;
    return jkuRegex.test(email);
  };

  const handleAction = async () => {
    if (!isValidJKUEmail(email)) {
      notifications.show({
        title: "Invalid Email",
        message:
          "Please use your JKU email not your private email. I don’t want to see your private email, that’s weird af.",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const user = isRegister
        ? await registerWithEmailAndPassword(email, password)
        : await loginWithEmailAndPassword(email, password);

      console.log("User returned from Firebase:", user); // Log the user object returned by Firebase

      // Update the global user state
      setUser({ email: user.email });

      notifications.show({
        title: "Success",
        message: isRegister
          ? "Account created successfully! You can now log in."
          : "Welcome back!",
        color: "teal",
      });

      // Redirect to the home page
      navigate("/");
    } catch (error: any) {
      console.error("Error during login/registration:", error); // Log the error for debugging
      notifications.show({
        title: "Error",
        message: error.message || "An unexpected error occurred.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f9fafc",
      }}
    >
      <Card
        shadow="md"
        radius="md"
        p="lg"
        withBorder
        style={{ width: "400px" }}
      >
        <Stack spacing="md">
          <Text size="lg" weight={700} align="center">
            {isRegister ? "Create an Account" : "Welcome Back"}
          </Text>
          <Divider />
          <TextInput
            label="Email"
            placeholder="Enter your JKU email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={
              email && !isValidJKUEmail(email)
                ? "Please use your JKU email format (e.g., K12345678@students.jku.at). I don’t want to see your private email, that’s weird af."
                : undefined
            }
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={
              password.length < 6 && password
                ? "Password must be at least 6 characters"
                : undefined
            }
          />
          <Button onClick={handleAction} fullWidth disabled={loading}>
            {loading ? (
              <Loader size="sm" color="white" />
            ) : isRegister ? (
              "Register"
            ) : (
              "Login"
            )}
          </Button>
          <Text align="center" size="sm">
            {isRegister ? "Already have an account?" : "New here?"}{" "}
            <Button
              variant="subtle"
              size="xs"
              compact
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister ? "Login instead" : "Register instead"}
            </Button>
          </Text>
        </Stack>
      </Card>
    </div>
  );
};

export default Login;
