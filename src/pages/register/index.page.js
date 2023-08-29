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
  AlertIcon,
  FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react";
import { registerUser } from "@/modules/fetch/users";
import { useRouter } from "next/router";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function Register() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    setIsEmailValid(isValid);
    if (name && email && password && isValid && confirmPassword) {
      await registerUser({ name, email, password });
      router.push("/login");
    } else {
      setShowAlert(!showAlert);
    }
  };

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg="blackAlpha.50">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={{ base: 0, md: 6 }}>
          <Stack align={"center"}>
            <Heading fontSize={{ base: "2xl", lg: "4xl" }} textAlign="center">
              Create Your Account
            </Heading>
          </Stack>
          {showAlert && (
            <Alert status="error">
              <AlertIcon />
              Please Input field required.
            </Alert>
          )}
          <Box rounded={"xs"} bg={"gray.50"} border={"1px"} borderColor={"gray.200"} py={8} px={8} w={{ base: "auto", sm: "96" }}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder={"Your Name"}
                  borderRadius={"none"}
                  bg="whiteAlpha.800"
                  onChange={(e) => setName(e.target.value)}
                  onClick={() => setShowAlert(false)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder={"example@mail.com"}
                  borderRadius={"none"}
                  bg="whiteAlpha.800"
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={() => {
                    setShowAlert(false), setIsEmailValid(true);
                  }}
                />
              </FormControl>
              <FormControl isInvalid={!isEmailValid} hidden={isEmailValid ? true : false}>
                <FormErrorMessage fontWeight={"semibold"} mt="-2">
                  * Invalid email pattern
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={() => setShowAlert(false)}
                    placeholder="Enter Password"
                    borderRadius={"none"}
                    bg="whiteAlpha.800"
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
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirm ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onClick={() => setShowAlert(false)}
                    placeholder="Confirm Password"
                    mb="4"
                    borderRadius={"none"}
                    bg="whiteAlpha.800"
                  />
                  <InputRightElement mr="1">
                    {showConfirm ? (
                      <BsEye onClick={() => setShowConfirm(!showConfirm)} />
                    ) : (
                      <BsEyeSlash onClick={() => setShowConfirm(!showConfirm)} />
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
                isDisabled={password !== confirmPassword}
              >
                Register
              </Button>
            </Stack>
            <Stack pt={4}>
              <Text textAlign={"center"}>
                Already have an account? {""}
                <Link href="/login">
                  <Text as="span" fontWeight="semibold">
                    Login
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
    </>
  );
}

export default Register;
