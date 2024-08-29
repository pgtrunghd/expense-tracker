"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formRegisterSchema } from "@/lib/validate";
import { useCreateUserMutation } from "@/features/user-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterPage() {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formRegisterSchema>) => {
    startTransition(async () => {
      try {
        const response = await createUser(data).unwrap();
        toast.success("Registration successful");
      } catch (error: any) {
        toast.error(error.data.message);
        console.error(error);
      }
    });
  };

  return (
    <>
      <Card className="max-w-[400px] w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button variant="link" className="p-0" asChild>
                <Link href="/login">You already have account?</Link>
              </Button>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                type="submit"
                disabled={isLoading || isPending}
              >
                {(isLoading || isPending) && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                Register
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
