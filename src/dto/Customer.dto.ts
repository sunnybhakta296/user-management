import { IsEmail, Length } from "class-validator";

export class CreateCustomerInput {
  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}
