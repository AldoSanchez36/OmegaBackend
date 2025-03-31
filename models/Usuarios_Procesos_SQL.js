const supabase = require('../DB/sqlConfig');

class UsuariosProcesosSQL {
    static async asignarAcceso(usuario_id, proceso_id, puede_ver = true, puede_editar = false) {
        const { data, error } = await supabase
            .from('usuarios_procesos')
            .insert([{ usuario_id, proceso_id, puede_ver, puede_editar }])
            .select('*');

        if (error) {
            console.error('Error al asignar acceso a proceso:', error);
            return null;
        }

        return data[0];
    }

    static async obtenerProcesosDeUsuario(usuario_id) {
        const { data, error } = await supabase
            .from('usuarios_procesos')
            .select('proceso_id, puede_ver, puede_editar')
            .eq('usuario_id', usuario_id);

        if (error) {
            console.error('Error al obtener procesos del usuario:', error);
            return null;
        }

        return data;
    }

    static async revocarAcceso(usuario_id, proceso_id) {
        const { data, error } = await supabase
            .from('usuarios_procesos')
            .delete()
            .eq('usuario_id', usuario_id)
            .eq('proceso_id', proceso_id);

        if (error) {
            console.error('Error al revocar acceso a proceso:', error);
            return null;
        }

        return data;
    }
}

module.exports = UsuariosProcesosSQL;
