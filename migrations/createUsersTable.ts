export async function up(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
  create table "users"
(
    "id"        serial unique primary key not null,
    "firstName" varchar(30)               not null,
    "lastName"  varchar(30)               not null,
    "email"     varchar(100) unique       not null,
    "password"  text                      not null,
    "birthday"  timestamp,
    "createdAt" timestamp                 not null,
    "updatedAt" timestamp                 not null,
    "deletedAt" timestamp                 not null
);
  `);

  console.log('*Table users created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
  drop table users
  `);
}
