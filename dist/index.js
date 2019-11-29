"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const Schema_1 = require("./GraphQL/Schema");
const Queris_1 = require("./GraphQL/Queris");
const ConfigSql_1 = require("./ConfigSql");
const express = require('express');
const app = express();
var graphqlHTTP = require('express-graphql');
var cors = require('cors');
app.get('/', function (req, res) {
    res.send('Hello World');
});
ConfigSql_1.sequelize
    .sync({ force: false })
    .then(() => {
    console.log('BD creada con éxito');
})
    .catch((error) => {
    console.log('error al crear la BD');
    console.log(error);
});
///cors
app.use(cors());
app.use(express.json());
// app.listen(8000)
app.use('/graphql', graphqlHTTP({
    schema: Schema_1.schema,
    rootValue: Queris_1.root,
    graphiql: true,
}));
let puerto = process.env.PORT || 8000;
app.listen(puerto);
console.log(`Running GraphQL API server at ${puerto}`);
