let messages = []; // Array untuk menyimpan pesan

export default function handler(req, res) {
    if (req.method === "GET") {
        // Ambil semua pesan
        res.status(200).json(messages);
    } else if (req.method === "POST") {
        // Tambah pesan baru
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "Question is required!" });
        }
        const newMessage = {
            id: messages.length + 1,
            question,
            timestamp: new Date().toLocaleString() // Tambahkan waktu
        };
        messages.push(newMessage);
        res.status(201).json(newMessage);
    } else if (req.method === "DELETE") {
        // Hapus semua pesan
        messages = [];
        res.status(200).json({ message: "All messages deleted!" });
    } else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
