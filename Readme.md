# Installation instructions

### Project requirements 
- [IDE (ex VS code)](https://code.visualstudio.com/)
- [XAMPP](https://www.apachefriends.org/fr/download.html)
- [Symfony CLI](https://symfony.com/download)
- [Composer](https://getcomposer.org/download/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [MongoDB et MongoDB Compass](https://www.mongodb.com/try/download/community)
- [Extension MongoDB](https://pecl.php.net/package/mongodb)
- [Extension PHP Server]

Place the MongoDB extension mentioned above into PHP's `ext` folder, then add the following line to `php.ini` : 
Extension=php_mongodb.dll

```bash
$ symfony check:requirements # Check minimal requirements for the project
```

### Installation

1 . **Register a GPG/SSH Key into your Github account** to push verified commits

2 . Clone the repository (SSH):
```bash
$ git clone git@github.com:Leila-33/EcoRideBack.git
$ cd EcoRideBack
```

3 . Create a `.env.local` file
```bash
$ cp .env .env.local
```

4 . Create a user account in phpMyAdmin and set your DATABASE_URL, MONGODB_URL and MONGODB_DB in your `.env.local` file, for example :
 DATABASE_URL="mysql://root:password@127.0.0.1:3306/EcoRide1?serverVersion=10.4.32-MariaDB&charset=utf8mb4"
 MONGODB_URL=mongodb://localhost:27017
 MONGODB_DB=villes


5 . Run these commands :
```bash
$ composer install # Install all PHP packages
$ php bin/console d:d:c # Create your DATABASE according to your .env.local configuration
$ php bin/console d:m:m # Run migrations to setup your DATABASE according to your entities
```

6 . MongoDB Setup
Start MongoDB Compass, connect and Click "Create Database":
Database Name : ex, villes
Collection : ex, villes 
Go to the collection and click "Add Data">"Import JSON or CSV file". Choose villes.json located in the public folder of the Symfony project and click "Import".

In the Indexes tab of the collection, click Create index, enter location as the field, select type 2sphere, and confirm with Create. Your database is now ready for geospatial queries.

## Usage
```bash
$ symfony server:start # Start a local server.
```


Click the PHP server icon at the top right next of an HTML file and replace the URL by the route name.