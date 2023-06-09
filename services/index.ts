import db from '../utils/db';

export async function getServerSideProps() {
    try {
        const query = 'SELECT * FROM resume_builder';

        const results = await new Promise((resolve, reject) => {
            db.query(query, (error: any, results: any) => {
                if (error) {
                    console.error('Error querying MySQL:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        return {
            props: {
                data: results,
            },
        };
    } catch (error) {
        console.error('Error querying MySQL:', error);
        return {
            props: {
                data: [],
            },
        };
    }
}

export async function createEmployee(username: string, information: any) {
    // const query = 'INSERT INTO resume_builder (username, information) VALUES (?, ?)';
    // const values = [username, information];
    // return new Promise((resolve, reject) => {
    //     db.query(query, values, (error: any, result: any) => {
    //         if (error) {
    //             console.error('Error creating employee:', error);
    //             reject(error);
    //         } else {
    //             console.log('Employee created successfully');
    //             resolve(result);
    //         }
    //     });
    // });
}
