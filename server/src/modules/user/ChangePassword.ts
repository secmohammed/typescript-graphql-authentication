import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { redis } from "../../redis";
import bcrypt from "bcryptjs";
import { MyContext } from "../../types/MyContext";
@Resolver(User)
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data")
        { token, password }: ChangePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const userId = await redis.get(forgotPasswordPrefix + token);
        if (!userId) {
            return null;
        }
        const user = await User.findOne(userId);

        if (!user) {
            return null;
        }
        user.password = await bcrypt.hash(password, 12);

        await user.save();

        await redis.del(forgotPasswordPrefix + token);

        ctx.req.session!.userId = user.id;

        return user;
    }
}
