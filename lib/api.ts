export interface Location {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image?: string;
  status: 'active' | 'inactive';
}

export async function getLocations(): Promise<Location[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`);
  if (!response.ok) throw new Error('Failed to fetch locations');
  return response.json();
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