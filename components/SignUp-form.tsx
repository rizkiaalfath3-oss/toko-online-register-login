"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { SubmitEvent, useState } from "react"
import { toast } from "sonner"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    /** preparing state for each input */
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [role, setRole] = useState<string>("")

  async function handleRegister(event: SubmitEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
       const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`
       const payload = new FormData()
       payload.append("name",name)
       payload.append("email",email)
       payload.append("role",role)
       payload.append("password",password)

       const response = await fetch(url, {
        method:`POST`,
        body:payload,
       })

       const responseData = await response.json()
       const message: string =
        typeof responseData?.message == `string` ? 
          responseData?.message : 
            Object.values(responseData?.message).join(",")

       const status: boolean = responseData?.status || false

       if (!response.ok || !status){
        toast.error(message as string || "Register Failed", {className:`bg-rose-500 text-rose-500`})
        return;
       }

       toast.success(message || "Register Successfully",{className:`bg-green-500 text-green-500`})

    } catch (error) {
        console.log(error);
        toast.error("Failed to register", {className:`bg-rose-500 text-rose-500`})
    }

  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input 
              value={name}
              onChange={e => setName(e.target.value)}
              id="name" 
              type="text" 
              placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password" 
              type="password" 
              required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="role">
                Pilih Role
              </FieldLabel>
              <Select
               value={role}
               onValueChange={value => setRole(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Pilih Role"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>Please confirm your role</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}