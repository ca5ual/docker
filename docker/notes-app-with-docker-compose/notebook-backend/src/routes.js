const express = require("express");
const { Notebook } = require("./models");
const notebookRouter = express.Router();
const mongoose = require('mongoose');

notebookRouter.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "name is required" })
        }

        const notebook = new Notebook({ name, description });
        await notebook.save();
        res.status(201).json({ data: notebook })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

notebookRouter.get('/', async (req, res) => {
    try {
        const notebook = await Notebook.find();
        return res.json({ data: notebook })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

notebookRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Notebook not found" })
        }

        const notebook = await Notebook.findById(id);

        return res.json({ data: notebook })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

notebookRouter.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Notebook not found" })
        }
        const notebook = await Notebook.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );

        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }

        return res.json({ data: notebook });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

notebookRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Notebook not found" })
        }

        const notebook = await Notebook.findByIdAndDelete(id);

        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }

        return res.json({ data: notebook });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = {
    notebookRouter,
};