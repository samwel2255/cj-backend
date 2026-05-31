import prisma from '../lib/prisma.js';

export const getAdminDashboardStats = async () => {
  try {
    const [projectCount, skillCount, educationCount, messageCount, unreadMessages] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.education.count(),
      prisma.contact.count(),
      prisma.contact.count({ where: { read: false } }),
    ]);

    return {
      projectCount,
      skillCount,
      educationCount,
      messageCount,
      unreadMessages,
    };
  } catch (error) {
    throw new Error('Error fetching dashboard stats: ' + error.message);
  }
};

export const sendContactNotification = async (contactData) => {
  // TODO: Implement email notification service
  console.log('New contact form submission:', contactData);
};
