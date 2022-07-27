import { Text, CircularProgress, Center } from '@chakra-ui/react';
const Spinner = () => {
  return (
    <Center h="200px" w="100%">
      <CircularProgress isIndeterminate color="green.300" />
      <Text mt={2} fontWeight="semibold" lineHeight="short"></Text>
    </Center>
  );
};

export default Spinner;
