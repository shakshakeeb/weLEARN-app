  import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Text } from "@chakra-ui/react";
  import { HOME, LOGIN } from "../../lib/routes";
  import { Link as RouterLink } from "react-router-dom";
  import { useRegister } from "../../hooks/auth";
  import { useForm } from "react-hook-form";
  import { emailValidate, passwordValidate, usernameValidate } from "../../utils/form-validate";
  import { FcGoogle } from "react-icons/fc";
  
  
  export default function Register() {
    const { register: signup, isLoading } = useRegister();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    async function handleRegister(data) {
      signup({
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
        redirectTo: HOME,
      });
    }
  
    return (
      <Center w="100%" h="100vh">
        <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
          <Heading mb="4" size="lg" textAlign="center">
            Sign up
          </Heading>
  
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid={errors.username} py="2">
              <FormLabel>Username</FormLabel>
              <Input
                placeholder=""
                {...register("username", usernameValidate)}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            {/* <FormControl isInvalid={errors.name} py="2">
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="name"
                {...register("name", nameValidate)}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl> */}
            <FormControl isInvalid={errors.email} py="2">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder=""
                {...register("email", emailValidate)}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} py="2">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder=""
                {...register("password", passwordValidate)}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt="4"
              type="submit"
              color="green.200"
              size="md"
              w="full"
              isLoading={isLoading}
              loadingText="Signing Up"
            >
              Register now
            </Button>
          </form>
  
          <Text fontSize="xlg" align="center" mt="6">
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to={LOGIN}
              fontWeight="medium"
              textDecor="underline"
              _hover={{ background: "" }}
            >
              Log In
            </Link>{" "}   
            <Button
                  mt="4"
                  type="submit"
                  color="green.200"
                  size="md"
                  w="full"
                  loadingText="Signing Up">Sign in with Google
                <FcGoogle></FcGoogle>
            </Button> 
          </Text>
        </Box>
      </Center>
      
      
    );
  }