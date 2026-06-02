import prisma from '../lib/prisma.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    });

    res.status(201).json({
      message: 'Message received. Thank you for contacting us!',
      contact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Alias for admin functionality
export const getAllContacts = getMessages;

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contact.findUnique({ where: { id } });

    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await prisma.contact.update({
      where: { id },
      data: { read: true },
    });

    res.json({ message: 'Message marked as read', contact: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update contact for admin (mark as read or update other fields)
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const contact = await prisma.contact.update({
      where: { id },
      data: { read: read !== undefined ? read : true },
    });

    res.json({ message: 'Contact updated', contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({ where: { id } });

    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Alias for admin functionality
export const deleteContact = deleteMessage;
