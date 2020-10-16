export async function up(sequelize) {
  // language=PostgreSQL
  await sequelize.query(`
      alter table entries
          add column keywords text;
  `);

  console.log('*keywords column added to entries table*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  await sequelize.query(`
      alter table entries
          drop column keywords;
  `);
}
