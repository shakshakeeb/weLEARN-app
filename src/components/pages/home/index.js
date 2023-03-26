import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
} from '@chakra-ui/react';
export default function Home() {
  return (
    <>
  
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
  

      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            weLEARN <br />
            <Text as={'span'} color={'green.200'}>
            Empowering minds, expanding horizons
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Here at weLEARN you'll have access to a diverse range of 
            educational resources, interactive learning tools, and a supportive community
            that will help you achieve your academic goals and enhance your knowledge
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            {/* <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Get Started
            </Button> */}
            {/* <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button> */}
            <Box>

              {/* <Text
                fontSize={'lg'}
                fontFamily={'Caveat'}
                position={'absolute'}
                right={'-125px'}
                top={'-15px'}
                transform={'rotate(10deg)'}>
                Starting at $15/mo
              </Text> */}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
  
}
