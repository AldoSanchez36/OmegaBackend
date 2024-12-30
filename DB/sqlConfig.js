import { Sequelize } from "sequelize";
import db from '../DBSQL/database.js';

const { DataTypes } = Sequelize;

const ProductSQL = db.define('products',{
    title:{
        type: DataTypes.DOUBLE
    },
    price:{
        type: DataTypes.DOUBLE
    }

},{
    freezeTableName: true
});

export default ProductSQL;

// mfg_num:{
//     type: DataTypes.STRING
// }
// prod_line:{
//     type: DataTypes.STRING
// }
// model:{
//     type: DataTypes.DOUBLE
// }
// area:{
//     type: DataTypes.STRING
// }
// country:{
//     type: DataTypes.STRING
// }
// customer:{
//     type: DataTypes.STRING
// }
// rev:{
//     type: DataTypes.STRING
// }
// shpdate:{
//     type: DataTypes.STRING
// }
// status:{
//     type: DataTypes.STRING
// }