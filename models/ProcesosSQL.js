const supabase = require('../DB/sqlConfig');

class ProcesosSQL {
    static async crearProceso(nombre, planta_id, descripcion = null) {
        const { data, error } = await supabase
            .from('procesos')
            .insert([{ nombre, planta_id, descripcion }])
            .select('*');

        if (error) {
            console.error('Error al crear proceso:', error);
            return null;
        }

        return data[0];
    }

    static async obtenerProcesosPorPlanta(planta_id) {
        const { data, error } = await supabase
            .from('procesos')
            .select('*')
            .eq('planta_id', planta_id);

        if (error) {
            console.error('Error al obtener procesos por planta:', error);
            return null;
        }

        return data;
    }

    static async obtenerTodosProcesos() {
        const { data, error } = await supabase
            .from('procesos')
            .select('*');

        if (error) {
            console.error('Error al obtener todos los procesos:', error);
            return null;
        }

        return data;
    }

    static async obtenerPorNombre(nombre) {
        const { data, error } = await supabase
            .from('procesos')
            .select('*')
            .eq('nombre', nombre)
            .single();
        if (error) {
            console.error('Error al obtener proceso por nombre:', error);
            return null;
        }
        return data;
    }
}

module.exports = ProcesosSQL;
