"use client"

interface Location {
  // Define the properties of a Location object here
  id?: string;
  name: string;
  // Add other fields as needed
}

export const getLocations = async (): Promise<Location[]> => {
  try {
    const response = await fetch('/api/locations');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch locations: ${errorText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getLocations:', error);
    throw new Error('Failed to fetch locations. Please try again later.');
  }
};

export const addLocation = async (newLocation: Location): Promise<Location> => {
  try {
    const response = await fetch('/api/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLocation),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add location: ${errorText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in addLocation:', error);
    throw new Error('Failed to add location. Please try again later.');
  }
};

export const updateLocation = async (locationId: string, updatedData: Partial<Location>): Promise<Location> => {
  try {
    const response = await fetch(`/api/locations/${locationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update location: ${errorText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in updateLocation:', error);
    throw new Error('Failed to update location. Please try again later.');
  }
};
