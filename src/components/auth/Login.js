import { Box, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, Button, Text, Link } from "@chakra-ui/react"; 
import { HOME, REGISTER } from "../../lib/routes";
import { Link as RouterLink} from "react-router-dom";
import { useLogin, useGoogle } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "../../utils/form-validate";
import { FcGoogle } from "react-icons/fc";



export default function Login() {
    const { login, isLoading} = useLogin();
    const {register, handleSubmit, reset, formState: { errors }, } = useForm();

    async function handleSignIn(data){
        const success = await login({email: data.email, password: data.password, redirectTo: HOME,});
        if(success){
            reset();
        }

    }
    //remember for report -->
    //error handler for react hook forms error. if there is more than one react/dom in my project false is printed to console to display whether this is true
    //this was the case. had to npm dedupe to be able to run project.
    require('react-dom');
    window.React2 = require('react');
    console.log(window.React1 === window.React2);

    return (
        <Center w='100%' h="100vh">
            <Text>weLEARN</Text>
            <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
                <Heading mb="4" size="lg" textAlign="center">
                    Log in
                </Heading>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    <FormControl isInvalid={errors.email} py="2">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholders="user@email.com" {...register('email', emailValidate)} />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password} py="2">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholders="password" {...register('password', passwordValidate)} />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Button
                    mt="4"
                    type="submit"
                    colorScheme="yellow"
                    size="md"
                    w="full"
                    isLoading={isLoading}
                    loadingTexts="Logging in"
                    >
                        Log in 
                        </Button>
                <Button onClick={useGoogle}
                  mt="4"
                  type="submit"
                  colorScheme="blackAlpha"
                  size="md"
                  w="full"
                  loadingText="Signing Up">Sign in with Google
                <FcGoogle></FcGoogle>
            </Button> 
                     </form>
                    <Text fontSize="xlg" align="center" mt="6">
                        Make an account here!{" "}
                    
                        <Link
                        as={RouterLink}
                        to={REGISTER}
                        colorScheme="blue"
                        size="md"
                        w="full"
                        textDecor="underline"
                        _hover={{ background: "teal.100" }}
                    >
                        Sign up
                    </Link>{" "}
                     </Text>
            </Box>
        </Center>
    );
}