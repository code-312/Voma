touch .env.development.local;

if ! grep -q DB_NAME .env.development.local ; then echo "DB_NAME='voma'" >> .env.development.local; fi
if ! grep -q DB_USER .env.development.local ; then echo "DB_USER='postgres'" >> .env.development.local; fi 
if ! grep -q DB_PASSWORD .env.development.local ; then echo "DB_PASSWORD=" >> .env.development.local; fi
if ! grep -q DB_HOST .env.development.local ; then echo "DB_HOST='127.0.0.1'" >> .env.development.local; fi
if ! grep -q DB_PORT .env.development.local ; then echo "DB_PORT='6543'" >> .env.development.local; fi

if [ ! -f db/.env.development.local ] ; then cp .env.local db/.env.development.local; fi

#cd db && ../node_modules/sequelize-cli/lib/sequelize db:migrate

npm run sync;
echo "insert into admins (name, email, password, created_at, updated_at) values ('Voma Testing', 'voma.code.for.chicago@gmail.com', '\$2b\$10\$86Ihm1X.d3p6Cz6HncWpM./MrqGIB8yXj0RHj4GQPwhZiTqunVhSi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);" > add_admin.psql;
lando ssh -s postgresService -c "psql -U postgres -d voma -f ./add_admin.psql";
rm add_admin.psql;

