import { BsPersonFillGear } from "react-icons/bs";
import { FaMapMarkerAlt, FaMapMarkedAlt  } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { AppMenuItemProps } from "@/components/menu";



export const BASE_URL: string = process.env.BASE_URL || "";

export const APP_VERSION: string = process.env.NEXT_PUBLIC_APP_VERSION || "";

export const TOKEN_KEY_NAME: string = process.env.TOKEN_KEY_NAME || "";

export const REFRESH_TOKEN_KEY_NAME: string = process.env.REFRESH_TOKEN_KEY_NAME || "";

export const API_CONFIGS: RequestInit = {
    headers: {
        "Content-Type": "application/json"
    }
}

export const AUTH_URL: string = process.env.AUTH_URL || "";

export const DASHBOARD_MENU_ITENS: AppMenuItemProps[] = [
    {
        description: "Viagens",
        icon: SiGoogleanalytics,
        id: "travel",
        path: "/dashboard/travel"
    },
    {
        description: "Agentes",
        icon: BsPersonFillGear,
        id: "agents",
        path: "/dashboard/agents"
    },
    {
        description: "Pontos",
        icon: FaMapMarkerAlt,
        id: "points",
        path: "/dashboard/points"
    },
    {
        description: "Rotas",
        icon: FaMapMarkedAlt,
        id: "routes",
        path: "/dashboard/routes"
    }
]