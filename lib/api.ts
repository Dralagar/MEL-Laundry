export interface Location {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image?: string;
  status?: string;
}

export async function getLocations(): Promise<Location[]> {
  try {
    console.log('Fetching locations...');
    const response = await fetch('http://localhost:5000/api/locations');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched locations:', data);
    return data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
}

export async function updateLocation(
  id: string,
  data: Partial<Omit<Location, '_id' | 'status'>>
): Promise<Location> {
  try {
    const response = await fetch(`http://localhost:5000/api/locations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
}