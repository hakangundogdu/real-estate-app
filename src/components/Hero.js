import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchListingData, listingActions } from "../store/listing-slice";
import ModalUi from "./UI/ModalUi";

import {
  Stack,
  Flex,
  Button,
  Text,
  Spacer,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

export default function Hero() {
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const locationChangeHandler = (event) => {
    const loc = event.target.value;
    setLocation(loc.charAt(0).toUpperCase() + loc.substring(1).toLowerCase());
  };

  const allowedLocations = ["London", "Leeds", "Bristol", ""];

  const searchRentHandler = (e) => {
    e.preventDefault();
    dispatch(listingActions.isLoading());
    dispatch(listingActions.isSearched(true));
    dispatch(fetchListingData({ county: location, listing_status: "rent" }));
    setLocation("");
    dispatch(listingActions.setSearchLocation(location));
  };

  const searchSaleHandler = (e) => {
    e.preventDefault();
    dispatch(listingActions.isLoading());
    dispatch(listingActions.isSearched(true));
    dispatch(fetchListingData({ county: location, listing_status: "sale" }));
    setLocation("");
    dispatch(listingActions.setSearchLocation(location));
  };

  const popUpHandler = (e) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <>
      <Flex
        w={"full"}
        h={"40vh"}
        backgroundImage={"url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070)"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        borderRadius="2xl"
        justify={"center"}
        align="center"
      >
        <Flex
          direction="column"
          align="center"
          justifyContent="center"
          bg="gray.800"
          width={[
            "100%", // 0-30em
            "lg", // 30em-48em
            "xl", // 48em-62em
            "xl", // 62em+
          ]}
          height={[
            "100%", // 0-30em
            "40vh", // 30em-48em
            "200", // 48em-62em
            "200", // 62em+
          ]}
          p={7}
          borderRadius="2xl"
          color="white"
          opacity="1"
        >
          <Text
            fontSize={["2xl", "2xl", "3xl", "3xl"]}
            color="green.400"
            fontWeight="bold"
          >
            Find Your Dream Home
          </Text>
          <Text
            fontSize={["md", "md", "xl", "xl"]}
            mb="2"
            fontWeight="semibold"
          >
            Search properties for sale and to rent in the UK
          </Text>
          <Spacer />
          <Stack direction={["column", "column", "row", "row"]} spacing={4}>
            <Input
              bg="white"
              placeholder=" 'London', 'Leeds' or 'Bristol'"
              focusBorderColor="green.400"
              width="300px"
              size="md"
              variant="outline"
              color="gray.800"
              isRequired={true}
              value={location}
              onChange={locationChangeHandler}
              type="search"
              ref={finalRef}
            />
            <Button
              onClick={
                allowedLocations.includes(location)
                  ? searchSaleHandler
                  : popUpHandler
              }
              colorScheme="green"
              variant="solid"
            >
              <a href="/">For Sale</a>
            </Button>
            <Button
              onClick={
                allowedLocations.includes(location)
                  ? searchRentHandler
                  : popUpHandler
              }
              colorScheme="green"
              variant="solid"
            >
              <a href="/">To Rent</a>
            </Button>
          </Stack>
        </Flex>
      </Flex>
      <ModalUi
        onClose={onClose}
        isOpen={isOpen}
        title={"Test Mode!"}
        message={"Please search 'London', 'Leeds' or 'Bristol'."}
      />
    </>
  );
}
