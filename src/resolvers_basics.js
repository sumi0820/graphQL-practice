// Reference
// https://dev.to/leonardomso/a-beginners-guide-to-graphql-3kjj

import { users } from "./db";

const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => {
      console.log(users);
      return users.find((user) => user.id == id);
    },
    users: (parent, args, context, info) => {
      console.log(users);

      return users;
    },
  },

  Mutation: {
    createUser: (parent, { id, name, country, age }, context, info) => {
      const newUser = { id, name, country, age };
      users.push(newUser);
      console.log("here is create user:", users);
      return newUser;
    },
    updateUser: (parent, { id, name, country, age }, context, info) => {
      let updatedUser = users.find((user) => user.id == id);
      updatedUser.name = name ? name : updatedUser.name;
      updatedUser.age = age;
      updatedUser.country = country;
      console.log("here is updated user:", users);

      return updatedUser;
    },
    deleteUser: (parent, {id}, context, age) => {
        const userIndex = users.findIndex(user => user.id == id);
        if (userIndex === -1) throw new Error("User not found.");

        const deletedUsers = users.splice(userIndex, 1);
        console.log(users, userIndex);
        return deletedUsers    

    }
  },
};

export default resolvers;
