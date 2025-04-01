const supabase = require('../DB/sqlConfig');

class UsuariosSQL {
    // Crea un nuevo usuario con los campos necesarios para el sistema de CRM
    static async createUser(username, email, password, puesto = 'user') {
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ username, email, password, puesto }])
            .select('*');

        if (error) {
            console.error('Error al crear usuario:', error);
            return null;
        }

        return data;
    }

    static async getUserByEmail(email) {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (error) {
            console.error('Error al obtener usuario:', error);
            return null;
        }
        return data;
    }

    // Obtiene un usuario por su ID
    static async getUserById(id) {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            console.error('Error al obtener usuario por ID:', error);
            return null;
        }

        return data;
    }

    static async getAllUsers() {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*');

        if (error) {
            console.error('Error al obtener usuarios:', error);
            return null;
        }
        return data;
    }

    // Actualiza un usuario existente, permitiendo cambios en puesto y puesto
    static async updateUserById(id, updates) {
        const { data, error } = await supabase
            .from('usuarios')
            .update(updates)
            .eq('id', id)
            .select('*');

        if (error) {
            console.error('Error al actualizar usuario:', error);
            return null;
        }

        return data;
    }

    static async deleteUserById(id) {
        const { data, error } = await supabase
            .from('usuarios')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error al eliminar usuario:', error);
            return null;
        }
        return data;
    }

    
}

module.exports = UsuariosSQL;
