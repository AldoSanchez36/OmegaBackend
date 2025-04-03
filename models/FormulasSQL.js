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

    static async crearFormulaConRelaciones(nombre, expresion, proceso_id, creador_id, variable_ids) {
        const formulaInsert = await supabase
            .from('formulas')
            .insert([{ nombre, expresion, proceso_id, creador_id }])
            .select('*');

        if (formulaInsert.error || !formulaInsert.data?.[0]) {
            console.error('Error al crear fórmula:', formulaInsert.error);
            return null;
        }

        const formula = formulaInsert.data[0];

        // Insertar variables relacionadas
        const relations = variable_ids.map(id => ({
            formula_id: formula.id,
            variable_id: id
        }));

        const relationInsert = await supabase
            .from('formulas_variables')
            .insert(relations);

        if (relationInsert.error) {
            console.error('Error al relacionar variables con fórmula:', relationInsert.error);
        }

        return formula;
    }

    static async obtenerFormulaConVariables(id) {
        const { data: formulas, error } = await supabase
            .from('formulas')
            .select(`
                *,
                formulas_variables (
                    variable_id,
                    variables (*)
                )
            `)
            .eq('id', id);

        if (error) {
            console.error('Error al obtener fórmula con variables:', error);
            return null;
        }

        return formulas[0];
    }
}

module.exports = FormulasSQL;
