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
}

module.exports = PlantasSQL;
