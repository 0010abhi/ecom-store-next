#!/usr/bin/env node

const mysql = require('mysql2/promise');

const categories = [
  { name: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories'] },
  { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids', 'Shoes'] },
  { name: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding'] },
  { name: 'Sports', subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports'] },
  { name: 'Books', subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics'] },
  { name: 'Toys & Games', subcategories: ['Action Figures', 'Board Games', 'LEGO', 'Puzzles'] },
];

const productNames = {
  Electronics: ['iPhone 15', 'Samsung Galaxy', 'MacBook Pro', 'iPad', 'AirPods', 'Apple Watch', 'Dell XPS', 'OnePlus', 'Google Pixel', 'Surface Pro'],
  Clothing: ['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Sweater', 'Hoodie', 'Shorts', 'Skirt', 'Blazer', 'Coat'],
  'Home & Garden': ['Sofa', 'Dining Table', 'Bedframe', 'Lamp', 'Mirror', 'Curtains', 'Rug', 'Plant', 'Wall Art', 'Cushion'],
  Sports: ['Running Shoes', 'Yoga Mat', 'Dumbbells', 'Bicycle', 'Tennis Racket', 'Soccer Ball', 'Swimming Pool', 'Skateboard', 'Tent', 'Backpack'],
  Books: ['The Great Gatsby', '1984', 'To Kill a Mockingbird', 'Harry Potter', 'The Hobbit', 'Dune', 'Sapiens', 'Atomic Habits', 'Educated', 'Mistborn'],
  'Toys & Games': ['Barbie Doll', 'LEGO City', 'Monopoly', 'Chess Set', 'Rubik\'s Cube', 'Superhero Figure', 'Puzzle 1000', 'Hot Wheels', 'Yo-Yo', 'Trading Cards'],
};

function generateDescription(name, category) {
  const descriptions = [
    `Premium quality ${name} perfect for everyday use`,
    `Durable and stylish ${name} ideal for ${category}`,
    `High-performance ${name} with excellent features`,
    `Affordable ${name} for all budgets`,
    `Professional-grade ${name} for enthusiasts`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generatePrice() {
  const price = Math.random() * 500 + 10; // Between $10 and $510
  return Math.round(price * 100) / 100;
}

function generateRating() {
  return (Math.random() * 2 + 3).toFixed(1); // Between 3.0 and 5.0
}

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root1234',
  });

  try {
    console.log('Creating database...');
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'fakestore'}\``);
    console.log('Selecting database...');
    await connection.query(`USE \`${process.env.DB_NAME || 'fakestore'}\``);

    console.log('Creating products table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        subcategory VARCHAR(100),
        image VARCHAR(255),
        rating FLOAT,
        reviews_count INT DEFAULT 0,
        in_stock BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_price (price)
      )
    `);

    console.log('Inserting 1000 product entries...');
    const products = [];
    let id = 1;

    for (let i = 0; i < 1000; i++) {
      const categoryObj = categories[Math.floor(Math.random() * categories.length)];
      const subcategory = categoryObj.subcategories[Math.floor(Math.random() * categoryObj.subcategories.length)];
      const productNameList = productNames[categoryObj.name] || productNames.Electronics;
      const baseName = productNameList[Math.floor(Math.random() * productNameList.length)];
      const title = `${baseName} - Variant ${(i % 20) + 1}`;
      const price = generatePrice();
      const image = `https://via.placeholder.com/300x300?text=${encodeURIComponent(title)}`;
      const rating = generateRating();
      const reviewsCount = Math.floor(Math.random() * 500) + 1;

      products.push([
        title,
        price,
        generateDescription(title, categoryObj.name),
        categoryObj.name,
        subcategory,
        image,
        rating,
        reviewsCount,
        Math.random() > 0.1, // 90% in stock
      ]);

      if ((i + 1) % 100 === 0 || i === 999) {
        await connection.query(
          `INSERT INTO products (title, price, description, category, subcategory, image, rating, reviews_count, in_stock) VALUES ?`,
          [products]
        );
        console.log(`✓ Inserted ${Math.min(i + 1, 1000)} products`);
        products.length = 0;
      }
    }

    console.log('✅ Database setup completed successfully!');
    console.log('Database: fakestore');
    console.log('Table: products');
    console.log('Total products: 1000');
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

setupDatabase();
