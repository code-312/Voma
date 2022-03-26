touch .env.local;
if ! grep -q DB_NAME .env.local ; then echo "DB_NAME='voma'" >> .env.local; fi
if ! grep -q DB_USER .env.local ; then echo "DB_USER='postgres'" >> .env.local; fi 
if ! grep -q DB_PASSWORD .env.local ; then echo "DB_PASSWORD=" >> .env.local; fi
if ! grep -q DB_HOST .env.local ; then echo "DB_HOST='127.0.0.1'" >> .env.local; fi
if ! grep -q DB_PORT .env.local ; then echo "DB_PORT='6543'" >> .env.local; fi
npm run sync;