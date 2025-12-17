import { relations } from "drizzle-orm/relations";
import { gls, assignmentLines, lines, users, attendances, attendanceLogs, cuttingGlColors, cuttingGlColorSizes, cuttingGlSummaries, employees, layingPlannings, leaderLineAssignments, devices, lineDevices, permissions, modelHasPermissions, roles, modelHasRoles, modules, modulePermissions, replacementHistories, replacementRequest, workflowSteps, workflowDefinitions, replacementRequestNote, roleHasPermissions, shifts, userShiftAssignments } from "./schema";

export const assignmentLinesRelations = relations(assignmentLines, ({one, many}) => ({
	gl: one(gls, {
		fields: [assignmentLines.glId],
		references: [gls.id]
	}),
	line: one(lines, {
		fields: [assignmentLines.lineId],
		references: [lines.id]
	}),
	user: one(users, {
		fields: [assignmentLines.userId],
		references: [users.id]
	}),
	layingPlannings: many(layingPlannings),
}));

export const glsRelations = relations(gls, ({many}) => ({
	assignmentLines: many(assignmentLines),
}));

export const linesRelations = relations(lines, ({many}) => ({
	assignmentLines: many(assignmentLines),
	leaderLineAssignments: many(leaderLineAssignments),
	lineDevices: many(lineDevices),
}));

export const usersRelations = relations(users, ({many}) => ({
	assignmentLines: many(assignmentLines),
	attendances: many(attendances),
	employees: many(employees),
	leaderLineAssignments: many(leaderLineAssignments),
	replacementHistories: many(replacementHistories),
	replacementRequests: many(replacementRequest),
	replacementRequestNotes: many(replacementRequestNote),
	userShiftAssignments: many(userShiftAssignments),
}));

export const attendanceLogsRelations = relations(attendanceLogs, ({one}) => ({
	attendance: one(attendances, {
		fields: [attendanceLogs.attendanceId],
		references: [attendances.id]
	}),
}));

export const attendancesRelations = relations(attendances, ({one, many}) => ({
	attendanceLogs: many(attendanceLogs),
	user: one(users, {
		fields: [attendances.userId],
		references: [users.id]
	}),
}));

export const cuttingGlColorSizesRelations = relations(cuttingGlColorSizes, ({one}) => ({
	cuttingGlColor: one(cuttingGlColors, {
		fields: [cuttingGlColorSizes.cuttingGlColorId],
		references: [cuttingGlColors.id]
	}),
}));

export const cuttingGlColorsRelations = relations(cuttingGlColors, ({one, many}) => ({
	cuttingGlColorSizes: many(cuttingGlColorSizes),
	cuttingGlSummary: one(cuttingGlSummaries, {
		fields: [cuttingGlColors.cuttingGlSummaryId],
		references: [cuttingGlSummaries.id]
	}),
}));

export const cuttingGlSummariesRelations = relations(cuttingGlSummaries, ({many}) => ({
	cuttingGlColors: many(cuttingGlColors),
}));

export const employeesRelations = relations(employees, ({one}) => ({
	user: one(users, {
		fields: [employees.userId],
		references: [users.id]
	}),
}));

export const layingPlanningsRelations = relations(layingPlannings, ({one}) => ({
	assignmentLine: one(assignmentLines, {
		fields: [layingPlannings.assignmentLineId],
		references: [assignmentLines.id]
	}),
}));

export const leaderLineAssignmentsRelations = relations(leaderLineAssignments, ({one}) => ({
	line: one(lines, {
		fields: [leaderLineAssignments.lineId],
		references: [lines.id]
	}),
	user: one(users, {
		fields: [leaderLineAssignments.userId],
		references: [users.id]
	}),
}));

export const lineDevicesRelations = relations(lineDevices, ({one}) => ({
	device: one(devices, {
		fields: [lineDevices.deviceId],
		references: [devices.id]
	}),
	line: one(lines, {
		fields: [lineDevices.lineId],
		references: [lines.id]
	}),
}));

export const devicesRelations = relations(devices, ({many}) => ({
	lineDevices: many(lineDevices),
}));

export const modelHasPermissionsRelations = relations(modelHasPermissions, ({one}) => ({
	permission: one(permissions, {
		fields: [modelHasPermissions.permissionId],
		references: [permissions.id]
	}),
}));

export const permissionsRelations = relations(permissions, ({many}) => ({
	modelHasPermissions: many(modelHasPermissions),
	roleHasPermissions: many(roleHasPermissions),
}));

export const modelHasRolesRelations = relations(modelHasRoles, ({one}) => ({
	role: one(roles, {
		fields: [modelHasRoles.roleId],
		references: [roles.id]
	}),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	modelHasRoles: many(modelHasRoles),
	roleHasPermissions: many(roleHasPermissions),
	workflowSteps: many(workflowSteps),
}));

export const modulePermissionsRelations = relations(modulePermissions, ({one}) => ({
	module: one(modules, {
		fields: [modulePermissions.moduleId],
		references: [modules.id]
	}),
}));

export const modulesRelations = relations(modules, ({one, many}) => ({
	modulePermissions: many(modulePermissions),
	module: one(modules, {
		fields: [modules.parentId],
		references: [modules.id],
		relationName: "modules_parentId_modules_id"
	}),
	modules: many(modules, {
		relationName: "modules_parentId_modules_id"
	}),
}));

export const replacementHistoriesRelations = relations(replacementHistories, ({one}) => ({
	user: one(users, {
		fields: [replacementHistories.actionBy],
		references: [users.id]
	}),
	replacementRequest: one(replacementRequest, {
		fields: [replacementHistories.replacementRequestId],
		references: [replacementRequest.id]
	}),
	workflowStep: one(workflowSteps, {
		fields: [replacementHistories.workflowStepId],
		references: [workflowSteps.id]
	}),
}));

export const replacementRequestRelations = relations(replacementRequest, ({one, many}) => ({
	replacementHistories: many(replacementHistories),
	user: one(users, {
		fields: [replacementRequest.createdBy],
		references: [users.id]
	}),
	workflowStep: one(workflowSteps, {
		fields: [replacementRequest.currentStepId],
		references: [workflowSteps.id]
	}),
	workflowDefinition: one(workflowDefinitions, {
		fields: [replacementRequest.workflowDefinitionId],
		references: [workflowDefinitions.id]
	}),
	replacementRequestNotes: many(replacementRequestNote),
}));

export const workflowStepsRelations = relations(workflowSteps, ({one, many}) => ({
	replacementHistories: many(replacementHistories),
	replacementRequests: many(replacementRequest),
	role: one(roles, {
		fields: [workflowSteps.roleIdResponsible],
		references: [roles.id]
	}),
	workflowDefinition: one(workflowDefinitions, {
		fields: [workflowSteps.workflowDefinitionId],
		references: [workflowDefinitions.id]
	}),
}));

export const workflowDefinitionsRelations = relations(workflowDefinitions, ({many}) => ({
	replacementRequests: many(replacementRequest),
	workflowSteps: many(workflowSteps),
}));

export const replacementRequestNoteRelations = relations(replacementRequestNote, ({one}) => ({
	user: one(users, {
		fields: [replacementRequestNote.createdBy],
		references: [users.id]
	}),
	replacementRequest: one(replacementRequest, {
		fields: [replacementRequestNote.replacementRequestId],
		references: [replacementRequest.id]
	}),
}));

export const roleHasPermissionsRelations = relations(roleHasPermissions, ({one}) => ({
	permission: one(permissions, {
		fields: [roleHasPermissions.permissionId],
		references: [permissions.id]
	}),
	role: one(roles, {
		fields: [roleHasPermissions.roleId],
		references: [roles.id]
	}),
}));

export const userShiftAssignmentsRelations = relations(userShiftAssignments, ({one}) => ({
	shift: one(shifts, {
		fields: [userShiftAssignments.shiftId],
		references: [shifts.id]
	}),
	user: one(users, {
		fields: [userShiftAssignments.userId],
		references: [users.id]
	}),
}));

export const shiftsRelations = relations(shifts, ({many}) => ({
	userShiftAssignments: many(userShiftAssignments),
}));