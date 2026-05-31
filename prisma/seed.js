import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create or update admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'SecurePassword123!';
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  console.log('Admin user created/updated:', admin);

  // Seed profile
  const profile = await prisma.profile.upsert({
    where: { id: 'profile-1' },
    update: {},
    create: {
      id: 'profile-1',
      fullName: 'Samwel Kapongo Ernest',
      title: 'Bachelor Degree in Data Science',
      email: 'sernest2255@gmail.com',
      phone: '+255614419128',
      github: 'samwelkapongo',
      summary: 'Final-year Data Science student at Eastern Africa Statistical Training Centre (EASTC), graduating August 2026. Focused on data science, machine learning, statistical analysis, and web development.',
    },
  });

  console.log('Profile created:', profile);

  // Seed projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 'project-1' },
      update: {},
      create: {
        id: 'project-1',
        name: 'Kariakoo Navigation System',
        description: 'Smart system for navigating Kariakoo market and locating shops efficiently.',
        technologies: JSON.parse('["JavaScript", "Mapping Systems", "Web Development"]'),
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-2' },
      update: {},
      create: {
        id: 'project-2',
        name: 'Data Analysis Dashboard',
        description: 'Interactive dashboard for business insights using Power BI and Python.',
        technologies: JSON.parse('["Power BI", "Python", "Data Visualization"]'),
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-3' },
      update: {},
      create: {
        id: 'project-3',
        name: 'Student Performance Predictor',
        description: 'Machine learning model predicting student academic performance.',
        technologies: JSON.parse('["Python", "Machine Learning", "Data Science"]'),
        featured: true,
      },
    }),
  ]);

  console.log('Projects created:', projects);

  // Seed skills
  const skills = await Promise.all([
    prisma.skill.createMany({
      data: [
        { name: 'Python', category: 'Programming Languages', proficiency: 'expert' },
        { name: 'JavaScript', category: 'Programming Languages', proficiency: 'expert' },
        { name: 'Java', category: 'Programming Languages', proficiency: 'intermediate' },
        { name: 'SQL', category: 'Data Tools', proficiency: 'expert' },
        { name: 'React', category: 'Web Development', proficiency: 'expert' },
        { name: 'Next.js', category: 'Web Development', proficiency: 'expert' },
        { name: 'Machine Learning', category: 'Core Skills', proficiency: 'expert' },
        { name: 'Data Analysis', category: 'Core Skills', proficiency: 'expert' },
      ],
      skipDuplicates: true,
    }),
  ]);

  console.log('Skills created');

  // Seed education
  const education = await prisma.education.upsert({
    where: { id: 'edu-1' },
    update: {},
    create: {
      id: 'edu-1',
      degree: 'Bachelor Degree in Data Science',
      institution: 'Eastern Africa Statistical Training Centre (EASTC)',
      startYear: 2023,
      endYear: 2026,
      status: 'Final Year',
      details: JSON.parse('["Expected Graduation: August 2026", "Strong academic performance", "Focus on Machine Learning and Data Analysis"]'),
    },
  });

  console.log('Education created:', education);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
