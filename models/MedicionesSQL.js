const supabase = require('../DB/sqlConfig');

class MedicionesSQL {
    static async crearMedicion({ fecha, valor, variable_id, proceso_id, sistema, comentarios }) {
        const { data, error } = await supabase
            .from('mediciones')
            .insert([{ fecha, valor, variable_id, proceso_id, sistema, comentarios }])
            .select('*');
        if (error) {
            console.error('Error al crear medición:', error);
            return null;
        }
        return data[0];
    }

    static async obtenerTodas() {
        const { data, error } = await supabase
            .from('mediciones')
            .select('*');
        if (error) {
            console.error('Error al obtener mediciones:', error);
            return null;
        }
        return data;
    }

    static async obtenerPorId(id) {
        const { data, error } = await supabase
            .from('mediciones')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error al obtener medición por id:', error);
            return null;
        }
        return data;
    }

    static async actualizarMedicion(id, campos) {
        const { data, error } = await supabase
            .from('mediciones')
            .update(campos)
            .eq('id', id)
            .select('*');
        if (error) {
            console.error('Error al actualizar medición:', error);
            return null;
        }
        return data[0];
    }

    static async eliminarMedicion(id) {
        const { error } = await supabase
            .from('mediciones')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error al eliminar medición:', error);
            return false;
        }
        return true;
    }

    static async obtenerPorVariableId(variable_id) {
        const { data, error } = await supabase
            .from('mediciones')
            .select('*')
            .eq('variable_id', variable_id);
        if (error) {
            console.error('Error al obtener mediciones por variable:', error);
            return null;
        }
        return data;
    }

    static async obtenerPorSistema(sistema) {
        const { data, error } = await supabase
            .from('mediciones')
            .select('*')
            .eq('sistema', sistema);
        if (error) {
            console.error('Error al obtener mediciones por sistema:', error);
            return null;
        }
        return data;
    }

    static async obtenerPorProcesoId(proceso_id) {
        const { data, error } = await supabase
            .from('mediciones')
            .select('*')
            .eq('proceso_id', proceso_id);
        if (error) {
            console.error('Error al obtener mediciones por proceso:', error);
            return null;
        }
        return data;
    }

    static async obtenerPorPlantaId(planta_id) {
        // Obtener todos los procesos de la planta
        const ProcesosSQL = require('./ProcesosSQL');
        const procesos = await ProcesosSQL.obtenerProcesosPorPlanta(planta_id);
        if (!procesos || procesos.length === 0) return [];
        const procesoIds = procesos.map(p => p.id);
        const { data, error } = await supabase
            .from('mediciones')
            .select('*')
            .in('proceso_id', procesoIds);
        if (error) {
            console.error('Error al obtener mediciones por planta:', error);
            return null;
        }
        return data;
    }
}

module.exports = MedicionesSQL;
