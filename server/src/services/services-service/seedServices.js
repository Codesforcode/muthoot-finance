require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../../config/db');
const Service = require('./models/service');

const services = [
{
name: 'Gold Loan',
slug: 'gold-loan',
description: 'Gold loan services',
icon: '💎',
href: '#services',
displayOrder: 1,
},
{
name: 'Housing Finance',
slug: 'housing-finance',
description: 'Housing finance solutions',
icon: '🏠',
href: '#services',
displayOrder: 2,
},
{
name: 'Personal Loan',
slug: 'personal-loan',
description: 'Personal loan services',
icon: '💰',
href: '#services',
displayOrder: 3,
},
{
name: 'Small Business Loan',
slug: 'small-business-loan',
description: 'Financing solutions for small businesses',
icon: '🏪',
href: '#services',
displayOrder: 4,
},
{
name: 'Insurance',
slug: 'insurance',
description: 'Insurance products and services',
icon: '🛡️',
href: '#services',
displayOrder: 5,
},
{
name: 'Home Loan',
slug: 'home-loan',
description: 'Home loan services',
icon: '🏡',
href: '#services',
displayOrder: 6,
},
{
name: 'SME Loan',
slug: 'sme-loan',
description: 'Loans for small and medium enterprises',
icon: '💳',
href: '#services',
displayOrder: 7,
},
{
name: 'Corporate Business Loan',
slug: 'corporate-business-loan',
description: 'Business financing solutions',
icon: '🏢',
href: '#services',
displayOrder: 8,
},
{
name: 'Vehicle Loan',
slug: 'vehicle-loan',
description: 'Vehicle financing services',
icon: '🚘',
href: '#services',
displayOrder: 9,
},
{
name: 'Mutual Funds',
slug: 'mutual-funds',
description: 'Mutual fund related services',
icon: '📈',
href: '#services',
displayOrder: 10,
},
{
name: 'Money Transfer',
slug: 'money-transfer',
description: 'Money transfer services',
icon: '💸',
href: '#services',
displayOrder: 11,
},
{
name: 'Loan Against Property',
slug: 'loan-against-property',
description: 'Loans secured against property',
icon: '🏘️',
href: '#services',
displayOrder: 12,
},
{
name: 'NCD',
slug: 'ncd',
description: 'Non-convertible debentures information',
icon: '💵',
href: '#services',
displayOrder: 13,
},
{
name: 'Custom Offers',
slug: 'custom-offers',
description: 'Available customer offers',
icon: '🎁',
href: '#services',
displayOrder: 14,
},
{
name: 'PAN Card',
slug: 'pan-card',
description: 'PAN card related services',
icon: '🪪',
href: '#services',
displayOrder: 15,
},
{
name: 'Micro Finance',
slug: 'micro-finance',
description: 'Microfinance services',
icon: '💳',
href: '#services',
displayOrder: 16,
},
{
name: 'Digital & Cashless',
slug: 'digital-cashless',
description: 'Digital and cashless services',
icon: '📱',
href: '#services',
displayOrder: 17,
},
{
name: 'Milligram Rewards',
slug: 'milligram-rewards',
description: 'Customer rewards information',
icon: '🪙',
href: '#services',
displayOrder: 18,
},
];

async function seedServices() {
try {
await connectDB();


for (const service of services) {
  await Service.findOneAndUpdate(
    { slug: service.slug },
    { $set: service },
    {
  upsert: true,
  returnDocument: 'after',
  runValidators: true,
}
  );
}

console.log(`${services.length} services seeded successfully.`);


} catch (error) {
console.error('Seeding failed:', error.message);
process.exitCode = 1;
} finally {
await mongoose.disconnect();
}
}

seedServices();
