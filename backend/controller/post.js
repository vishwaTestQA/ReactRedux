const post = async (req, res) => {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const newPost = 
    }
}