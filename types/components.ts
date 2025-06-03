// Types communs pour les composants

export interface BaseComponentProps {
  class?: string
  style?: string | Record<string, string>
}

export interface LinkProps extends BaseComponentProps {
  to: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  external?: boolean
}

export interface IconProps {
  name: string
  size?: string | number
  color?: string
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconLeft?: string
  iconRight?: string
  type?: 'button' | 'submit' | 'reset'
  to?: string
  external?: boolean
}

export interface CardProps extends BaseComponentProps {
  title?: string
  description?: string
  hover?: boolean
  padding?: boolean
}

export interface ModalProps extends BaseComponentProps {
  modelValue?: boolean
  title?: string
  closable?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface AnimationProps {
  duration?: number
  delay?: number
  easing?: string
  disabled?: boolean
}

export interface FormFieldProps extends BaseComponentProps {
  modelValue?: string | number | boolean
  label?: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
}

export interface NavigationItem {
  label: string
  to: string
  icon?: string
  badge?: string | number
  children?: NavigationItem[]
}