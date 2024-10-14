"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useSignInMutation } from "@/features/user-slice";
import useLocalStorage from "@/hooks/useLocalStorage";

import { formLoginSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginPage = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useLocalStorage("user", {
    access_token: "",
    refresh_token: "",
    id: "",
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formLoginSchema>) => {
    startTransition(async () => {
      try {
        const response = await signIn(data).unwrap();
        setValue(response);
        router.push("/dashboard");
      } catch (error: any) {
        toast.error(error.data.message);
        console.error(error);
      }
    });
  };

  return (
    <>
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to track your budget</CardDescription>
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
              <Button variant="link" className="p-0" asChild>
                <Link href="/register">You are not have account?</Link>
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
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default LoginPage;
