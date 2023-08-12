npm install;
mongod --version;
if [ $? -ne 0 ]; then
    echo "Installing mongodb"
    wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -;
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list;
    sudo apt-get update;
    sudo apt-get install -y mongodb-org;
    sudo systemctl enable mongod;
    sudo mongod --fork -f /etc/mongod.conf;

fi

echo "completed"
