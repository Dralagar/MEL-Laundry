import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isOpen?: boolean;
  status?: string; 
}

// Function to fetch all locations
export const getLocations = async (): Promise<Location[]> => {
  try {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        isOpen: true,
      },
    });

    return locations.map(location => ({
      ...location,
      status: location.isOpen ? 'Open' : 'Not yet launched',
    }));
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw new Error('Failed to fetch locations. Please try again later.');
  }
};

// Function to add a new location
export const addLocation = async (newLocation: {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isOpen?: boolean;
}): Promise<Location> => {
  try {
    const { name, address, city, state, zipCode, isOpen } = newLocation;

    // Validate input
    if (!name || !address || !city || !state || !zipCode) {
      throw new Error('Missing required fields.');
    }

    const location = await prisma.location.create({
      data: {
        name,
        address,
        city,
        state,
        zipCode,
        isOpen: isOpen || false,
      },
    });

    return {
      ...location,
      status: location.isOpen ? 'Open' : 'Not yet launched',
    };
  } catch (error) {
    console.error('Error adding location:', error);
    throw new Error('Failed to add location. Please try again later.');
  }
};

// Function to update an existing location
export const updateLocation = async (
  locationId: string,
  updatedData: Partial<{
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    isOpen: boolean;
  }>
): Promise<Location> => {
  try {
    const location = await prisma.location.update({
      where: { id: locationId },
      data: updatedData,
    });

    return {
      ...location,
      status: location.isOpen ? 'Open' : 'Not yet launched',
    };
  } catch (error) {
    console.error('Error updating location:', error);
    throw new Error('Failed to update location. Please try again later.');
  }
};

