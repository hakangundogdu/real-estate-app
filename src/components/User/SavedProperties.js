import { useState } from 'react';
import { Text, SimpleGrid, VStack } from '@chakra-ui/react';

import PropertyBox from '../PropertyBox';
import { useSelector } from 'react-redux';

const SavedProperties = () => {
  const userId = useSelector((state) => state.user.uid);
  const savedProperty = useSelector((state) => state.listing.savedProperties);
  const [selectedProperty, setSelectedProperty] = useState();

  return (
    <VStack align="start" justify="start" mb="8">
      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="semibold"
        lineHeight="short"
        px="4"
      >
        {savedProperty.length === 0
          ? 'No Saved Properties'
          : `${savedProperty.length} Saved Properties`}
      </Text>

      <SimpleGrid my="4" columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {savedProperty.map((property) => (
          <PropertyBox
            onClick={() => setSelectedProperty(property)}
            property={property}
            key={property.id}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default SavedProperties;
