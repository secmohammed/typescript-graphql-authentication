import { MaxLength } from "class-validator";
import { InputType, Field } from "type-graphql";
@InputType()
export class PasswordInput {
    @Field()
    @MaxLength(32)
    password: string;
}
