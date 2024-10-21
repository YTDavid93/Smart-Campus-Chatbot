import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../../utils/ErrorMessage";
import { Loader } from "../../utils/Loading";
import useSignup from "../../hooks/useSignup";

const schema = z
  .object({
    name: z
      .string({ invalid_type_error: "Name is required" })
      .min(3, { message: "Must be 3 or more characters long" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be 6 characters long" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { handleAuthSignup, loading, error } = useSignup();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleAuthSignup({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <section className="flex justify-center items-center ">
      <form
        className="w-[396px] p-6 bg-white rounded drop-shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center mb-3 text-xl">
          Sign Up on <span className=" text-customBlue">ThamesBot</span>
        </h1>

        <div className="mb-3">
          <label htmlFor="name">Full Name</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            {...register("confirm")}
            type="password"
            id="confirm"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.confirm && (
            <ErrorMessage>{errors.confirm.message}</ErrorMessage>
          )}
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-3">
          <button
            className="bg-white rounded-lg w-full text-customBlue text-base px-4 py-2 border border-customBlue hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in-out mt-2"
            disabled={loading}
          >
            {loading ? <Loader /> : "Sign Up with Email"}
          </button>

          <h3 className="text-center text-base">or</h3>

          <p className="text-sm text-black text-center">
            Or Have An Account Already ?{" "}
            <NavLink to="/login">Click Here</NavLink>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
