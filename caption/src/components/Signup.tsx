"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Jaro } from "next/font/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const jaro = Jaro({ subsets: ["latin"] });

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  otp: z.string().length(6, {
    message: "OTP must be 6 characters long.",
  }),
});

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      otp: "",
    },
  });

  const generateOTP = async () => {
    setIsLoading(true);
    // Simulate OTP generation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep(2);
    // In a real application, you would send the OTP to the user's email here
    console.log("OTP generated and sent to email");
  };

  const verifyOTP = async (otp: string) => {
    setIsLoading(true);
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // In a real application, you would verify the OTP with your backend here
    setOtpVerified(true);
    console.log("OTP verified");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step === 1) {
      await generateOTP();
    } else {
      setIsLoading(true);
      // Simulate signup process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("User signed up:", values);
      setIsLoading(false);
      router.push("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`flex min-h-screen flex-col gap-10  bg-black px-4 sm:px-6 lg:px-8 ${jaro.className}`}
    >
      <p className="text-3xl sm:text-3xl font-bold text-white mt-10 text-center"
            style={{
              WebkitTextStroke: "0.5px #8E2DE2",
            }}>AI Caption Generator</p>
      <div className="w-full max-w-[380px] space-y-6 rounded-xl bg-zinc-900 p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{
              WebkitTextStroke: "0.5px #8E2DE2",
            }}
          >
            Sign up for an account
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">
                        Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="pl-10 h-11 bg-zinc-800 text-white border-zinc-700 focus:border-[#8E2DE2] focus:ring-[#8E2DE2] text-sm sm:text-base rounded-lg"
                          />
                          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm sm:text-base" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            className="pl-10 h-11 bg-zinc-800 text-white border-zinc-700 focus:border-[#8E2DE2] focus:ring-[#8E2DE2] text-sm sm:text-base rounded-lg"
                          />
                          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm sm:text-base" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="pl-10 pr-10 h-11 bg-zinc-800 text-white border-zinc-700 focus:border-[#8E2DE2] focus:ring-[#8E2DE2] text-sm sm:text-base rounded-lg"
                          />
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm sm:text-base" />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 focus:outline-none transition-colors"
                          >
                            {showPassword ? (
                              <FaEyeSlash className="text-sm sm:text-base" />
                            ) : (
                              <FaEye className="text-sm sm:text-base" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm sm:text-base">
                      Enter OTP
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 6-digit OTP"
                        {...field}
                        className="h-11 bg-zinc-800 text-white border-zinc-700 focus:border-[#8E2DE2] focus:ring-[#8E2DE2] text-sm sm:text-base rounded-lg"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
            )}
            <Button
              type="submit"
              className="w-full h-11 bg-[#8E2DE2] hover:bg-[#7B25C3] text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E2DE2] focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading
                ? step === 1
                  ? "Generating OTP..."
                  : "Signing up..."
                : step === 1
                ? "Generate OTP"
                : "Sign up"}
            </Button>
          </form>
        </Form>
        {otpVerified && (
          <div className="text-green-500 text-sm sm:text-base text-center">
            OTP verified successfully!
          </div>
        )}
      </div>
    </div>
  );
}
