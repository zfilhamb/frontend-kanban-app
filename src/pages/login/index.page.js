import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Flex,
  Heading,
  InputRightElement,
  InputGroup,
  Text,
  Link,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { loginUser } from "../../modules/fetch/users";
// import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "@/modules/authStore";


function Login() {
  const [showAlert, setShowAlert] = useState(false); // Define the showAlert state variable
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser); // update the user state managed by the useAuthStore yang telah kita buat.

  const handleSubmit = async () => {
    try {
      const response = await loginUser({ email, password });

      // Update data user in the Zustand store (atau setting data user ke zustand agar disimpan)
      setUser(response);

      router.push("/");
    } catch (err) {
      setShowAlert(!showAlert);
      console.log(err);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="blackAlpha.50">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign="center">
            Login to Pinterest
          </Heading>
        </Stack>
        {showAlert && (
          <Alert status="error">
            <AlertIcon />
            Wrong Email or Password
          </Alert>
        )}
        <Box rounded={"xs"} bg={"gray.50"} border={"1px"} borderColor={"gray.200"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder={"example@mail.com"}
                borderRadius={"none"}
                onChange={(e) => setEmail(e.target.value)}
                onClick={() => setShowAlert(false)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={() => setShowAlert(false)}
                  color="blackAlpha.800"
                  maxLength={"16"}
                  placeholder="Enter Password"
                  mb="4"
                  bg="whiteAlpha.900"
                />
                <InputRightElement mr="1">
                  {showPassword ? (
                    <BsEye onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <BsEyeSlash onClick={() => setShowPassword(!showPassword)} />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500"
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Stack>
          <Stack pt={4}>
            <Text textAlign={"center"}>
              Don&apos;t have an account? {""}
              <Link href="/register">
                <Text as="span" fontWeight="semibold">
                  Register
                </Text>
              </Link>
            </Text>
            <Text as="u" textAlign={"center"}>
              <Link href="/">
                <Text as="span" fontWeight="semibold">
                  Homepage
                </Text>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
