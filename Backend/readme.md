
---

### 🗂 Backend `README.md`

```markdown
# Scandiweb Backend
This is the backend for the Scandiweb E-commerce project. It is a custom PHP-based GraphQL server built without frameworks, using PSR standards and `webonyx/graphql-php`.

## ⚙️ Tech Stack

- PHP 8.1+
- MySQL
- GraphQL (`webonyx/graphql-php`)
- FastRoute
- Apache2

## 📁 Project Structure

Backend/
├── public/ # Publicly accessible files
│ └── index.php # Entry point
├── src/
│ ├── Model/ # Product, Attribute, Category, Order
│ ├── Controller/ # GraphQLController
│ └── Graphql/ # schema.graphql
├── config/ # Database connection
├── .htaccess # Apache rewrite rules


## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/backend.git
cd backend
```

### 2. Configure the environment

Update the config/database.php with your database credentials.

define('DB_HOST', 'localhost');
define('DB_NAME', 'scandi_test');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');

### 3. Run the server

Make sure Apache2 is configured to point to /Backend/public as DocumentRoot. Enable mod_rewrite.

Restart Apache:

sudo systemctl restart apache2

### 4. Database

Import the SQL dump to create tables and seed data.

mysql -u your_user -p scandi_test < database.sql

###  5. Test API

Use Postman or Apollo to test:

### POST http://your-server.example/graphql

🔒 CORS

Make sure CORS headers are set in public/index.php.

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

📄 License

MIT

---

Let me know your GitHub repo names if you want these tailored even more!