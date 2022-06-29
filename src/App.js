import {
  Box,
  Text,
  Button,
  Stack,
  Flex,
  Image,
  Input,
  Spacer,
} from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <Flex align="center" direction="column">
      <Image
        width="100%"
        height="400px"
        src="https://source.unsplash.com/g39p1kDjvSY/1920"
        objectFit="cover"
        alt="house"
      ></Image>
      <Flex
        direction="column"
        align="center"
        bg="gray.800"
        w="50%"
        height="200"
        p={7}
        mt={-24}
        borderRadius="20"
        color="white"
      >
        <Text fontSize="3xl" color="green.400" fontWeight="bold">
          Find Your Dream Home
        </Text>
        <Text fontSize="xl" fontWeight="semibold">
          Search properties for sale and to rent
        </Text>
        <Spacer />
        <Stack direction="row" spacing={4}>
          <Input
            bg="white"
            placeholder="e.g 'London'"
            focusBorderColor="green.400"
            focusBackgroundColor="white"
            width="300px"
            size="md"
            variant="outline"
            color="gray.800"
          />
          <Button colorScheme="green" variant="solid">
            <a href="/">For Sale</a>
          </Button>
          <Button colorScheme="green" variant="solid">
            <a href="/">For Rent</a>
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default App;
