const supabase = require('../DB/sqlConfig');

class FormulasSQL {
    static async crearFormula(nombre, expresion, proceso_id, creador_id, variables_usadas) {
        const { data, error } = await supabase
            .from('formulas')
            .insert([{
                nombre,
                expresion,
                proceso_id,
                creador_id,
                variables_usadas
            }])
            .select('*');

        if (error) {
            console.error('Error al crear fórmula:', error);
            return null;
        }

        return data[0];
    }

    static async obtenerFormulasPorProceso(proceso_id) {
        const { data, error } = await supabase
            .from('formulas')
            .select('*')
            .eq('proceso_id', proceso_id);

        if (error) {
            console.error('Error al obtener fórmulas por proceso:', error);
            return null;
        }

        return data;
    }

    static async obtenerTodasFormulas() {
        const { data, error } = await supabase
            .from('formulas')
            .select('*');

        if (error) {
            console.error('Error al obtener todas las fórmulas:', error);
            return null;
        }

        return data;
    }
}

module.exports = FormulasSQL;
