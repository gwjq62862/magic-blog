"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { Mail, Lock, Github, Chrome, Apple } from "lucide-react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
type FormDataType = {
  email: string;
  password: string;
};
const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const LoginSubmit = async (formData: FormDataType) => {
    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });
      router.push("/");

      if (error) {
        return alert(`sing in feild ${error.message}`);
      }
    } catch (error) {
      console.error("sing in fail", error);
      return alert(`sing in fail`);
    }
  };

  return (
    <main className="relative z-10 w-full max-w-2xl">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-10 space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Welcome back
            </p>
            <h1 className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
              Sign in to Magic Mind
            </h1>
            <p className="text-sm text-gray-400">
              Continue to your dashboard and saved reads.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(LoginSubmit)}>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
              Email
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/30">
                <Mail className="h-4 w-4 text-gray-400" />
                <input
                  className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  required
                />
              </div>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
              Password
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/30">
                <Lock className="h-4 w-4 text-gray-400" />
                <input
                  className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  required
                />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary/40"
                />
                Remember me
              </label>
              <Link href="#" className="hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button size="lg" color="primary" className="w-full justify-center">
              Sign in
            </Button>
          </form>

          <div className="relative flex py-1 items-center text-sm text-gray-400">
            <div className="grow border-t border-white/10"></div>
            <span className="mx-4 shrink">Or continue with</span>
            <div className="grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "GitHub", icon: Github },
              { label: "Google", icon: Chrome },
              { label: "Apple", icon: Apple },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 h-11 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-colors duration-200 text-sm font-medium"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400">
            New here?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
