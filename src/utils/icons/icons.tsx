import type { SVGProps } from "react"
import { 
  ChevronDown, 
  Menu, 
  X, 
  Clock, 
  Star, 
  ChevronUp, 
  Check,
  Search,
  Filter,
  Heart,
  Play,
  Share2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Delete,
  Edit,
  AlertCircle,
  LogOut
} from "lucide-react"
import { Loading } from "@/common/loader/loading";

const Logo = (props: SVGProps<SVGSVGElement>) => {
    return (
      <svg
        {...props}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_i_7_2)">
          <path
            d="M19.6854 35.433H31.4967C33.6711 35.433 35.4337 37.1957 35.4337 39.37H19.6854C8.81316 39.37 0 30.557 0 19.685C0 8.81297 8.81316 0 19.6854 0C30.5577 0 39.3708 8.81297 39.3708 19.685C39.3771 23.9453 37.995 28.0916 35.4337 31.496C32.8326 31.496 31.4863 29.1716 32.8165 26.9363C33.3853 25.9805 33.889 24.7156 34.2355 22.4689C34.7973 18.8262 35.0788 14.7183 33.1774 11.5609C31.2759 8.40351 28.3273 6.01304 24.8448 4.80577C21.3623 3.59851 17.5667 3.65093 14.119 4.95392C10.6712 6.25691 7.78966 8.72791 5.97617 11.9366C4.16268 15.1453 3.53212 18.8885 4.19429 22.5142C4.85647 26.14 6.76943 29.4186 9.60005 31.7792C12.4307 34.1398 15.9996 35.4328 19.6854 35.433ZM19.6854 15.748C18.6412 15.748 17.6398 15.3332 16.9015 14.5949C16.1631 13.8565 15.7483 12.8552 15.7483 11.811C15.7483 10.7668 16.1631 9.76545 16.9015 9.02712C17.6398 8.28879 18.6412 7.874 19.6854 7.874C20.7296 7.874 21.731 8.28879 22.4693 9.02712C23.2077 9.76545 23.6225 10.7668 23.6225 11.811C23.6225 12.8552 23.2077 13.8565 22.4693 14.5949C21.731 15.3332 20.7296 15.748 19.6854 15.748ZM11.8112 23.622C10.7671 23.622 9.76565 23.2072 9.02731 22.4689C8.28896 21.7305 7.87416 20.7292 7.87416 19.685C7.87416 18.6408 8.28896 17.6395 9.02731 16.9011C9.76565 16.1628 10.7671 15.748 11.8112 15.748C12.8554 15.748 13.8568 16.1628 14.5952 16.9011C15.3335 17.6395 15.7483 18.6408 15.7483 19.685C15.7483 20.7292 15.3335 21.7305 14.5952 22.4689C13.8568 23.2072 12.8554 23.622 11.8112 23.622ZM27.5596 23.622C26.5154 23.622 25.514 23.2072 24.7756 22.4689C24.0373 21.7305 23.6225 20.7292 23.6225 19.685C23.6225 18.6408 24.0373 17.6395 24.7756 16.9011C25.514 16.1628 26.5154 15.748 27.5596 15.748C28.6037 15.748 29.6052 16.1628 30.3435 16.9011C31.0819 17.6395 31.4967 18.6408 31.4967 19.685C31.4967 20.7292 31.0819 21.7305 30.3435 22.4689C29.6052 23.2072 28.6037 23.622 27.5596 23.622ZM19.6854 31.496C18.6412 31.496 17.6398 31.0812 16.9015 30.3429C16.1631 29.6045 15.7483 28.6032 15.7483 27.559C15.7483 26.5148 16.1631 25.5135 16.9015 24.7751C17.6398 24.0368 18.6412 23.622 19.6854 23.622C20.7296 23.622 21.731 24.0368 22.4693 24.7751C23.2077 25.5135 23.6225 26.5148 23.6225 27.559C23.6225 28.6032 23.2077 29.6045 22.4693 30.3429C21.731 31.0812 20.7296 31.496 19.6854 31.496Z"
            fill="#CCFF00"
          />
        </g>
        <defs>
          <filter
            id="filter0_i_7_2"
            x="0"
            y="0"
            width="39.3706"
            height="42.0796"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2.70965" />
            <feGaussianBlur stdDeviation="1.35482" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_7_2" />
          </filter>
        </defs>
      </svg>
    );
  };

export const icons = {
    logo: Logo,
    chevronDown: ChevronDown,
    menu: Menu,
    x: X,
    clock: Clock,
    star: Star,
    chevronUp: ChevronUp,
    check: Check,
    search: Search,
    filter: Filter,
    heart: Heart,
    play: Play,
    share2: Share2,
    calendar: Calendar,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    edit: Edit,
    alert: AlertCircle,
    cancel: X,
    warning: AlertCircle,
    logout: LogOut,
    delete: Delete,
    loading: Loading,
}