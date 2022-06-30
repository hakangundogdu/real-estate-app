import { Stack, Flex, Button, Text, Spacer, Input } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Flex
      w={'full'}
      h={'40vh'}
      backgroundImage={'url(https://source.unsplash.com/178j8tJrNlc/1920)'}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      borderRadius="20"
      justify={'center'}
      align="center"
    >
      <Flex
        direction="column"
        align="center"
        justifyContent="center"
        bg="gray.800"
        w="xl"
        height="200"
        p={7}
        borderRadius="20"
        color="white"
        opacity="1"
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
