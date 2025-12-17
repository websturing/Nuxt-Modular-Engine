-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `activity_log` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`log_name` varchar(255),
	`description` text NOT NULL,
	`subject_type` varchar(255),
	`event` varchar(255),
	`subject_id` bigint unsigned,
	`causer_type` varchar(255),
	`causer_id` bigint unsigned,
	`properties` json,
	`batch_uuid` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `activity_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `assignment_lines` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`line_id` bigint unsigned NOT NULL,
	`gl_id` bigint unsigned NOT NULL,
	`is_active` tinyint(1) NOT NULL DEFAULT 1,
	`date_start` date,
	`date_end` date,
	`started_at` timestamp,
	`completed_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `assignment_lines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attendance_logs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`attendance_id` bigint unsigned NOT NULL,
	`log_type` enum('check_in','check_out','location','retry','error') NOT NULL,
	`timestamp` datetime NOT NULL,
	`latitude` decimal(10,8),
	`longitude` decimal(11,8),
	`accuracy` decimal(6,2),
	`device_id` varchar(255),
	`notes` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `attendance_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attendances` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`attendance_date` date NOT NULL,
	`check_in_time` datetime,
	`check_out_time` datetime,
	`status` enum('present','late','absent','on_leave','wfh'),
	`note` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `attendances_id` PRIMARY KEY(`id`),
	CONSTRAINT `attendances_user_id_attendance_date_unique` UNIQUE(`user_id`,`attendance_date`)
);
--> statement-breakpoint
CREATE TABLE `cache` (
	`key` varchar(255) NOT NULL,
	`value` mediumtext NOT NULL,
	`expiration` int NOT NULL,
	CONSTRAINT `cache_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `cache_locks` (
	`key` varchar(255) NOT NULL,
	`owner` varchar(255) NOT NULL,
	`expiration` int NOT NULL,
	CONSTRAINT `cache_locks_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `cutting_gl_color_sizes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`cutting_gl_color_id` bigint unsigned NOT NULL,
	`size` varchar(50) NOT NULL,
	`order_qty` int NOT NULL DEFAULT 0,
	`cut_qty` int NOT NULL DEFAULT 0,
	`stock_out_qty` int NOT NULL DEFAULT 0,
	`replacement_qty` int NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cutting_gl_color_sizes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cutting_gl_colors` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`cutting_gl_summary_id` bigint unsigned NOT NULL,
	`color` varchar(255) NOT NULL,
	`type` varchar(50),
	`order_qty` int NOT NULL DEFAULT 0,
	`cut_qty` int NOT NULL DEFAULT 0,
	`stock_out_qty` int NOT NULL DEFAULT 0,
	`replacement_qty` int NOT NULL DEFAULT 0,
	`last_sync_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cutting_gl_colors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cutting_gl_summaries` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gl_number` varchar(50) NOT NULL,
	`order_qty` int NOT NULL DEFAULT 0,
	`cut_qty` int NOT NULL DEFAULT 0,
	`stock_out_qty` int NOT NULL DEFAULT 0,
	`replacement_qty` int NOT NULL DEFAULT 0,
	`last_sync_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cutting_gl_summaries_id` PRIMARY KEY(`id`),
	CONSTRAINT `cutting_gl_summaries_gl_number_unique` UNIQUE(`gl_number`)
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255),
	`mac_address` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `devices_id` PRIMARY KEY(`id`),
	CONSTRAINT `devices_mac_address_unique` UNIQUE(`mac_address`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned,
	`name` varchar(255) NOT NULL,
	`gender` enum('male','female'),
	`date_birth` date,
	`employee_code` varchar(255) NOT NULL,
	`position` varchar(255),
	`department` varchar(255),
	`join_date` date,
	`active` tinyint(1) NOT NULL DEFAULT 1,
	`device_id` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_employee_code_unique` UNIQUE(`employee_code`)
);
--> statement-breakpoint
CREATE TABLE `failed_jobs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`uuid` varchar(255) NOT NULL,
	`connection` text NOT NULL,
	`queue` text NOT NULL,
	`payload` longtext NOT NULL,
	`exception` longtext NOT NULL,
	`failed_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `failed_jobs_id` PRIMARY KEY(`id`),
	CONSTRAINT `failed_jobs_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `gls` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gl_number` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `gls_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_batches` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`total_jobs` int NOT NULL,
	`pending_jobs` int NOT NULL,
	`failed_jobs` int NOT NULL,
	`failed_job_ids` longtext NOT NULL,
	`options` mediumtext,
	`cancelled_at` int,
	`created_at` int NOT NULL,
	`finished_at` int,
	CONSTRAINT `job_batches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`queue` varchar(255) NOT NULL,
	`payload` longtext NOT NULL,
	`attempts` tinyint unsigned NOT NULL,
	`reserved_at` int unsigned,
	`available_at` int unsigned NOT NULL,
	`created_at` int unsigned NOT NULL,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laying_plannings` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`assignment_line_id` bigint unsigned NOT NULL,
	`color` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`order_qty` int NOT NULL,
	`cut_qty` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `laying_plannings_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_layingplanning_line_color` UNIQUE(`assignment_line_id`,`color`)
);
--> statement-breakpoint
CREATE TABLE `leader_line_assignments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`line_id` bigint unsigned NOT NULL,
	`assigned_at` timestamp DEFAULT '2025-11-24 21:35:56',
	`unassigned_at` timestamp,
	`is_active` tinyint(1) NOT NULL DEFAULT 1,
	`created_by` bigint unsigned,
	`updated_by` bigint unsigned,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `leader_line_assignments_id` PRIMARY KEY(`id`),
	CONSTRAINT `leader_line_assignments_user_id_line_id_unassigned_at_unique` UNIQUE(`user_id`,`line_id`,`unassigned_at`)
);
--> statement-breakpoint
CREATE TABLE `line_devices` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`line_id` bigint unsigned,
	`device_id` bigint unsigned,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `line_devices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lines` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`location` varchar(450),
	CONSTRAINT `lines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `migrations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`migration` varchar(255) NOT NULL,
	`batch` int NOT NULL,
	CONSTRAINT `migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `model_has_permissions` (
	`permission_id` bigint unsigned NOT NULL,
	`model_type` varchar(255) NOT NULL,
	`model_id` bigint unsigned NOT NULL,
	CONSTRAINT `model_has_permissions_permission_id_model_id_model_type` PRIMARY KEY(`permission_id`,`model_id`,`model_type`)
);
--> statement-breakpoint
CREATE TABLE `model_has_roles` (
	`role_id` bigint unsigned NOT NULL,
	`model_type` varchar(255) NOT NULL,
	`model_id` bigint unsigned NOT NULL,
	CONSTRAINT `model_has_roles_role_id_model_id_model_type` PRIMARY KEY(`role_id`,`model_id`,`model_type`)
);
--> statement-breakpoint
CREATE TABLE `module_permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`module_id` bigint unsigned NOT NULL,
	`action` varchar(255) NOT NULL,
	`permission_name` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `module_permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `module_permissions_permission_name_unique` UNIQUE(`permission_name`)
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`parent_id` bigint unsigned,
	`icon` varchar(255),
	`order` int NOT NULL DEFAULT 0,
	`is_active` tinyint(1) NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `modules_id` PRIMARY KEY(`id`),
	CONSTRAINT `modules_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`email` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp,
	CONSTRAINT `password_reset_tokens_email` PRIMARY KEY(`email`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`guard_name` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `permissions_name_guard_name_unique` UNIQUE(`name`,`guard_name`)
);
--> statement-breakpoint
CREATE TABLE `personal_access_tokens` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`tokenable_type` varchar(255) NOT NULL,
	`tokenable_id` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	`token` varchar(64) NOT NULL,
	`abilities` text,
	`last_used_at` timestamp,
	`expires_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `personal_access_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `personal_access_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `replacement_histories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`replacement_request_id` bigint unsigned NOT NULL,
	`workflow_step_id` bigint unsigned NOT NULL,
	`action_by` bigint unsigned NOT NULL,
	`note` text NOT NULL,
	`is_approved` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `replacement_histories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `replacement_request` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`workflow_definition_id` bigint unsigned NOT NULL,
	`current_step_id` bigint unsigned,
	`serial_number` varchar(255) NOT NULL,
	`created_by` bigint unsigned,
	`status` enum('draft','in_progress','completed','rejected') NOT NULL DEFAULT 'draft',
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `replacement_request_id` PRIMARY KEY(`id`),
	CONSTRAINT `replacement_request_serial_number_unique` UNIQUE(`serial_number`)
);
--> statement-breakpoint
CREATE TABLE `replacement_request_detail` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gl_no` varchar(191) NOT NULL,
	`size` varchar(10) NOT NULL,
	`color` varchar(255) NOT NULL,
	`pcs` int NOT NULL,
	`line_id` bigint NOT NULL,
	`laying_planning_id` int,
	`description` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`replacement_request_id` int,
	CONSTRAINT `replacement_request_detail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `replacement_request_note` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`replacement_request_id` bigint unsigned NOT NULL,
	`created_by` bigint unsigned NOT NULL,
	`description` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `replacement_request_note_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role_has_permissions` (
	`permission_id` bigint unsigned NOT NULL,
	`role_id` bigint unsigned NOT NULL,
	CONSTRAINT `role_has_permissions_permission_id_role_id` PRIMARY KEY(`permission_id`,`role_id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`guard_name` varchar(255) NOT NULL,
	`color` varchar(255) NOT NULL DEFAULT '#6c757d',
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_guard_name_unique` UNIQUE(`name`,`guard_name`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` bigint unsigned,
	`ip_address` varchar(45),
	`user_agent` text,
	`payload` longtext NOT NULL,
	`last_activity` int NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` text,
	`type` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `shifts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	`tolerance` time NOT NULL,
	`is_night_shift` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `shifts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stock_in_defects` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`qty` int,
	`stockin_id` int,
	CONSTRAINT `stock_in_defects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stock_ins` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`serial_number` varchar(191) NOT NULL,
	`ticket_no` int unsigned NOT NULL,
	`gl_no` varchar(191) NOT NULL,
	`size` varchar(10) NOT NULL,
	`user_dispatch_id` int NOT NULL,
	`color` varchar(255) NOT NULL,
	`pcs` int unsigned NOT NULL,
	`date_stock_out` date,
	`cor_id` bigint unsigned NOT NULL,
	`user_id` bigint unsigned,
	`user_dispatch_name` varchar(191),
	`box_number` varchar(191),
	`line_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	`input_source` varchar(255) NOT NULL,
	`container_scan_status` varchar(255) NOT NULL,
	CONSTRAINT `stock_ins_id` PRIMARY KEY(`id`),
	CONSTRAINT `stock_ins_serial_number_unique` UNIQUE(`serial_number`)
);
--> statement-breakpoint
CREATE TABLE `user_shift_assignments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`shift_id` bigint unsigned NOT NULL,
	`effective_date_start` date NOT NULL,
	`effective_date_end` date,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `user_shift_assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified_at` timestamp,
	`password` varchar(255) NOT NULL,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `workflow_definitions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`is_active` tinyint(1) NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `workflow_definitions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflow_steps` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`workflow_definition_id` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	`step_order` int unsigned NOT NULL,
	`role_id_responsible` bigint unsigned NOT NULL,
	`is_final` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `workflow_steps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `assignment_lines` ADD CONSTRAINT `assignment_lines_gl_id_foreign` FOREIGN KEY (`gl_id`) REFERENCES `gls`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assignment_lines` ADD CONSTRAINT `assignment_lines_line_id_foreign` FOREIGN KEY (`line_id`) REFERENCES `lines`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assignment_lines` ADD CONSTRAINT `assignment_lines_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `attendance_logs` ADD CONSTRAINT `attendance_logs_attendance_id_foreign` FOREIGN KEY (`attendance_id`) REFERENCES `attendances`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cutting_gl_color_sizes` ADD CONSTRAINT `cutting_gl_color_sizes_cutting_gl_color_id_foreign` FOREIGN KEY (`cutting_gl_color_id`) REFERENCES `cutting_gl_colors`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cutting_gl_colors` ADD CONSTRAINT `cutting_gl_colors_cutting_gl_summary_id_foreign` FOREIGN KEY (`cutting_gl_summary_id`) REFERENCES `cutting_gl_summaries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `laying_plannings` ADD CONSTRAINT `laying_plannings_assignment_line_id_foreign` FOREIGN KEY (`assignment_line_id`) REFERENCES `assignment_lines`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leader_line_assignments` ADD CONSTRAINT `leader_line_assignments_line_id_foreign` FOREIGN KEY (`line_id`) REFERENCES `lines`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leader_line_assignments` ADD CONSTRAINT `leader_line_assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `line_devices` ADD CONSTRAINT `line_devices_device_id_foreign` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `line_devices` ADD CONSTRAINT `line_devices_line_id_foreign` FOREIGN KEY (`line_id`) REFERENCES `lines`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `model_has_permissions` ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `model_has_roles` ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `module_permissions` ADD CONSTRAINT `module_permissions_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `modules` ADD CONSTRAINT `modules_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `modules`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replacement_histories` ADD CONSTRAINT `replacement_histories_action_by_foreign` FOREIGN KEY (`action_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replacement_histories` ADD CONSTRAINT `replacement_histories_replacement_request_id_foreign` FOREIGN KEY (`replacement_request_id`) REFERENCES `replacement_request`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replacement_histories` ADD CONSTRAINT `replacement_histories_workflow_step_id_foreign` FOREIGN KEY (`workflow_step_id`) REFERENCES `workflow_steps`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replacement_request` ADD CONSTRAINT `replacement_request_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replacement_request` ADD CONSTRAINT `replacement_request_current_step_id_foreign` FOREIGN KEY (`current_step_id`) REFERENCES `workflow_steps`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replacement_request` ADD CONSTRAINT `replacement_request_workflow_definition_id_foreign` FOREIGN KEY (`workflow_definition_id`) REFERENCES `workflow_definitions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replacement_request_note` ADD CONSTRAINT `replacement_request_note_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `replacement_request_note` ADD CONSTRAINT `replacement_request_note_replacement_request_id_foreign` FOREIGN KEY (`replacement_request_id`) REFERENCES `replacement_request`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_has_permissions` ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_has_permissions` ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_shift_assignments` ADD CONSTRAINT `user_shift_assignments_shift_id_foreign` FOREIGN KEY (`shift_id`) REFERENCES `shifts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_shift_assignments` ADD CONSTRAINT `user_shift_assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `workflow_steps` ADD CONSTRAINT `workflow_steps_role_id_responsible_foreign` FOREIGN KEY (`role_id_responsible`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `workflow_steps` ADD CONSTRAINT `workflow_steps_workflow_definition_id_foreign` FOREIGN KEY (`workflow_definition_id`) REFERENCES `workflow_definitions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `subject` ON `activity_log` (`subject_type`,`subject_id`);--> statement-breakpoint
CREATE INDEX `causer` ON `activity_log` (`causer_type`,`causer_id`);--> statement-breakpoint
CREATE INDEX `activity_log_log_name_index` ON `activity_log` (`log_name`);--> statement-breakpoint
CREATE INDEX `cutting_gl_color_sizes_cutting_gl_color_id_size_index` ON `cutting_gl_color_sizes` (`cutting_gl_color_id`,`size`);--> statement-breakpoint
CREATE INDEX `cutting_gl_colors_cutting_gl_summary_id_color_index` ON `cutting_gl_colors` (`cutting_gl_summary_id`,`color`);--> statement-breakpoint
CREATE INDEX `jobs_queue_index` ON `jobs` (`queue`);--> statement-breakpoint
CREATE INDEX `leader_line_assignments_user_id_index` ON `leader_line_assignments` (`user_id`);--> statement-breakpoint
CREATE INDEX `leader_line_assignments_line_id_index` ON `leader_line_assignments` (`line_id`);--> statement-breakpoint
CREATE INDEX `leader_line_assignments_user_id_is_active_index` ON `leader_line_assignments` (`user_id`,`is_active`);--> statement-breakpoint
CREATE INDEX `model_has_permissions_model_id_model_type_index` ON `model_has_permissions` (`model_id`,`model_type`);--> statement-breakpoint
CREATE INDEX `model_has_roles_model_id_model_type_index` ON `model_has_roles` (`model_id`,`model_type`);--> statement-breakpoint
CREATE INDEX `personal_access_tokens_tokenable_type_tokenable_id_index` ON `personal_access_tokens` (`tokenable_type`,`tokenable_id`);--> statement-breakpoint
CREATE INDEX `sessions_user_id_index` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `sessions_last_activity_index` ON `sessions` (`last_activity`);
*/