touch .env.development.local;

if ! grep -q DB_NAME .env.development.local ; then echo "DB_NAME=voma" >> .env.development.local; fi
if ! grep -q DB_USER .env.development.local ; then echo "DB_USER=postgres" >> .env.development.local; fi 
if ! grep -q DB_PASSWORD .env.development.local ; then echo "DB_PASSWORD=" >> .env.development.local; fi
if ! grep -q DB_HOST .env.development.local ; then echo "DB_HOST=127.0.0.1" >> .env.development.local; fi
if ! grep -q DB_PORT .env.development.local ; then echo "DB_PORT=6543" >> .env.development.local; fi
if ! grep -q SESSION_SECRET .env.development.local ; then echo "SESSION_SECRET=Voma_Local_Test_Session" >> .env.development.local; fi

if [ ! -f db/.env.development.local ] ; then cp .env.development.local db/.env.development.local; fi

#cd db && ../node_modules/sequelize-cli/lib/sequelize db:migrate

npm run sync;

echo "Adding seed data to the database, one moment..."

# Seed dummy database data.
projects=("Between Friends" "Chicago Council on Science and Technology" "Cannabis Equity Coalition" "CFC Website")
volunteers=("S M Zawad Bin Zaki Sadaf" "Willow Woodward" "Bodie Lopez" "Amos Aquirre" "Idris Bradford" "Murphy Parrish" "Liv Shannon" "Jett Dunn")
unassigned_volunteers=("Gloria Lugo" "Rivka Terry" "Hope Burke" "Bjorn Madden" "Alvin Solis" "Wes Spears" "Grayson Ibarra")
skills=("Content Strategy" "Data Analytics" "Front-End or Back-End Development" "Project Management" "Product Management" "UX/UI Design/Research / Visual Design")

# Add a test Administrator.
echo "insert into admins (name, email, password, \"createdAt\", \"updatedAt\") values ('Voma Testing', 'voma.code.for.chicago@gmail.com', '\$2b\$10\$86Ihm1X.d3p6Cz6HncWpM./MrqGIB8yXj0RHj4GQPwhZiTqunVhSi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);" > seed.psql;

# Add test Projects.
for i in "${projects[@]}" ; do echo "insert into projects (name, description, \"createdAt\", \"updatedAt\") values ('$i', '$i', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);" >> seed.psql; done

# Add test Skills 
for i in "${skills[@]}" ; do echo "insert into skills (name, description, \"createdAt\", \"updatedAt\") values ('$i', '$i', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);" >> seed.psql; done

# Add test Volunteers assigned to random projects.
for i in "${volunteers[@]}" ; do echo "insert into volunteers (name, email, \"slackUserId\", pronouns, \"projectId\", \"createdAt\", \"updatedAt\") values ('$i', 'fake.volunteer.$(((RANDOM%99999)+1))@test.null', 'U03AU1WDP5Z', 'lorum/ipsum', '$(((RANDOM%4)+1))', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);" >> seed.psql; done

# Add test Volunteers assigned to no projects.
for i in "${unassigned_volunteers[@]}" ; do echo "insert into volunteers (name, email, \"slackUserId\", pronouns, \"createdAt\", \"updatedAt\") values ('$i', 'fake.volunteer.$(((RANDOM%99999)+1))@test.null', 'U03AU1WDP5Z', 'lorum/ipsum', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);" >> seed.psql; done

# Add test Volunteer Skills.
for ((n=1; n<=15; n++)) ; do echo "insert into \"VolunteerSkills\" (\"volunteerId\", \"skillId\", \"createdAt\", \"updatedAt\") values ('$n', '$(((RANDOM%6)+1))', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);" >> seed.psql; done

lando ssh -s postgresService -c "psql -U postgres -d voma -f ./seed.psql";
rm seed.psql;

echo "Complete!"
