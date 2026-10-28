require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../../config/db');
const Highlight = require('./models/Highlight');

const highlights = [
  {
    title: "India's No. 1 Most Trusted Financial Services Brand*",
    description:
      "A trusted name in financial services, committed to serving customers with reliable financial solutions.",
    imageUrl: '/assets/why-choose-us/brand-ambassadors.webp',
    link: '#corporate',
    isActive: true,
    displayOrder: 1,
  },
  {
    title: 'Trusted by 72 Cr+ Satisfied Customers*',
    description:
      'Building customer relationships through accessible financial services.',
    imageUrl: '/assets/why-choose-us/brand-ambassadors.webp',
    link: '#corporate',
    isActive: true,
    displayOrder: 2,
  },
  {
    title: 'Largest Gold Loan Portfolio in India*',
    description:
      'Gold loan solutions designed to meet customers’ financial requirements.',
    imageUrl: '/assets/why-choose-us/brand-ambassadors.webp',
    link: '#gold-loan',
    isActive: true,
    displayOrder: 3,
  },
  {
    title: 'Large Network of 7,500+ Branches*',
    description:
      'A wide branch network helping customers access financial services.',
    imageUrl: '/assets/why-choose-us/brand-ambassadors.webp',
    link: '#branches',
    isActive: true,
    displayOrder: 4,
  },
  {
    title: '800 Years of Family Business Legacy',
    description:
      'A legacy built on experience, relationships and customer trust.',
    imageUrl: '/assets/why-choose-us/brand-ambassadors.webp',
    link: '#corporate',
    isActive: true,
    displayOrder: 5,
  },
  {
    title: 'Management Speaks',
    description:
      'Learn about the leadership and vision guiding the organisation.',
    imageUrl: '/assets/why-choose-us/brand-ambassadors.webp',
    link: '#management',
    isActive: true,
    displayOrder: 6,
  },
];

async function seedHighlights() {
  try {
    await connectDB();

    for (const highlight of highlights) {
      await Highlight.findOneAndUpdate(
        { displayOrder: highlight.displayOrder },
        { $set: highlight },
        {
          upsert: true,
          returnDocument: 'after',
          runValidators: true,
        }
      );
    }

    console.log(`${highlights.length} highlights seeded successfully.`);
  } catch (error) {
    console.error('Highlight seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedHighlights();

