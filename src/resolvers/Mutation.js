import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async loginUser(parent, args, { prisma }, info) {
    const user = await prisma.query.user({ where: { email: args.data.email } });

    if (!user) {
      throw new Error("Unable to Login");
    }

    const isMatchPassword = await bcrypt.compare(
      args.data.password,
      user.password
    );

    if (!isMatchPassword) {
      throw new Error("Unable to Login");
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },

  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: { ...args.data, password },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },

  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: userId,
        },
      },
      info
    );
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },
};

export { Mutation as default };
