import { Separator } from '@/components/ui/separator'
import { conf } from '@/config/site'
export default async function Footer() {
  return (
    <div className="p-2 flex flex-col gap-2 items-center">
      <Separator className="m-1" />
      <div className="text-muted-foreground text-sm">&copy; 2025 {conf.title}</div>
    </div>
  )
}
