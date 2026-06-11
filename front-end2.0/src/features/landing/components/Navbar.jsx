import { BrandHeader } from '../../../components/BrandHeader'

export function Navbar({ onOpenLogin, onOpenRegister }) {
  return <BrandHeader onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} />
}