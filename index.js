const express = require('express');
const morgan  = require('morgan');

const app = express()

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

let testUsers = [
    { id: 123, name: 'kimchi1' },
    { id: 456, name: 'kimchi2' },
    { id: 789, name: 'kimchi3' },
]

app.get('/users', (req, res) => {
    const { limit } = req.query;
    const numLimit = parseInt(limit);
    if (limit && isNaN(numLimit)) {
        return res.status(400).end()
    }
    
    res.json(testUsers.slice(0, numLimit));
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const numId = parseInt(id);
    if (isNaN(numId)) {
        return res.status(400).end();
    }

    const userIndex = testUsers.findIndex((user) => user.id === numId);
    if (userIndex < 0) {
        return res.status(404).end();
    }

    res.json(testUsers[userIndex]);
});

app.delete('/user/:id/delete', (req, res) => {
    const { id } = req.params;
    const numId = parseInt(id);
    if (isNaN(numId)) {
        return res.status(400).end();
    }

    testUsers = testUsers.filter((user) => user.id !== id);
    res.status(204).end();
})

process.env.NODE_ENV !== 'test' && app.listen(3000, () => {
    console.log('temporary server is running on port 3000');
})

module.exports = {
    app
}