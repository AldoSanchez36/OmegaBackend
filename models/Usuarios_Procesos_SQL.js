const supabase = require('../DB/sqlConfig');

class UsuariosProcesosSQL {
    static async asignarAcceso(usuario_id, proceso_id, puede_ver = true, puede_editar = false) {
        // Obtener planta_id del proceso
        const { data: procesoData, error: procesoError } = await supabase
            .from('procesos')
            .select('planta_id')
            .eq('id', proceso_id)
            .single();
    
        if (procesoError || !procesoData) {
            console.error('❌ Error al obtener planta del proceso:', procesoError);
            return null;
        }
    
        const planta_id = procesoData.planta_id;
    
        // Verificar si el usuario tiene acceso a la planta
        const { data: accesoPlanta, error: plantaError } = await supabase
            .from('usuarios_plantas')
            .select('*')
            .eq('usuario_id', usuario_id)
            .eq('planta_id', planta_id)
            .single();
    
        if (plantaError || !accesoPlanta) {
            console.warn(`🚫 El usuario ${usuario_id} no tiene acceso a la planta ${planta_id}`);
            return null;
        }
    
        // Asignar acceso al proceso
        const { data, error } = await supabase
            .from('usuarios_procesos')
            .insert([{ usuario_id, proceso_id, puede_ver, puede_editar }])
            .select('*');
    
        if (error) {
            console.error('❌ Error al asignar proceso:', error);
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

    static async updateAcceso(usuario_id, proceso_id, puede_ver, puede_editar) {
        // Obtener planta del proceso
        const { data: procesoData, error: procesoError } = await supabase
            .from('procesos')
            .select('planta_id')
            .eq('id', proceso_id)
            .single();
    
        if (procesoError || !procesoData) {
            console.error('❌ Error al obtener planta del proceso:', procesoError);
            return null;
        }
    
        const planta_id = procesoData.planta_id;
    
        // Verificar si el usuario tiene acceso a la planta
        const { data: accesoPlanta, error: plantaError } = await supabase
            .from('usuarios_plantas')
            .select('*')
            .eq('usuario_id', usuario_id)
            .eq('planta_id', planta_id)
            .single();
    
        if (plantaError || !accesoPlanta) {
            console.warn(`🚫 El usuario ${usuario_id} no tiene acceso a la planta ${planta_id}`);
            return null;
        }
    
        // Actualizar permisos de acceso
        const { data, error } = await supabase
            .from('usuarios_procesos')
            .update({ puede_ver, puede_editar })
            .eq('usuario_id', usuario_id)
            .eq('proceso_id', proceso_id)
            .select('*');
    
        if (error) {
            console.error('❌ Error al actualizar acceso a proceso:', error);
            return null;
        }
    
        return data[0];
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
