export async function up(sequelize) {
  // language=PostgreSQL
  await sequelize.query(`
      create table "keywords"
      (
          "id"        serial unique primary key not null,
          "keyword"   varchar(30) unique        not null,
          "createdAt" timestamp                 not null,
          "updatedAt" timestamp                 not null,
          "deletedAt" timestamp
      );
      create table "keywords_entries"
      (
          "keywordId" integer   not null
              constraint "keywords_entries_keywordId_fkey"
                  references keywords
                  on update cascade on delete cascade,
          "entryId"   integer   not null
              constraint "keywords_entries_entryId_fkey"
                  references entries
                  on update cascade on delete cascade,
          "createdAt" timestamp not null,
          unique ("keywordId", "entryId")
      );
  `);

  console.log('*Table keywords created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  await sequelize.query(`drop table keywords_entries`);
  await sequelize.query(`drop table keywords`);
}
