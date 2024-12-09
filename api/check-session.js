export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      try {
        const DAILY_API_KEY = 'a348147f7783ebb909804647f627bde3d873524b919f41370182acc58f9d96fc';
  
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
  
        // Extract the room's participants
        const roomPresence = data['WorkEnLigne_Webinars'];
  
        if (!roomPresence) {
          return res.status(200).json({ active: false, message: 'Room not currently active' });
        }
  
        // Check if the userId is already active in the room
        const isActive = roomPresence.some((participant) => participant.userId === id);
  
        if (isActive) {
          return res.status(403).json({ active: true, error: 'User already in session' });
        }
  
        // Allow the user to proceed if not active
        return res.status(200).json({ active: false, message: 'User allowed to join' });
      } catch (error) {
        console.error('Error checking presence:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
  