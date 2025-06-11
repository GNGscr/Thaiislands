import dbConnect from "@/lib/mongodb";
import Island from "@/models/Island";


export default async function handler(req, res) {
    await dbConnect();
    
    if (req.method === 'GET') {
        const { id } = req.query;
        
        const island = await Island.findById(id);
        
        return res.status(200).json(island)
    }

    if (req.method === 'POST') {
        const { name, quantity, } = req.body;
        if (!name || !quantity) {
            return res.status(400).json({ error: 'Missing Fields' });
        }
        const item = new Island({ name, quantity });
        await item.save();
        return res.status(201).json(item);
    }
    res.status(405).end(`Method ${req.method} Not Allowed`)
}
