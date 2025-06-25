const supabase = require('../DB/sqlConfig');

class PlantasSQL {
    static async crearPlanta(nombre, creado_por) {
        const { data, error } = await supabase
            .from('plantas')
            .insert([{ nombre, creado_por }])
            .select('*');

        if (error) {
            console.error('Error al crear planta:', error);
            return null;
        }

        return data[0];
    }

    static async obtenerPlantasPorUsuario(usuario_id) {
        const { data, error } = await supabase
            .from('plantas')
            .select('*')
            .eq('creado_por', usuario_id);

        if (error) {
            console.error('Error al obtener plantas por usuario:', error);
            return null;
        }

        return data;
    }

    static async obtenerPlantasPorAcceso(usuario_id) {
        const { data, error } = await supabase
            .from('usuarios_plantas')
            .select('planta_id')
            .eq('usuario_id', usuario_id);

        if (error) {
            console.error('Error al obtener accesos de plantas:', error);
            return null;
        }

        const plantaIds = data.map(row => row.planta_id);

        if (plantaIds.length === 0) return [];

        const { data: plantas, error: errorPlantas } = await supabase
            .from('plantas')
            .select('*')
            .in('id', plantaIds);

        if (errorPlantas) {
            console.error('Error al obtener plantas por acceso:', errorPlantas);
            return null;
        }

        return plantas;
    }

    static async getAll() {
        const { data, error } = await supabase
            .from('plantas')
            .select('nombre');
        if (error) {
            console.error('Error al obtener todas las plantas:', error);
            return null;
        }
        return data;
    }

    static async obtenerPorNombre(nombre) {
        const { data, error } = await supabase
            .from('plantas')
            .select('*')
            .eq('nombre', nombre)
            .single();
        if (error) {
            console.error('Error al obtener planta por nombre:', error);
            return null;
        }
        return data;
    }
}

module.exports = PlantasSQL;
