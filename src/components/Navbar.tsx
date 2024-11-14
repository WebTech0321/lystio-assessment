"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "./ui/popover";
import IconSearch from "@/assets/svg/search.svg";
import IconAIFill from "@/assets/svg/ai-fill.svg";
import IconChevronDown from "@/assets/svg/chevron-down.svg";
import IconGlobe from "@/assets/svg/globe.svg";

export function Navbar() {
  return (
    <nav className="w-full h-20 px-12 shrink-0 flex justify-between items-center gap-4 border-b border-black/10 bg-background">
      <Link href="/" className="flex items-center">
        <Image src="/logo.svg" alt="Logo" width={80} height={38} priority />
      </Link>

      <div className="relative w-full max-w-[514px]">
        <Input
          placeholder="Search"
          className="w-full h-12 rounded-full pr-[180px]"
        />
        <div className="absolute top-1/2 right-1 -translate-y-1/2 flex items-center gap-2">
          <Popover>
            <PopoverTrigger className="flex items-center gap-2">
              <IconAIFill />
              <div className="font-medium">AI Search</div>
              <IconChevronDown />
            </PopoverTrigger>
          </Popover>
          <div className="flex items-center gap-4">
            <Button variant="primary" className="w-11 h-11 rounded-full">
              <IconSearch />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="px-6">Advertise</div>
        <Button variant="outline" className="w-8 h-8 rounded-full">
          <IconGlobe />
        </Button>
        <Popover>
          <PopoverTrigger className="flex items-center gap-1">
            <Image
              src="/avatar.png"
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <IconChevronDown />
          </PopoverTrigger>
        </Popover>
      </div>
    </nav>
  );
}
