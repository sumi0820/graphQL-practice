const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

//GraphQL schema
const schema = buildSchema(`
    type Query{
        course(id: Int!): Course
        courses(topic: String):[Course]
    },
    type Course {
      id: Int
      title: String
      author: String
      descriptions: String
      topic: String
      url: String
    }
`);

let coursesData = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/",
  },
  {
    id: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/",
  },
  {
    id: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
  },
];

const getCourse = (args) => {
  let newCourse = coursesData.filter((course) => {
    console.log(course.id, args.id);
    return course.id == args.id;
  });
  console.log(newCourse);
  return newCourse[0]
};

// Define Root resolver
const root = {
  course: getCourse,
};

// Express server
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, // Must be provided
    rootValue: root,
    graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
