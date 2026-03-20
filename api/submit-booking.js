export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, propertyType, rooms, date, message } = req.body;

  if (!name || !email || !phone || !propertyType || !rooms?.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = 'appyRPhJlJsJQT71h';
  const tableId = 'tblkYNlO2HUMjr8Vj';

  const notesLines = [];
  if (propertyType) notesLines.push(`Property Type: ${propertyType}`);
  if (rooms?.length) notesLines.push(`Rooms: ${rooms.join(', ')}`);
  if (message)       notesLines.push(message);

  const payload = {
    records: [
      {
        fields: {
          Name: name,
          Email: email,
          Phone: phone,
          ...(date ? { 'Visit Date': date } : {}),
          ...(notesLines.length ? { Notes: notesLines.join('\n') } : {}),
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Airtable error:', data);
      return res.status(500).json({ error: 'Failed to save booking', detail: data });
    }

    return res.status(200).json({ success: true, id: data.records?.[0]?.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
