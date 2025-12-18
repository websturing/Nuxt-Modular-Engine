import { defineEventHandler } from 'h3';
import { getStructuredMenuForUserService } from './menu.service';

export const getMyMenuController = defineEventHandler(async (event) => {
    const user = event.context.user;

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }



    const menu = await getStructuredMenuForUserService(user.id);

    return menu;
});