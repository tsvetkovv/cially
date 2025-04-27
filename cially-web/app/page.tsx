"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  guildID: z.string().min(2).max(50),
  
});

export default function Home() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guildID: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    redirect(`guild/?guildID=${values.guildID}`)
    
  }

  return (
    <>
    <div className="w-40 place-self-center">
      <img src="/logo-png.png"></img>
      </div>
      <Card className="mx-10 mt-2">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Cially</CardTitle>
          <CardDescription className="text-center">
            Please enter your info to proceed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="guildID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Server ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ex. 1247194176638947389" {...field} />
                    </FormControl>
                    <FormDescription>
                      Right Click on your server -> Copy Server ID -> Paste Above
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="text-white">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
