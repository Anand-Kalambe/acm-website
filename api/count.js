export default async function handler(req, res) {
  // 1. Get the magazine ID from the URL (e.g. ?id=vol1)
  const { id, type } = req.query; 
  
  // CHANGE THIS TO A UNIQUE NAME
  const NAMESPACE = 'anand-acm-project-final'; 

  try {
    // 2. Determine which external URL to call
    let externalUrl;
    if (type === 'increment') {
      // If we want to add +1
      externalUrl = `https://api.counterapi.dev/v1/${NAMESPACE}/${id}/up`;
    } else {
      // If we just want to read the number
      externalUrl = `https://api.counterapi.dev/v1/${NAMESPACE}/${id}`;
    }

    // 3. The Backend calls the Public API (Ad-blockers can't stop this)
    const response = await fetch(externalUrl);
    
    // 4. Handle "Not Found" (New counter) by returning 0
    if (response.status === 404) {
      return res.status(200).json({ count: 0 });
    }

    if (!response.ok) {
      throw new Error('External API Failed');
    }

    const data = await response.json();
    
    // 5. Send the count back to your frontend
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}