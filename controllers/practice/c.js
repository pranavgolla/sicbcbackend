const User = require('../../models/practice/m');

const uploadPhoto = async (req, res) => {
    try {
        const { name } = req.body;
        const photo = req.file;

        if (!name || !photo) {
            return res.status(400).json({ message: "Name and photo are required" });
        }

        const newUser = new User({
            name: name,
            photo: photo.filename
        });

        await newUser.save();
        res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error uploading photo", error });
    }
};

module.exports = { uploadPhoto };
