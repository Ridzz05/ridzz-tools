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

export default function NavbarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
    link: '',
    icon: null as React.ReactNode
  })

  const handleModalOpen = (type: string) => {
    switch(type) {
      case 'github':
        setModalContent({
          title: 'GitHub',
          content: 'Kunjungi GitHub saya untuk melihat project-project lainnya',
          link: 'https://github.com/yourusername',
          icon: <GithubIcon />
        })
        break
      case 'instagram':
        setModalContent({
          title: 'Instagram',
          content: 'Follow Instagram saya untuk update terbaru',
          link: 'https://instagram.com/yourusername',
          icon: <InstagramIcon />
        })
        break
      case 'portfolio':
        setModalContent({
          title: 'Portfolio',
          content: 'Lihat portfolio lengkap saya',
          link: 'https://yourportfolio.com',
          icon: <PortfolioIcon />
        })
        break
    }
    onOpen()
  }

  return (
    <>
      <Navbar className="bg-background/70 backdrop-blur-lg shadow-[0_2px_10px_rgba(0,0,0,0.2)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-foreground/20 after:to-transparent">
        <NavbarBrand>
          <p className="font-bold text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-300% hover:animate-pulse transition-all duration-300">
            K.A Chat
          </p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="light"
                className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-300% hover:animate-pulse transition-all duration-300 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Social Links
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Social Links"
              className="bg-background/95 backdrop-blur-md"
            >
              <DropdownItem
                key="github"
                onClick={() => handleModalOpen('github')}
                startContent={<span className="text-foreground"><GithubIcon /></span>}
                className="text-foreground hover:bg-default-100 dark:hover:bg-default-50 transition-colors"
              >
                GitHub
              </DropdownItem>
              <DropdownItem
                key="instagram"
                onClick={() => handleModalOpen('instagram')}
                startContent={<span className="text-foreground"><InstagramIcon /></span>}
                className="text-foreground hover:bg-default-100 dark:hover:bg-default-50 transition-colors"
              >
                Instagram
              </DropdownItem>
              <DropdownItem
                key="portfolio"
                onClick={() => handleModalOpen('portfolio')}
                startContent={<span className="text-foreground"><PortfolioIcon /></span>}
                className="text-foreground hover:bg-default-100 dark:hover:bg-default-50 transition-colors"
              >
                Portfolio
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        backdrop="blur"
        classNames={{
          backdrop: "bg-white/10 backdrop-blur-md",
          base: "bg-background/80 dark:bg-default-100/80 backdrop-blur-md",
          closeButton: "hover:bg-default-100",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="text-foreground">{modalContent.icon}</span>
                  {modalContent.title}
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="text-foreground">{modalContent.content}</p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                  className="bg-danger-500/20 hover:bg-danger-500/30 text-danger transition-all duration-300"
                >
                  Tutup
                </Button>
                <Button 
                  onPress={onClose} 
                  as={Link} 
                  href={modalContent.link} 
                  target="_blank"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-all duration-300"
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