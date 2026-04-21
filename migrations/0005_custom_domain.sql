ALTER TABLE `apps` ADD `custom_domain` text;--> statement-breakpoint
ALTER TABLE `apps` ADD `custom_domain_verified` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `apps` ADD `custom_domain_set_at` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `apps_custom_domain_idx` ON `apps` (`custom_domain`);
