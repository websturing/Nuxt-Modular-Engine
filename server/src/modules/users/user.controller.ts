import { defineEventHandler } from 'h3';
import { getAllUsersService } from './user.service';

export const indexUserController = defineEventHandler(async (event) => {
    try {
        // Panggil Service
        const data = await getAllUsersService();

        // Return Standard JSON Response
        return {
            success: true,
            message: 'List users fetched successfully',
            count: data.length,
            data: data
        };

    } catch (error: any) {
        // Error Handling
        throw {
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: error.message
        };
    }
});