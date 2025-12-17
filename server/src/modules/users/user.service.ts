import { getAllUsersRepository } from './user.repository';

export const getAllUsersService = async () => {
    const usersData = await getAllUsersRepository();

    // Logic: Hapus password dari object user sebelum dikirim ke depan
    // Ini contoh kenapa Service Layer itu penting (Data Transformation)
    const safeUsers = usersData.map(user => {
        const { password, ...rest } = user; // Destructuring buat buang password
        return rest;
    });

    return safeUsers;
};