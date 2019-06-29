import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middlewares/isAuth";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
@Resolver(User)
export class RegisterResolver {
    @UseMiddleware(isAuth)
    @Query(() => String)
    async hello() {
        return "hello-world";
    }

    @Mutation(() => User)
    async register(@Arg("data")
    {
        email,
        firstName,
        lastName,
        password
    }: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();
        await sendEmail(email, await createConfirmationUrl(user.id));
        return user;
    }
}
