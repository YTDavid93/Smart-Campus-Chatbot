import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";
import ErrorMessage from "../../utils/ErrorMessage";
import { Loader } from "../../utils/Loading";
import useLogin from "../../hooks/useLogin";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { handleAuthLogin, loading, error } = useLogin();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    handleAuthLogin({
      email: data.email,
      password: data.password
    })
  };

  return (
    <section className="flex justify-center items-center ">
      <form
        className="w-[396px] p-6 bg-white rounded drop-shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center mb-3 text-xl">
          LogIn on <span className=" text-customBlue">Financely</span>.
        </h1>

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

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-3">
          <button
            className="bg-white rounded-lg w-full text-customBlue text-base px-4 py-2 border border-customBlue hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in-out mt-2"
            disabled={loading}
          >
            {loading ? <Loader /> : "LogIn with Email"}
          </button>

          <h3 className="text-center text-base">or</h3>

          <p className="text-sm text-black text-center">
            Or Don't Have An Account ?{" "}
            <NavLink to="/sign-up">Click Here</NavLink>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
