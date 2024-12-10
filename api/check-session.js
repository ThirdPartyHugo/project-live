export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      try {
        const DAILY_API_KEY = process.env.DAILY_API_KEY;
  
        // Fetch presence information for all active rooms
        const response = await fetch(`https://api.daily.co/v1/presence`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${DAILY_API_KEY}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching presence:', errorData);
          return res.status(response.status).json({ error: errorData.error });
        }
  
        const data = await response.json();
  
        // Check if any rooms are currently active
        if (!data || Object.keys(data).length === 0) {
          return res.status(200).json({ active: false, message: 'No active rooms' });
        }
  
        // Iterate over all active rooms to check for the userId
        for (const roomName in data) {
          const roomPresence = data[roomName];
  
          // Check if the room has participants
          if (roomPresence && roomPresence.length > 0) {
            const isActive = roomPresence.some((participant) => participant.userId === id);
  
            if (isActive) {
              return res.status(403).json({ active: true, error: 'User already in session' });
            }
          }
        }
  
        // If no matching userId is found, allow the user to join
        return res.status(200).json({ active: false, message: 'User allowed to join' });
      } catch (error) {
        console.error('Error checking presence:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
  