export async function up(sequelize) {
  // language=PostgreSQL
  await sequelize.query(`
    create table "entries" (
        "id" serial unique primary key not null,
        "title" text not null,
        "content" text not null,
        "userId" integer not null
            constraint "entries_userId_fkey"
            references users
            on update cascade on delete cascade,
        "createdAt" timestamp not null,
        "updatedAt" timestamp not null,
        "deletedAt" timestamp
    );
  `);

  console.log('*Table entries created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`drop table entries`);
}
