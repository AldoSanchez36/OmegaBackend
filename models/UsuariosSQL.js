const supabase = require('../DB/sqlConfig');

class UsuariosSQL {
    // Crea un nuevo usuario con los campos necesarios para el sistema de CRM
    static async createUser(username, email, password, rol = 'user') {
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{
                username,
                email,
                password,
                rol,
                creado_en: new Date().toISOString() // timestamp de creación
            }])
            .select('*'); // Esto devuelve los datos insertados

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
            .single();

        if (error) {
            console.error('Error al obtener usuario:', error);
            return null;
        }
        return data;
    }

    // Actualiza un usuario existente, permitiendo cambios en puesto y rol
    static async updateUser(email, updates) {
        const { data, error } = await supabase
            .from('usuarios')
            .update(updates) // puede incluir { puesto: '...', rol: '...' }
            .eq('email', email);

        if (error) {
            console.error('Error al actualizar usuario:', error);
            return null;
        }

        return data;
    }

    static async deleteUser(email) {
        const { data, error } = await supabase
            .from('usuarios')
            .delete()
            .eq('email', email);

        if (error) {
            console.error('Error al eliminar usuario:', error);
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
}

module.exports = UsuariosSQL;
