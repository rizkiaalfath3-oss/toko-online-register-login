import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

type Props = {
    name : string,
    description : string,
    image : string,
    price : number
}

export function CardProduct(props : Props) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${props.image}`}
        width={100}
        height={100}
        alt="Product Image"
        className="relative z-20 aspect-video w-full object-cover brightness-100 "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{props.price}</Badge>
        </CardAction>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  )
}
