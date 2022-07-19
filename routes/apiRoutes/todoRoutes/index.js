const router = require('express').Router();
const connection = require('./../../../db/connection');

const isEven = function (number) {
    return new PromiseRejectionEvent((resolve, reject) => {
        if (number % 2 === 0) {
            resolve('isEven');
        } else {
            reject('isOdd');
        }
    });
};

// /api/todos
// async await will make asynchronous code behave synchronously
router.get('/', async (req, res) => {
    //Run as much code as we can inside of the try block
    // if any of it throws an error, immediately fo into the catch block
    //wit the specific error that happened and exit out of the try block
    try {
        //can ONLY use await inside a function
        //that function the await is inside of has to have async declared before it
        // const result = await isEven(4);
        // res.json(result);
        const getAllTodos = 'SELECT * FROM todos;';
        const [todos] = await connection.query(getAllTodos);
        /* results should be an array [[rows], [dataWeDontCareAbout]] */
        // console.log(dbResponse);
        // res.json(dbResponse);
        res.json(todos);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.post('/', async (req, res) => {
    const { todo } = req.body;

    if (todo.trim().length === 0) {
        return res.status(400).json({ error: 'Todo must be valid' });
    }

    const insertTodoQuery = 'INSERT INTO todos (todo) VALUES(?);';
    // const getTodoById = 'SELECT * FROM todos WHERE id = ? LIMIT 1;'; //limit result to 1 row
    const getTodoById = 'SELECT * FROM todos WHERE id = ?;';

    try {
        const [queryResult] = await connection.query(insertTodoQuery, [todo]); // 1 ? is one array thing

        /* [{ howManyRowWereInserted, insertId, }, null] */
        const [todos] = await connection.query(getTodoById, [queryResult.insertById]);

        res.json(todos[0]);

    } catch (error) {
        //when database fails, its 100% our fault
        res.status(500).json(error);
    }

});

router.delete('/:todoId', async (req, res) => {
    const { todoId } = req.params;

    const getTodoById = 'SELECT * FROM todos WHERE id = ?;';
    const deleteTodoById = 'DELETE FROM todos WHERE id = ?;';

    try {
        const [todos] = await connection.query(getTodoById, todoId);

        if (todos.length === 0) {
            return res.status(404).json({ error: 'Todo not found with that id' });
        }

        //dont need to put in variable bc we dont care about the result
        // if we care about the result, then put in variable
        await connection.query(deleteTodoById, todoId);

        res.json(todos[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.patch('/:todoId', async (req, res) => {
    //pull out the data we wanna use
    const { todo } = req.body;
    const { todoId } = req.params;

    if (todo.trim().length === 0) {
        return res.status(400).json({ error: 'Todo must be provided' });
    }

    const getTodoById = 'SELECT * FROM todos WHERE id = ?;';
    const updateTodoById = 'UPDATE todos SET todo = ? WHERE id = ?;';

    try {
        await connection.query(updateTodoById, [todo, todoId]);
        const [todos] = await connection.query(getTodoById, todoId);
        res.json(todo[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
