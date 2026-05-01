CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`subcategory` varchar(100),
	`image` varchar(255),
	`rating` float,
	`reviews_count` int DEFAULT 0,
	`in_stock` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `idx_category` ON `products` (`category`);--> statement-breakpoint
CREATE INDEX `idx_price` ON `products` (`price`);