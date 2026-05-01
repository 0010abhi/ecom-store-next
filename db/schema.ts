import {
  mysqlTable,
  int,
  varchar,
  decimal,
  text,
  float,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const products = mysqlTable(
  'products',
  {
    id:           int('id').autoincrement().primaryKey(),
    title:        varchar('title', { length: 255 }).notNull(),
    price:        decimal('price', { precision: 10, scale: 2 }).notNull(),
    description:  text('description'),
    category:     varchar('category', { length: 100 }).notNull(),
    subcategory:  varchar('subcategory', { length: 100 }),
    image:        varchar('image', { length: 255 }),
    rating:       float('rating'),
    reviewsCount: int('reviews_count').default(0),
    inStock:      boolean('in_stock').default(true),
    createdAt:    timestamp('created_at').defaultNow(),
    updatedAt:    timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => [
    index('idx_category').on(table.category),
    index('idx_price').on(table.price),
  ],
);

export type Product    = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const inventory = mysqlTable(
  'inventory',
  {
    id:        int('id').autoincrement().primaryKey(),
    productId: int('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
    quantity:  int('quantity').notNull().default(0),
    warehouse: varchar('warehouse', { length: 100 }),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => [
    index('idx_inventory_product').on(table.productId),
  ],
);

export const productsRelations = relations(products, ({ many }) => ({
  inventory: many(inventory),
}));

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(products, { fields: [inventory.productId], references: [products.id] }),
}));

export type Inventory    = typeof inventory.$inferSelect;
export type NewInventory = typeof inventory.$inferInsert;
