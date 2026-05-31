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

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({ where: { id } });

    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
