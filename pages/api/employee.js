const mysql = require('mysql2');
import dotenv from 'dotenv';
dotenv.config();
export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { id } = req.query;

            connection.query('USE resume_builder', function (err, results) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error selecting database');
                }

                connection.execute(`SELECT * FROM employee WHERE id = ?`, [id || 0], function (err, results, fields) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error executing query');
                    }
                    // console.log(JSON.parse(results[0].userData));
                    return results.length === 0 ? res.json({}) : res.json(JSON.parse(results[0].userData));
                });
            });
        }

        if (req.method === 'POST') {
            const { name, userData } = req.body;
            if (!name) {
                return res.status(500).send('Error');
            }

            connection.query('USE resume_builder', function (err, results) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error selecting database');
                }

                connection.execute(
                    'INSERT INTO employee (name, userData) VALUES (?, ?) ' + 'ON DUPLICATE KEY UPDATE userData = ?',
                    [name, JSON.stringify(userData), JSON.stringify(userData)],
                    function (err, results, fields) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Error executing query');
                        }

                        return res.json({ success: true, results });
                    }
                );
            });
        }
    } catch (error) {
        return res.status(400).send('Error');
    }
}
