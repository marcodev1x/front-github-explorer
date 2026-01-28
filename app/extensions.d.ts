import '@mui/material/styles';

declare module '@mui/material/styles' {

    interface Palette {
        gradientPrimary: string;
    }

    interface PaletteOptions {
        gradientPrimary?: string;
    }
}