'use client'

import { Link } from "@nextui-org/react"
import { GithubIcon, InstagramIcon, PortfolioIcon } from "./chat/Icons"

export default function Footer() {
  return (
    <footer className="w-full border-t border-divider py-6 px-4 bg-background/60 backdrop-blur-lg">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-foreground font-medium">
            © 2024 AI Chat App. All rights reserved.
          </p>
          <p className="text-small text-foreground/60">
            Built with Next.js and NextUI
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            isExternal
            href="https://github.com/yourusername"
            className="text-foreground/60 hover:text-foreground transition-colors"
            title="GitHub"
          >
            <GithubIcon />
          </Link>
          <Link
            isExternal
            href="https://instagram.com/yourusername"
            className="text-foreground/60 hover:text-foreground transition-colors"
            title="Instagram"
          >
            <InstagramIcon />
          </Link>
          <Link
            isExternal
            href="https://yourportfolio.com"
            className="text-foreground/60 hover:text-foreground transition-colors"
            title="Portfolio"
          >
            <PortfolioIcon />
          </Link>
        </div>
      </div>
    </footer>
  )
} 