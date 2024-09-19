import Location from '@/lib/models/Location'; // Adjust the path if necessary

export const getLocations = async (): Promise<Location[]> => {
  try {
    const response = await fetch('/api/locations');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch locations: ${errorText}`);
    }
    return response.json(); // Ensure this matches the `Location[]` type
  } catch (error) {
    console.error('Error in getLocations:', error);
    throw new Error('Failed to fetch locations. Please try again later.');
  }
};
