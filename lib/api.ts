export const getLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      if (!response.ok) {
        const errorText = await response.text(); // Get error details from response
        throw new Error(`Failed to fetch locations: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in getLocations:', error);
      throw error;
    }
  };
  
  export const addLocation = async (newLocation) => {
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocation),
      });
      if (!response.ok) {
        const errorText = await response.text(); // Get error details from response
        throw new Error(`Failed to add location: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in addLocation:', error);
      throw error;
    }
  };
  
  export const updateLocation = async (locationId, updatedData) => {
    try {
      const response = await fetch(`/api/locations/${locationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        const errorText = await response.text(); // Get error details from response
        throw new Error(`Failed to update location: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in updateLocation:', error);
      throw error;
    }
  };
  