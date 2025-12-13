"use client";

import Link from "next/link";
import Button from "@/components/home/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRound, Mail, Lock, Github, Chrome, Apple } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        alert(`Sign up failed: ${error.code} - ${error.message}`);
        return;
      }
    } catch (err) {
      console.error("Sign up failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative z-10 w-full max-w-2xl">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-10 space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Sign up
            </p>
            <h1 className="text-white text-2xl sm:text-3xl font-semibold">
              Create your account
            </h1>
            <p className="text-sm text-gray-400">
              Start saving posts and personalize your feed.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Full name */}
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
              Full name
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <UserRound className="h-4 w-4 text-gray-400" />
                <input
                  className="flex-1 bg-transparent text-white focus:outline-none"
                  placeholder="Alex Carter"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && (
                <span className="text-xs text-red-400">
                  {errors.name.message}
                </span>
              )}
            </label>

            {/* Email */}
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
              Email
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  className="flex-1 bg-transparent text-white focus:outline-none"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-400">
                  {errors.email.message}
                </span>
              )}
            </label>

            {/* Password */}
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
              Password
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <Lock className="h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  className="flex-1 bg-transparent text-white focus:outline-none"
                  placeholder="Create a secure password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <span className="text-xs text-red-400">
                  {errors.password.message}
                </span>
              )}
            </label>

            {/* Confirm Password */}
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
              Confirm password
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <Lock className="h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  className="flex-1 bg-transparent text-white focus:outline-none"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-xs text-red-400">
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>

            <Button
              disabled={isLoading}
              size="lg"
              color="primary"
              className="w-full justify-center"
            >
              {isLoading ? "Creating..." : "Create an account"}
            </Button>
          </form>

          <div className="relative flex items-center text-sm text-gray-400">
            <div className="grow border-t border-white/10" />
            <span className="mx-4">Or continue with</span>
            <div className="grow border-t border-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[Github, Chrome, Apple].map((Icon, i) => (
              <button
                key={i}
                className="flex items-center justify-center gap-2 h-11 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
