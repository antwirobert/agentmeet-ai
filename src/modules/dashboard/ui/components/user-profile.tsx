import GeneratedAvatar from '@/components/generated-avatar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { authClient } from '@/lib/auth-client'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export const UserProfile = () => {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()
  const isMobile = useIsMobile()

  if (!session || isPending) return null

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        },
      },
    })
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          className="flex items-center cursor-pointer justify-between gap-3 rounded-lg border border-border/10 py-2 px-4 w-full
        bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2 text-white"
        >
          {session?.user.image ? (
            <Avatar>
              <AvatarImage src={session?.user.image} alt="user avatar" />
            </Avatar>
          ) : (
            <GeneratedAvatar seed={session?.user.name} variant="initials" />
          )}
          <div className="text-left flex flex-col font-semibold">
            <span className="max-w-[200px] truncate">{session?.user.name}</span>
            <span className="text-xs max-w-[200px] truncate">
              {session?.user.email}
            </span>
          </div>
          <ChevronDownIcon className="size-4" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{session.user.name}</DrawerTitle>
            <DrawerDescription>{session.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline">
              Biling <CreditCardIcon />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout <LogOutIcon />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex items-center cursor-pointer justify-between gap-3 rounded-lg border border-border/10 p-3 w-full
        bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2 text-white"
      >
        <div>
          {session?.user.image ? (
            <Avatar>
              <AvatarImage src={session?.user.image} alt="user avatar" />
            </Avatar>
          ) : (
            <GeneratedAvatar seed={session?.user.name} variant="initials" />
          )}
          <div className="flex flex-col font-semibold">
            <span className="max-w-[150px] truncate">{session?.user.name}</span>
            <span className="text-xs max-w-[150px] truncate">
              {session?.user.email}
            </span>
          </div>
          <ChevronDownIcon className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        className="bg-background rounded-md w-56 p-2"
      >
        <DropdownMenuLabel className="text-black max-w-[200px] truncate">
          {session.user.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-muted-foreground max-w-[200px] truncate">
          {session.user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer text-black flex justify-between items-center">
            Billing
            <CreditCardIcon />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-black flex justify-between items-center"
          >
            Logout
            <LogOutIcon />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
