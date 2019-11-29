// import express from 'express';
import { schema } from './GraphQL/Schema'
import { root } from './GraphQL/Queris'
import { sequelize } from './ConfigSql'

const express = require('express')
const app = express();

var graphqlHTTP = require('express-graphql');

var cors = require('cors');

app.get('/', function (req: any, res: any) {
  res.send('Hello World')
})

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('BD creada con éxito');
  })
  .catch((error: any) => {
    console.log('error al crear la BD');
    console.log(error);
  });

///cors
app.use(cors())
app.use(express.json());


// app.listen(8000)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

let puerto = process.env.PORT || 8000;
app.listen(puerto);
console.log(`Running GraphQL API server at ${puerto}`);