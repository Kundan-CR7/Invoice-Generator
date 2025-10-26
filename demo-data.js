// Demo Data Script for Invoice Generator
// Run this script to populate your database with sample data

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createDemoData() {
  try {
    console.log('🚀 Creating demo data...');

    // Create demo company
    const company = await prisma.company.create({
      data: {
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business Street, Suite 100, New York, NY 10001',
        gstNumber: 'GST123456789',
        logoUrl: 'https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=ACME'
      }
    });
    console.log('✅ Created company:', company.name);

    // Create demo customers
    const customers = await Promise.all([
      prisma.customer.create({
        data: {
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 234-5678',
          address: '456 Customer Ave, Los Angeles, CA 90210',
          companyId: company.id
        }
      }),
      prisma.customer.create({
        data: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 345-6789',
          address: '789 Client Blvd, Chicago, IL 60601',
          companyId: company.id
        }
      }),
      prisma.customer.create({
        data: {
          name: 'Mike Wilson',
          email: 'mike.wilson@email.com',
          phone: '+1 (555) 456-7890',
          address: '321 Business Rd, Houston, TX 77001',
          companyId: company.id
        }
      })
    ]);
    console.log('✅ Created customers:', customers.length);

    // Create demo products
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'Web Development Service',
          price: 150.00,
          description: 'Custom web development and design services',
          companyId: company.id
        }
      }),
      prisma.product.create({
        data: {
          name: 'Mobile App Development',
          price: 200.00,
          description: 'iOS and Android mobile application development',
          companyId: company.id
        }
      }),
      prisma.product.create({
        data: {
          name: 'Consulting Services',
          price: 100.00,
          description: 'Technical consulting and project management',
          companyId: company.id
        }
      }),
      prisma.product.create({
        data: {
          name: 'Maintenance & Support',
          price: 75.00,
          description: 'Ongoing maintenance and technical support',
          companyId: company.id
        }
      })
    ]);
    console.log('✅ Created products:', products.length);

    // Create demo invoices
    const invoice1 = await prisma.invoice.create({
      data: {
        number: 'INV-1',
        companyId: company.id,
        customerId: customers[0].id,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        taxRate: 8.5,
        discount: 50.00,
        items: [
          {
            name: 'Web Development Service',
            price: 150.00,
            qty: 10,
            lineTotal: 1500.00
          },
          {
            name: 'Consulting Services',
            price: 100.00,
            qty: 5,
            lineTotal: 500.00
          }
        ],
        status: 'SENT'
      }
    });

    const invoice2 = await prisma.invoice.create({
      data: {
        number: 'INV-2',
        companyId: company.id,
        customerId: customers[1].id,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        taxRate: 8.5,
        discount: 0.00,
        items: [
          {
            name: 'Mobile App Development',
            price: 200.00,
            qty: 3,
            lineTotal: 600.00
          },
          {
            name: 'Maintenance & Support',
            price: 75.00,
            qty: 12,
            lineTotal: 900.00
          }
        ],
        status: 'DRAFT'
      }
    });

    console.log('✅ Created invoices:', 2);

    console.log('\n🎉 Demo data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`- 1 Company: ${company.name}`);
    console.log(`- ${customers.length} Customers`);
    console.log(`- ${products.length} Products`);
    console.log('- 2 Sample Invoices');
    console.log('\n🌐 You can now visit http://localhost:5173 to see the demo data in action!');

  } catch (error) {
    console.error('❌ Error creating demo data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createDemoData();
