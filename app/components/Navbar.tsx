'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
} from "@nextui-org/react"
import { useState } from "react"
import { GithubIcon, InstagramIcon, PortfolioIcon } from "./chat/Icons"
import Sidebar from "./Sidebar"

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <span 
        className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
          isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
        }`} 
      />
      <span 
        className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span 
        className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
          isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
        }`}
      />
    </div>
  )
}

export default function NavbarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
    link: '',
    icon: null as React.ReactNode
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleModalOpen = (type: string) => {
    switch(type) {
      case 'github':
        setModalContent({
          title: 'GitHub',
          content: 'Kunjungi GitHub saya untuk melihat project-project lainnya',
          link: 'https://github.com/Ridzz05',
          icon: <GithubIcon />
        })
        break
      case 'instagram':
        setModalContent({
          title: 'Instagram',
          content: 'Follow Instagram saya untuk update terbaru',
          link: 'https://instagram.com/ezpzlemonsquizy',
          icon: <InstagramIcon />
        })
        break
      case 'portfolio':
        setModalContent({
          title: 'Portfolio',
          content: 'Lihat portfolio lengkap saya',
          link: 'https://portofolio-lake-omega.vercel.app/',
          icon: <PortfolioIcon />
        })
        break
    }
    onOpen()
  }

  return (
    <>
      <Navbar 
        className="bg-background/60 backdrop-blur-xl border-b border-default-100/50 dark:border-default-50/50"
        maxWidth="full"
        position="sticky"
      >
        <NavbarBrand className="gap-4">
          <Button
            variant="light"
            isIconOnly
            onClick={() => setIsSidebarOpen(true)}
            className="bg-default-100 dark:bg-default-50"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
          <p className="font-bold text-2xl text-white px-4 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
            K.A Chat
          </p>
        </NavbarBrand>

        <NavbarContent justify="end" className="gap-4">
          <Dropdown onOpenChange={setIsMenuOpen}>
            <DropdownTrigger>
              <Button 
                variant="light"
                isIconOnly
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-all duration-300 p-0"
              >
                <HamburgerIcon isOpen={isMenuOpen} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Social Links"
              className="bg-background/95 backdrop-blur-xl"
              itemClasses={{
                base: [
                  "rounded-lg",
                  "transition-all",
                  "duration-300",
                  "data-[hover=true]:bg-default-100/80",
                  "data-[hover=true]:translate-x-1",
                ]
              }}
            >
              <DropdownItem
                key="github"
                onClick={() => handleModalOpen('github')}
                startContent={<span className="text-foreground"><GithubIcon /></span>}
              >
                GitHub
              </DropdownItem>
              <DropdownItem
                key="instagram"
                onClick={() => handleModalOpen('instagram')}
                startContent={<span className="text-foreground"><InstagramIcon /></span>}
              >
                Instagram
              </DropdownItem>
              <DropdownItem
                key="portfolio"
                onClick={() => handleModalOpen('portfolio')}
                startContent={<span className="text-foreground"><PortfolioIcon /></span>}
              >
                Portfolio
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        backdrop="blur"
        classNames={{
          backdrop: "bg-default-100/10 backdrop-blur-md",
          base: "border border-default-100 bg-background/80 dark:bg-default-100/80 backdrop-blur-md",
          header: "border-b border-default-100/50",
          footer: "border-t border-default-100/50",
          closeButton: "hover:bg-default-100/80 active:bg-default-200/80",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3 text-foreground">
                  <span className="text-foreground p-2 bg-default-100/50 rounded-lg">
                    {modalContent.icon}
                  </span>
                  <span className="font-medium">{modalContent.title}</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="text-foreground/80">{modalContent.content}</p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                  className="bg-danger-500/20 hover:bg-danger-500/30 text-danger font-medium transition-all duration-300"
                >
                  Tutup
                </Button>
                <Button 
                  onPress={onClose} 
                  as={Link} 
                  href={modalContent.link} 
                  target="_blank"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-300"
                >
                  Kunjungi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
} 