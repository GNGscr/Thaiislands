import dbConnect from "@/lib/mongodb";
import Island from "@/models/Island";


export default async function handler(req, res) {
    await dbConnect();
    
    if (req.method === 'GET') {
        const { id } = req.query;
        
        const island = await Island.findById(id);
        // console.log("Island: ",island);
        
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





// import dbConnect from "@/lib/mongodb";
// import Islands from "@/models/islands";

// export default async function handler(req, res) {
//     await dbConnect();
//     // await Item.updateMany(
//     //   { bought: { $exists: false } },
//     //   { $set: { bought: true } }
//     // );
//     // console.log('כל המסמכים עודכנו עם bought=false');

//     if (req.method === 'GET') {
//         const items = await Islands.find();
//         return res.status(200).json(items)
//     }

//     // if (req.method === 'POST') {
//     //     const { name, quantity, } = req.body;
//     //     if (!name || !quantity) {
//     //         return res.status(400).json({ error: 'Missing Fields' });
//     //     }
//     //     const item = new Item({ name, quantity });
//     //     await item.save();
//     //     return res.status(201).json(item);
//     // }
//     res.status(405).end(`Method ${req.method} Not Allowed`)
// }