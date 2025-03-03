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
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
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
        await createUser(data).unwrap();
        toast.success("Registration successful");
        form.reset();
        router.push("/login");
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
          <CardTitle>Đăng ký</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nhập tên" />
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
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập mật khẩu"
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
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập mật khẩu"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button variant="link" className="p-0" asChild>
                <Link href="/login">Bạn đã có tài khoản?</Link>
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
                Đăng ký
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
