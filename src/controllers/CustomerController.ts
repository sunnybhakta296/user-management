import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateCustomerInput } from "../dto";
import { Customer } from "../models";

export const CustomerSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(CreateCustomerInput, req.body);

  const validationError = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (validationError.length) {
    return res.status(400).json(validationError);
  }
  const { email, password } = customerInputs;

  const existingCustomer = Customer.findOne({ email });

  if (existingCustomer) {
    return res.status(400).json({ message: "Email already exit" });
  }

  try {
    const customer = await Customer.create({
      email,
      password,
      salt: "123456",
      firstName: "firstName",
      lastName: "lastName",
    });

    return res.status(201).json({ email: customer.email });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
