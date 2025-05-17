import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // ألوان مشهورة للوضع الفاتح
          primary: {
            main: '#1976d2', // أزرق MUI افتراضي
          },
          secondary: {
            main: '#9c27b0', // بنفسجي شهير
          },
          background: {
            default: '#f5f5f5', // رمادي ناعم للخلفية
            paper: '#ffffff', // الأبيض للعناصر مثل الكروت
          },
          text: {
            primary: '#212121', // رمادي داكن للنص الأساسي
            secondary: '#757575', // رمادي متوسط للنص الثانوي
          },
        }
      : {
          // ألوان مشهورة للوضع الغامق
          primary: {
            main: '#90caf9', // أزرق فاتح
          },
          secondary: {
            main: '#ce93d8', // بنفسجي فاتح
          },
          background: {
            default: '#121212', // خلفية داكنة جدًا
            paper: '#1e1e1e', // داكن لعناصر الورق
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
          },
        }),
  },

  components: {
  
  },
});

const theme = (mode) => createTheme(getDesignTokens(mode));

export default theme;
