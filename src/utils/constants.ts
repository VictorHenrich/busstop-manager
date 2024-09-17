import { BsPersonFillGear } from "react-icons/bs";
import { FaMapMarkerAlt, FaMapMarkedAlt  } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";
import { FaBusAlt } from "react-icons/fa";
import { type AppMenuItemProps } from "@/components/menu";
import { type AppSelectItemProps } from "@/components/select";



export const BASE_URL: string = process.env.BASE_URL || "";

export const SOCKET_BASE_URL: string = process.env.NEXT_PUBLIC_SOCKET_BASE_URL || "";

export const APP_VERSION: string = process.env.NEXT_PUBLIC_APP_VERSION || "";

export const TOKEN_KEY_NAME: string = process.env.TOKEN_KEY_NAME || "";

export const REFRESH_TOKEN_KEY_NAME: string = process.env.REFRESH_TOKEN_KEY_NAME || "";

export const AUTH_URL: string = process.env.AUTH_URL || "";

export const GEOLOCATION_URL: string = process.env.GEOLOCATION_URL || "";

export const DASHBOARD_MENU_ITENS: AppMenuItemProps[] = [
    {
        description: "Viagens",
        icon: SiGoogleanalytics,
        id: "travel",
        path: "/dashboard/travel"
    },
    {
        description: "Veículos",
        icon: FaBusAlt,
        id: "vehicle",
        path: "/dashboard/vehicle"
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

export const DASHBOARD_FOOTER_MENU_ITENS: AppMenuItemProps[] = [
    {
        description: "Sair",
        icon: IoLogOut,
        id: "logout",
        path: "/logout"
    }
]

export const STATE_ITEMS: AppSelectItemProps[] = [
    {
        "description": "Acre - AC",
        "value": "AC"
    },
    {
        "description": "Alagoas - AL",
        "value": "AL"
    },
    {
        "description": "Amapá - AP",
        "value": "AP"
    },
    {
        "description": "Amazonas - AM",
        "value": "AM"
    },
    {
        "description": "Bahia - BA",
        "value": "BA"
    },
    {
        "description": "Ceará - CE",
        "value": "CE"
    },
    {
        "description": "Distrito Federal - DF",
        "value": "DF"
    },
    {
        "description": "Espírito Santo - ES",
        "value": "ES"
    },
    {
        "description": "Goiás - GO",
        "value": "GO"
    },
    {
        "description": "Maranhão - MA",
        "value": "MA"
    },
    {
        "description": "Mato Grosso - MT",
        "value": "MT"
    },
    {
        "description": "Mato Grosso do Sul - MS",
        "value": "MS"
    },
    {
        "description": "Minas Gerais - MG",
        "value": "MG"
    },
    {
        "description": "Pará - PA",
        "value": "PA"
    },
    {
        "description": "Paraíba - PB",
        "value": "PB"
    },
    {
        "description": "Paraná - PR",
        "value": "PR"
    },
    {
        "description": "Pernambuco - PE",
        "value": "PE"
    },
    {
        "description": "Piauí - PI",
        "value": "PI"
    },
    {
        "description": "Rio de Janeiro - RJ",
        "value": "RJ"
    },
    {
        "description": "Rio Grande do Norte - RN",
        "value": "RN"
    },
    {
        "description": "Rio Grande do Sul - RS",
        "value": "RS"
    },
    {
        "description": "Rondônia - RO",
        "value": "RO"
    },
    {
        "description": "Roraima - RR",
        "value": "RR"
    },
    {
        "description": "Santa Catarina - SC",
        "value": "SC"
    },
    {
        "description": "São Paulo - SP",
        "value": "SP"
    },
    {
        "description": "Sergipe - SE",
        "value": "SE"
    },
    {
        "description": "Tocantins - TO",
        "value": "TO"
    }
]
