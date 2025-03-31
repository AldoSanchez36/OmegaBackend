const supabase = require('../DB/sqlConfig');

class VariablesSQL {
    static async crearVariable(nombre, unidad, proceso_id) {
        const { data, error } = await supabase
            .from('variables')
            .insert([{ nombre, unidad, proceso_id }])
            .select('*');

        if (error) {
            console.error('Error al crear variable:', error);
            return null;
        }

        return data[0];
    }

    static async obtenerVariablesPorProceso(proceso_id) {
        const { data, error } = await supabase
            .from('variables')
            .select('*')
            .eq('proceso_id', proceso_id);

        if (error) {
            console.error('Error al obtener variables:', error);
            return null;
        }

        return data;
    }

    static async obtenerTodasVariables() {
        const { data, error } = await supabase
            .from('variables')
            .select('*');

        if (error) {
            console.error('Error al obtener todas las variables:', error);
            return null;
        }

        return data;
    }
}

module.exports = VariablesSQL;
