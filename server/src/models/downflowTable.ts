import { Model, UUIDV4 } from 'sequelize';

interface DownflowTableAttributes {
  id: string;
  lastName: string;
  firstName: string;
  flatEarther: boolean;
  wallet: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class DownflowTable extends Model<DownflowTableAttributes> implements DownflowTableAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    lastName!: string;
    firstName!: string;
    flatEarther!: boolean;
    wallet!: number;
    static associate(models: any) {
      // define association here
    }
  }
  DownflowTable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flatEarther: {
        type: DataTypes.BOOLEAN,
      },
      wallet: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'DownflowTable',
    }
  );
  return DownflowTable;
};
