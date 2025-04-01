const supabase = require('../DB/sqlConfig');

class ReportesSQL {
    static async crearReporte(planta_id, sistema, usuario_id, observaciones = '') {
        const { data, error } = await supabase
            .from('reportes')
            .insert([{ planta_id, sistema, usuario_id, observaciones }])
            .select('*');

        if (error) {
            console.error('Error al crear reporte:', error);
            return null;
        }

        return data[0];
    }

    static async agregarValoresAlReporte(valores) {
        const { data, error } = await supabase
            .from('valores_reporte')
            .insert(valores)
            .select('*');

        if (error) {
            console.error('Error al agregar valores al reporte:', error);
            return null;
        }

        return data;
    }

    static async obtenerReportePorId(id) {
        const { data, error } = await supabase
            .from('reportes')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            console.error('Error al obtener reporte:', error);
            return null;
        }

        return data;
    }

    static async obtenerReportesPorUsuario(usuario_id) {
        const { data, error } = await supabase
            .from('reportes')
            .select('*')
            .eq('usuario_id', usuario_id);

        if (error) {
            console.error('Error al obtener reportes del usuario:', error);
            return null;
        }

        return data;
    }
}

module.exports = ReportesSQL;
