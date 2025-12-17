import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, bigint, varchar, text, json, char, timestamp, foreignKey, date, mysqlEnum, datetime, decimal, unique, mediumtext, int, longtext, tinyint, time } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const activityLog = mysqlTable("activity_log", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	logName: varchar("log_name", { length: 255 }),
	description: text().notNull(),
	subjectType: varchar("subject_type", { length: 255 }),
	event: varchar({ length: 255 }),
	subjectId: bigint("subject_id", { mode: "number", unsigned: true }),
	causerType: varchar("causer_type", { length: 255 }),
	causerId: bigint("causer_id", { mode: "number", unsigned: true }),
	properties: json(),
	batchUuid: char("batch_uuid", { length: 36 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("subject").on(table.subjectType, table.subjectId),
	index("causer").on(table.causerType, table.causerId),
	index("activity_log_log_name_index").on(table.logName),
	primaryKey({ columns: [table.id], name: "activity_log_id"}),
]);

export const assignmentLines = mysqlTable("assignment_lines", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	lineId: bigint("line_id", { mode: "number", unsigned: true }).notNull().references(() => lines.id, { onDelete: "cascade" } ),
	glId: bigint("gl_id", { mode: "number", unsigned: true }).notNull().references(() => gls.id, { onDelete: "cascade" } ),
	isActive: tinyint("is_active").default(1).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateStart: date("date_start", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateEnd: date("date_end", { mode: 'string' }),
	startedAt: timestamp("started_at", { mode: 'string' }),
	completedAt: timestamp("completed_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "assignment_lines_id"}),
]);

export const attendanceLogs = mysqlTable("attendance_logs", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	attendanceId: bigint("attendance_id", { mode: "number", unsigned: true }).notNull().references(() => attendances.id, { onDelete: "cascade" } ),
	logType: mysqlEnum("log_type", ['check_in','check_out','location','retry','error']).notNull(),
	timestamp: datetime({ mode: 'string'}).notNull(),
	latitude: decimal({ precision: 10, scale: 8 }),
	longitude: decimal({ precision: 11, scale: 8 }),
	accuracy: decimal({ precision: 6, scale: 2 }),
	deviceId: varchar("device_id", { length: 255 }),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "attendance_logs_id"}),
]);

export const attendances = mysqlTable("attendances", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	attendanceDate: date("attendance_date", { mode: 'string' }).notNull(),
	checkInTime: datetime("check_in_time", { mode: 'string'}),
	checkOutTime: datetime("check_out_time", { mode: 'string'}),
	status: mysqlEnum(['present','late','absent','on_leave','wfh']),
	note: text(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "attendances_id"}),
	unique("attendances_user_id_attendance_date_unique").on(table.userId, table.attendanceDate),
]);

export const cache = mysqlTable("cache", {
	key: varchar({ length: 255 }).notNull(),
	value: mediumtext().notNull(),
	expiration: int().notNull(),
},
(table) => [
	primaryKey({ columns: [table.key], name: "cache_key"}),
]);

export const cacheLocks = mysqlTable("cache_locks", {
	key: varchar({ length: 255 }).notNull(),
	owner: varchar({ length: 255 }).notNull(),
	expiration: int().notNull(),
},
(table) => [
	primaryKey({ columns: [table.key], name: "cache_locks_key"}),
]);

export const cuttingGlColorSizes = mysqlTable("cutting_gl_color_sizes", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	cuttingGlColorId: bigint("cutting_gl_color_id", { mode: "number", unsigned: true }).notNull().references(() => cuttingGlColors.id, { onDelete: "cascade" } ),
	size: varchar({ length: 50 }).notNull(),
	orderQty: int("order_qty").default(0).notNull(),
	cutQty: int("cut_qty").default(0).notNull(),
	stockOutQty: int("stock_out_qty").default(0).notNull(),
	replacementQty: int("replacement_qty").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("cutting_gl_color_sizes_cutting_gl_color_id_size_index").on(table.cuttingGlColorId, table.size),
	primaryKey({ columns: [table.id], name: "cutting_gl_color_sizes_id"}),
]);

export const cuttingGlColors = mysqlTable("cutting_gl_colors", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	cuttingGlSummaryId: bigint("cutting_gl_summary_id", { mode: "number", unsigned: true }).notNull().references(() => cuttingGlSummaries.id, { onDelete: "cascade" } ),
	color: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 50 }),
	orderQty: int("order_qty").default(0).notNull(),
	cutQty: int("cut_qty").default(0).notNull(),
	stockOutQty: int("stock_out_qty").default(0).notNull(),
	replacementQty: int("replacement_qty").default(0).notNull(),
	lastSyncAt: timestamp("last_sync_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("cutting_gl_colors_cutting_gl_summary_id_color_index").on(table.cuttingGlSummaryId, table.color),
	primaryKey({ columns: [table.id], name: "cutting_gl_colors_id"}),
]);

export const cuttingGlSummaries = mysqlTable("cutting_gl_summaries", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	glNumber: varchar("gl_number", { length: 50 }).notNull(),
	orderQty: int("order_qty").default(0).notNull(),
	cutQty: int("cut_qty").default(0).notNull(),
	stockOutQty: int("stock_out_qty").default(0).notNull(),
	replacementQty: int("replacement_qty").default(0).notNull(),
	lastSyncAt: timestamp("last_sync_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "cutting_gl_summaries_id"}),
	unique("cutting_gl_summaries_gl_number_unique").on(table.glNumber),
]);

export const devices = mysqlTable("devices", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }),
	macAddress: varchar("mac_address", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "devices_id"}),
	unique("devices_mac_address_unique").on(table.macAddress),
]);

export const employees = mysqlTable("employees", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "set null" } ),
	name: varchar({ length: 255 }).notNull(),
	gender: mysqlEnum(['male','female']),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateBirth: date("date_birth", { mode: 'string' }),
	employeeCode: varchar("employee_code", { length: 255 }).notNull(),
	position: varchar({ length: 255 }),
	department: varchar({ length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	joinDate: date("join_date", { mode: 'string' }),
	active: tinyint().default(1).notNull(),
	deviceId: varchar("device_id", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "employees_id"}),
	unique("employees_employee_code_unique").on(table.employeeCode),
]);

export const failedJobs = mysqlTable("failed_jobs", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	uuid: varchar({ length: 255 }).notNull(),
	connection: text().notNull(),
	queue: text().notNull(),
	payload: longtext().notNull(),
	exception: longtext().notNull(),
	failedAt: timestamp("failed_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "failed_jobs_id"}),
	unique("failed_jobs_uuid_unique").on(table.uuid),
]);

export const gls = mysqlTable("gls", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	glNumber: varchar("gl_number", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "gls_id"}),
]);

export const jobBatches = mysqlTable("job_batches", {
	id: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	totalJobs: int("total_jobs").notNull(),
	pendingJobs: int("pending_jobs").notNull(),
	failedJobs: int("failed_jobs").notNull(),
	failedJobIds: longtext("failed_job_ids").notNull(),
	options: mediumtext(),
	cancelledAt: int("cancelled_at"),
	createdAt: int("created_at").notNull(),
	finishedAt: int("finished_at"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "job_batches_id"}),
]);

export const jobs = mysqlTable("jobs", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	queue: varchar({ length: 255 }).notNull(),
	payload: longtext().notNull(),
	attempts: tinyint({ unsigned: true }).notNull(),
	reservedAt: int("reserved_at", { unsigned: true }),
	availableAt: int("available_at", { unsigned: true }).notNull(),
	createdAt: int("created_at", { unsigned: true }).notNull(),
},
(table) => [
	index("jobs_queue_index").on(table.queue),
	primaryKey({ columns: [table.id], name: "jobs_id"}),
]);

export const layingPlannings = mysqlTable("laying_plannings", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	assignmentLineId: bigint("assignment_line_id", { mode: "number", unsigned: true }).notNull().references(() => assignmentLines.id, { onDelete: "cascade" } ),
	color: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 255 }).notNull(),
	orderQty: int("order_qty").notNull(),
	cutQty: int("cut_qty").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "laying_plannings_id"}),
	unique("uq_layingplanning_line_color").on(table.assignmentLineId, table.color),
]);

export const leaderLineAssignments = mysqlTable("leader_line_assignments", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id),
	lineId: bigint("line_id", { mode: "number", unsigned: true }).notNull().references(() => lines.id),
	assignedAt: timestamp("assigned_at", { mode: 'string' }).default('2025-11-24 21:35:56'),
	unassignedAt: timestamp("unassigned_at", { mode: 'string' }),
	isActive: tinyint("is_active").default(1).notNull(),
	createdBy: bigint("created_by", { mode: "number", unsigned: true }),
	updatedBy: bigint("updated_by", { mode: "number", unsigned: true }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("leader_line_assignments_user_id_index").on(table.userId),
	index("leader_line_assignments_line_id_index").on(table.lineId),
	index("leader_line_assignments_user_id_is_active_index").on(table.userId, table.isActive),
	primaryKey({ columns: [table.id], name: "leader_line_assignments_id"}),
	unique("leader_line_assignments_user_id_line_id_unassigned_at_unique").on(table.userId, table.lineId, table.unassignedAt),
]);

export const lineDevices = mysqlTable("line_devices", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	lineId: bigint("line_id", { mode: "number", unsigned: true }).references(() => lines.id, { onDelete: "cascade" } ),
	deviceId: bigint("device_id", { mode: "number", unsigned: true }).references(() => devices.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "line_devices_id"}),
]);

export const lines = mysqlTable("lines", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	location: varchar({ length: 450 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "lines_id"}),
]);

export const migrations = mysqlTable("migrations", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	migration: varchar({ length: 255 }).notNull(),
	batch: int().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "migrations_id"}),
]);

export const modelHasPermissions = mysqlTable("model_has_permissions", {
	permissionId: bigint("permission_id", { mode: "number", unsigned: true }).notNull().references(() => permissions.id, { onDelete: "cascade" } ),
	modelType: varchar("model_type", { length: 255 }).notNull(),
	modelId: bigint("model_id", { mode: "number", unsigned: true }).notNull(),
},
(table) => [
	index("model_has_permissions_model_id_model_type_index").on(table.modelId, table.modelType),
	primaryKey({ columns: [table.permissionId, table.modelId, table.modelType], name: "model_has_permissions_permission_id_model_id_model_type"}),
]);

export const modelHasRoles = mysqlTable("model_has_roles", {
	roleId: bigint("role_id", { mode: "number", unsigned: true }).notNull().references(() => roles.id, { onDelete: "cascade" } ),
	modelType: varchar("model_type", { length: 255 }).notNull(),
	modelId: bigint("model_id", { mode: "number", unsigned: true }).notNull(),
},
(table) => [
	index("model_has_roles_model_id_model_type_index").on(table.modelId, table.modelType),
	primaryKey({ columns: [table.roleId, table.modelId, table.modelType], name: "model_has_roles_role_id_model_id_model_type"}),
]);

export const modulePermissions = mysqlTable("module_permissions", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	moduleId: bigint("module_id", { mode: "number", unsigned: true }).notNull().references(() => modules.id, { onDelete: "cascade" } ),
	action: varchar({ length: 255 }).notNull(),
	permissionName: varchar("permission_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "module_permissions_id"}),
	unique("module_permissions_permission_name_unique").on(table.permissionName),
]);

export const modules = mysqlTable("modules", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	parentId: bigint("parent_id", { mode: "number", unsigned: true }),
	icon: varchar({ length: 255 }),
	order: int().default(0).notNull(),
	isActive: tinyint("is_active").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "modules_parent_id_foreign"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.id], name: "modules_id"}),
	unique("modules_slug_unique").on(table.slug),
]);

export const passwordResetTokens = mysqlTable("password_reset_tokens", {
	email: varchar({ length: 255 }).notNull(),
	token: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.email], name: "password_reset_tokens_email"}),
]);

export const permissions = mysqlTable("permissions", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	guardName: varchar("guard_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "permissions_id"}),
	unique("permissions_name_guard_name_unique").on(table.name, table.guardName),
]);

export const personalAccessTokens = mysqlTable("personal_access_tokens", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	tokenableType: varchar("tokenable_type", { length: 255 }).notNull(),
	tokenableId: bigint("tokenable_id", { mode: "number", unsigned: true }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	token: varchar({ length: 64 }).notNull(),
	abilities: text(),
	lastUsedAt: timestamp("last_used_at", { mode: 'string' }),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("personal_access_tokens_tokenable_type_tokenable_id_index").on(table.tokenableType, table.tokenableId),
	primaryKey({ columns: [table.id], name: "personal_access_tokens_id"}),
	unique("personal_access_tokens_token_unique").on(table.token),
]);

export const replacementHistories = mysqlTable("replacement_histories", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	replacementRequestId: bigint("replacement_request_id", { mode: "number", unsigned: true }).notNull().references(() => replacementRequest.id),
	workflowStepId: bigint("workflow_step_id", { mode: "number", unsigned: true }).notNull().references(() => workflowSteps.id),
	actionBy: bigint("action_by", { mode: "number", unsigned: true }).notNull().references(() => users.id),
	note: text().notNull(),
	isApproved: tinyint("is_approved").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "replacement_histories_id"}),
]);

export const replacementRequest = mysqlTable("replacement_request", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	workflowDefinitionId: bigint("workflow_definition_id", { mode: "number", unsigned: true }).notNull().references(() => workflowDefinitions.id, { onDelete: "cascade" } ),
	currentStepId: bigint("current_step_id", { mode: "number", unsigned: true }).references(() => workflowSteps.id, { onDelete: "set null" } ),
	serialNumber: varchar("serial_number", { length: 255 }).notNull(),
	createdBy: bigint("created_by", { mode: "number", unsigned: true }).references(() => users.id),
	status: mysqlEnum(['draft','in_progress','completed','rejected']).default('draft').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "replacement_request_id"}),
	unique("replacement_request_serial_number_unique").on(table.serialNumber),
]);

export const replacementRequestDetail = mysqlTable("replacement_request_detail", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	glNo: varchar("gl_no", { length: 191 }).notNull(),
	size: varchar({ length: 10 }).notNull(),
	color: varchar({ length: 255 }).notNull(),
	pcs: int().notNull(),
	lineId: bigint("line_id", { mode: "number" }).notNull(),
	layingPlanningId: int("laying_planning_id"),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	replacementRequestId: int("replacement_request_id"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "replacement_request_detail_id"}),
]);

export const replacementRequestNote = mysqlTable("replacement_request_note", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	replacementRequestId: bigint("replacement_request_id", { mode: "number", unsigned: true }).notNull().references(() => replacementRequest.id),
	createdBy: bigint("created_by", { mode: "number", unsigned: true }).notNull().references(() => users.id),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "replacement_request_note_id"}),
]);

export const roleHasPermissions = mysqlTable("role_has_permissions", {
	permissionId: bigint("permission_id", { mode: "number", unsigned: true }).notNull().references(() => permissions.id, { onDelete: "cascade" } ),
	roleId: bigint("role_id", { mode: "number", unsigned: true }).notNull().references(() => roles.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.permissionId, table.roleId], name: "role_has_permissions_permission_id_role_id"}),
]);

export const roles = mysqlTable("roles", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	guardName: varchar("guard_name", { length: 255 }).notNull(),
	color: varchar({ length: 255 }).default('#6c757d').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "roles_id"}),
	unique("roles_name_guard_name_unique").on(table.name, table.guardName),
]);

export const sessions = mysqlTable("sessions", {
	id: varchar({ length: 255 }).notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: text("user_agent"),
	payload: longtext().notNull(),
	lastActivity: int("last_activity").notNull(),
},
(table) => [
	index("sessions_user_id_index").on(table.userId),
	index("sessions_last_activity_index").on(table.lastActivity),
	primaryKey({ columns: [table.id], name: "sessions_id"}),
]);

export const settings = mysqlTable("settings", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	key: varchar({ length: 255 }).notNull(),
	value: text(),
	type: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "settings_id"}),
	unique("settings_key_unique").on(table.key),
]);

export const shifts = mysqlTable("shifts", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	tolerance: time().notNull(),
	isNightShift: tinyint("is_night_shift").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "shifts_id"}),
]);

export const stockInDefects = mysqlTable("stock_in_defects", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	qty: int(),
	stockinId: int("stockin_id"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "stock_in_defects_id"}),
]);

export const stockIns = mysqlTable("stock_ins", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	serialNumber: varchar("serial_number", { length: 191 }).notNull(),
	ticketNo: int("ticket_no", { unsigned: true }).notNull(),
	glNo: varchar("gl_no", { length: 191 }).notNull(),
	size: varchar({ length: 10 }).notNull(),
	userDispatchId: int("user_dispatch_id").notNull(),
	color: varchar({ length: 255 }).notNull(),
	pcs: int({ unsigned: true }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateStockOut: date("date_stock_out", { mode: 'string' }),
	corId: bigint("cor_id", { mode: "number", unsigned: true }).notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }),
	userDispatchName: varchar("user_dispatch_name", { length: 191 }),
	boxNumber: varchar("box_number", { length: 191 }),
	lineId: int("line_id"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	inputSource: varchar("input_source", { length: 255 }).notNull(),
	containerScanStatus: varchar("container_scan_status", { length: 255 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "stock_ins_id"}),
	unique("stock_ins_serial_number_unique").on(table.serialNumber),
]);

export const userShiftAssignments = mysqlTable("user_shift_assignments", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	shiftId: bigint("shift_id", { mode: "number", unsigned: true }).notNull().references(() => shifts.id, { onDelete: "cascade" } ),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDateStart: date("effective_date_start", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDateEnd: date("effective_date_end", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "user_shift_assignments_id"}),
]);

export const users = mysqlTable("users", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerifiedAt: timestamp("email_verified_at", { mode: 'string' }),
	password: varchar({ length: 255 }).notNull(),
	rememberToken: varchar("remember_token", { length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("users_email_unique").on(table.email),
]);

export const workflowDefinitions = mysqlTable("workflow_definitions", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	isActive: tinyint("is_active").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "workflow_definitions_id"}),
]);

export const workflowSteps = mysqlTable("workflow_steps", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	workflowDefinitionId: bigint("workflow_definition_id", { mode: "number", unsigned: true }).notNull().references(() => workflowDefinitions.id, { onDelete: "cascade" } ),
	name: varchar({ length: 255 }).notNull(),
	stepOrder: int("step_order", { unsigned: true }).notNull(),
	roleIdResponsible: bigint("role_id_responsible", { mode: "number", unsigned: true }).notNull().references(() => roles.id, { onDelete: "cascade" } ),
	isFinal: tinyint("is_final").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "workflow_steps_id"}),
]);
