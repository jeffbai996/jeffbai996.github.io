import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.cancel': 'Cancel',
      'common.confirm': 'Confirm',
      'common.save': 'Save',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.clear': 'Clear',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.previous': 'Previous',
      'common.submit': 'Submit',

      // Navigation
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.account': 'My Account',
      'nav.login': 'Login',
      'nav.logout': 'Logout',
      'nav.register': 'Register',

      // Portal
      'portal.title': 'GOV.PRAYA',
      'portal.subtitle': 'Government Portal of the Republic of Praya',
      'portal.search.placeholder': 'Search government services...',
      'portal.popular.services': 'Popular Services',
      'portal.all.departments': 'All Departments',

      // Departments
      'dept.npa': 'National Police Agency',
      'dept.bop': 'Bank of Praya',
      'dept.revenue': 'Revenue Department',
      'dept.health': 'Health Department',
      'dept.transport': 'Transport Department',

      // Account
      'account.dashboard': 'Dashboard',
      'account.security': 'Security',
      'account.profile': 'Profile',
      'account.settings': 'Settings',

      // Alerts
      'alert.emergency': 'Emergency',
      'alert.warning': 'Warning',
      'alert.info': 'Information',
      'alert.success': 'Success'
    }
  },
  es: {
    translation: {
      // Common
      'common.loading': 'Cargando...',
      'common.error': 'Error',
      'common.success': 'Éxito',
      'common.cancel': 'Cancelar',
      'common.confirm': 'Confirmar',
      'common.save': 'Guardar',
      'common.delete': 'Eliminar',
      'common.edit': 'Editar',
      'common.search': 'Buscar',
      'common.filter': 'Filtrar',
      'common.clear': 'Limpiar',
      'common.back': 'Atrás',
      'common.next': 'Siguiente',
      'common.previous': 'Anterior',
      'common.submit': 'Enviar',

      // Navigation
      'nav.home': 'Inicio',
      'nav.services': 'Servicios',
      'nav.account': 'Mi Cuenta',
      'nav.login': 'Iniciar Sesión',
      'nav.logout': 'Cerrar Sesión',
      'nav.register': 'Registrarse',

      // Portal
      'portal.title': 'GOV.PRAYA',
      'portal.subtitle': 'Portal Gubernamental de la República de Praya',
      'portal.search.placeholder': 'Buscar servicios gubernamentales...',
      'portal.popular.services': 'Servicios Populares',
      'portal.all.departments': 'Todos los Departamentos',

      // Departments
      'dept.npa': 'Agencia Nacional de Policía',
      'dept.bop': 'Banco de Praya',
      'dept.revenue': 'Departamento de Ingresos',
      'dept.health': 'Departamento de Salud',
      'dept.transport': 'Departamento de Transporte',

      // Account
      'account.dashboard': 'Panel',
      'account.security': 'Seguridad',
      'account.profile': 'Perfil',
      'account.settings': 'Configuración',

      // Alerts
      'alert.emergency': 'Emergencia',
      'alert.warning': 'Advertencia',
      'alert.info': 'Información',
      'alert.success': 'Éxito'
    }
  },
  zh: {
    translation: {
      // Common
      'common.loading': '加载中...',
      'common.error': '错误',
      'common.success': '成功',
      'common.cancel': '取消',
      'common.confirm': '确认',
      'common.save': '保存',
      'common.delete': '删除',
      'common.edit': '编辑',
      'common.search': '搜索',
      'common.filter': '筛选',
      'common.clear': '清除',
      'common.back': '返回',
      'common.next': '下一步',
      'common.previous': '上一步',
      'common.submit': '提交',

      // Navigation
      'nav.home': '首页',
      'nav.services': '服务',
      'nav.account': '我的账户',
      'nav.login': '登录',
      'nav.logout': '登出',
      'nav.register': '注册',

      // Portal
      'portal.title': 'GOV.PRAYA',
      'portal.subtitle': 'Praya共和国政府门户',
      'portal.search.placeholder': '搜索政府服务...',
      'portal.popular.services': '热门服务',
      'portal.all.departments': '所有部门',

      // Departments
      'dept.npa': '国家警察局',
      'dept.bop': 'Praya银行',
      'dept.revenue': '税务部门',
      'dept.health': '卫生部门',
      'dept.transport': '交通部门',

      // Account
      'account.dashboard': '仪表板',
      'account.security': '安全',
      'account.profile': '个人资料',
      'account.settings': '设置',

      // Alerts
      'alert.emergency': '紧急',
      'alert.warning': '警告',
      'alert.info': '信息',
      'alert.success': '成功'
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n
