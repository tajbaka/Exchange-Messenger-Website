export interface MainHeaderItemProps {
    title: string;
    href?: string;
    icon?: string;
    image?: any;
    imageStyle?: any;
    style?: Array<string>;
    items: Array<MainHeaderItemProps> | null;
}