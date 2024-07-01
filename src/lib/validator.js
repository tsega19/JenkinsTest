import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Invalid Email Address",
    }),
    password: z.string().min(1, { message: "Password is required" }),
});
export const signUpSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    middleName: z.string().min(1, { message: "Middle Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Invalid Email Address",
    }),
    phoneNumber: z.string().min(1, { message: "phoneNumber is required" }),
    businessName: z.string().min(1, { message: "businessName is required" }),
    password: z.string().min(8, {
        message: "Password is required and must be at least 8 characters",
    }),
    referralCode: z.string().optional(),
    agreement: z.boolean().refine((value) => value === true, {
        message: "You must agree to the terms and conditions",
        path: ["agreement"],
    }),
});
export const profileUpdateSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    middleName: z.string().min(1, { message: "Middle Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    // phoneNumber: z.string().min(1, { message: "phoneNumber is required" }),
    // businessName: z.string().min(1, { message: "businessName is required" }),
});
export const kycUpdateSchema = z.object({
    name: z.string().min(1, { message: "Business Name is required" }),
    type: z.string().min(1, { message: "Business Type is required" }),
    tin: z.string().optional(),
    registrationNo: z.string().optional(),
    licenseNo: z.string().optional(),
    addressCity: z.string().min(1, { message: "City is required" }),
    addressSubCity: z.string().min(1, { message: "SubCity is required" }),
    addressWoreda: z.string().min(1, { message: "Woreda is required" }),
    addressHouseNo: z.string().min(1, { message: "HouseNo is required" }),
    website: z.string().optional(),
    telephone: z.string().min(1, { message: "Business Telephone is required" }),
});
export const BankAccountSchema = z.object({
    holderName: z.string().min(1, { message: "Bank Name is required" }),
    bank: z.string().min(1, { message: "Bank Name is required" }),
    accountNumber: z.string().min(1, { message: "Account No is required" }),
    // accountType: z.string().min(1, { message: "Account Type is required" }),
});
export const ApiKeySchema = z.object({
    label: z.string().min(1, { message: "Application Name is required" }),
    clientType: z.string().min(1, { message: "type is required" }),
    // expirationDate: z.string().min(1, { message: "Expiration Date is required" }),
});
//# sourceMappingURL=validator.js.map