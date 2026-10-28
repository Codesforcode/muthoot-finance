require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../../config/db');
const Banner = require('./models/Banner');

const banners = [
  {
    title: 'Gold Loan',
    description: 'Quick and convenient gold loan services.',
    imageUrl: '/assets/banners/banner-01.webp',
    altText: 'Gold Loan banner',
    isActive: true,
    displayOrder: 1,
  },
  {
    title: 'Financial Solutions',
    description: 'Explore financial solutions for your needs.',
    imageUrl: '/assets/banners/banner-02.webp',
    altText: 'Financial Solutions banner',
    isActive: true,
    displayOrder: 2,
  },
  {
    title: 'Customer Services',
    description: 'Discover services designed for our customers.',
    imageUrl: '/assets/banners/banner-03.webp',
    altText: 'Customer Services banner',
    isActive: true,
    displayOrder: 3,
  },
  {
    title: 'Trusted Finance',
    description: 'Explore our financial product portfolio.',
    imageUrl: '/assets/banners/banner-04.webp',
    altText: 'Trusted Finance banner',
    isActive: true,
    displayOrder: 4,
  },
  {
    title: 'Digital Services',
    description: 'Access convenient digital financial services.',
    imageUrl: '/assets/banners/banner-05.webp',
    altText: 'Digital Services banner',
    isActive: true,
    displayOrder: 5,
  },
  {
    title: 'Explore More',
    description: 'Discover more financial products and services.',
    imageUrl: '/assets/banners/banner-06.webp',
    altText: 'Explore More banner',
    isActive: true,
    displayOrder: 6,
  },
];

async function seedBanners() {
  try {
    await connectDB();

    for (const banner of banners) {
      await Banner.findOneAndUpdate(
        { displayOrder: banner.displayOrder },
        { $set: banner },
        { upsert: true, returnDocument: 'after', runValidators: true }
      );
    }

    console.log(`${banners.length} banners seeded successfully.`);
  } catch (error) {
    console.error('Banner seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedBanners();