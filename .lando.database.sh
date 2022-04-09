touch .env.development.local;

if ! grep -q DB_NAME .env.development.local ; then echo "DB_NAME='voma'" >> .env.development.local; fi
if ! grep -q DB_USER .env.development.local ; then echo "DB_USER='postgres'" >> .env.development.local; fi 
if ! grep -q DB_PASSWORD .env.development.local ; then echo "DB_PASSWORD=" >> .env.development.local; fi
if ! grep -q DB_HOST .env.development.local ; then echo "DB_HOST='127.0.0.1'" >> .env.development.local; fi
if ! grep -q DB_PORT .env.development.local ; then echo "DB_PORT='6543'" >> .env.development.local; fi

if [ ! -f db/.env.development.local ] ; then cp .env.local db/.env.development.local; fi

npm run sync;
