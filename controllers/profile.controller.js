import prisma from '../lib/prisma.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, title, email, phone, github, summary, profilePicture } = req.body;

    const profile = await prisma.profile.update({
      where: { id: 'profile-1' },
      data: {
        fullName,
        title,
        email,
        phone,
        github,
        summary,
        profilePicture,
      },
    });

    res.json({ message: 'Profile updated', profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
