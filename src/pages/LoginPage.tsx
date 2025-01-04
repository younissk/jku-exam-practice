import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Loader,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Container,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../firebase/auth";
import { useAuth } from "./useAuth";

const LoginPage: React.FC = () => {
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
        message: "Please use your JKU email.",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      const user = isRegister
        ? await registerWithEmailAndPassword(email, password)
        : await loginWithEmailAndPassword(email, password);

      setUser(user);

      notifications.show({
        title: "Success",
        message: isRegister
          ? "Account created successfully! You can now log in."
          : "Welcome back!",
        color: "teal",
      });

      navigate("/");
    } catch (error: any) {
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
    <Container size="xs" mt="xl">
      <Card shadow="md" radius="md" p="lg" withBorder>
        <Stack gap="md">
          <Title order={3} ta="center">
            {isRegister ? "Create an Account" : "Welcome Back"}
          </Title>
          <Divider />
          <TextInput
            label="Email"
            placeholder="Enter your JKU email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={
              email && !isValidJKUEmail(email)
                ? "Please use your JKU email format."
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
            {loading ? <Loader size="sm" color="white" /> : isRegister ? "Register" : "Login"}
          </Button>
          <Text ta="center" size="sm">
            {isRegister ? "Already have an account?" : "New here?"}{" "}
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister ? "Login instead" : "Register instead"}
            </Button>
          </Text>
        </Stack>
      </Card>
    </Container>
  );
};

export default LoginPage;
