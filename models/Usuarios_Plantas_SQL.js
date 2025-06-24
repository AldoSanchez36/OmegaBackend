const supabase = require('../DB/sqlConfig');

class UsuariosPlantasSQL {
    static async asignarAcceso(usuario_id, planta_id, puede_ver = true, puede_editar = false) {
        const { data, error } = await supabase
            .from('usuarios_plantas')
            .insert([{ usuario_id, planta_id, puede_ver, puede_editar }])
            .select('*');

        if (error) {
            console.error('Error al asignar acceso a planta:', error);
            return null;
        }

        return data[0];
    }

    static async obtenerPlantasDeUsuario(usuario_id) {
        const { data, error } = await supabase
            .from('usuarios_plantas')
            .select('planta_id, puede_ver, puede_editar')
            .eq('usuario_id', usuario_id);

        if (error) {
            console.error('Error al obtener plantas del usuario:', error);
            return null;
        }

        return data;
    }

    static async revocarAcceso(usuario_id, planta_id) {
        const { data, error } = await supabase
            .from('usuarios_plantas')
            .delete()
            .eq('usuario_id', usuario_id)
            .eq('planta_id', planta_id);

        if (error) {
            console.error('Error al revocar acceso a planta:', error);
            return null;
        }

        return data;
    }

    static async updateAcceso(usuario_id, planta_id, puede_ver, puede_editar) {
        const { data, error } = await supabase
            .from('usuarios_plantas')
            .update({ puede_ver, puede_editar })
            .eq('usuario_id', usuario_id)
            .eq('planta_id', planta_id)
            .select('*');

        if (error) {
            console.error('Error al actualizar acceso a planta:', error);
            return null;
        }

        return data[0];
    }
}

module.exports = UsuariosPlantasSQL;
