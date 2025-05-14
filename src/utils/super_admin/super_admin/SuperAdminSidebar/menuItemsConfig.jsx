// Configuration for sidebar menu items with titles, paths, icons, and allowed roles
import {
  HomeOutlined as HomeOutlinedIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import {
  GiLockedChest, GiResize,
} from 'react-icons/gi';
import { RiReservedLine } from 'react-icons/ri';
import { TbReport } from 'react-icons/tb';
import { FaFileContract, FaUsers, FaMapSigns } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi';
import { LuSquareParking } from 'react-icons/lu';
import { GoFileSymlinkFile } from 'react-icons/go';
import { GrMoney, GrWorkshop } from 'react-icons/gr';

export const menuItemsConfig = [
  { title: 'الحساب الشخصي', to: '/super_admin', icon: <HomeOutlinedIcon style={{ color: '#00796B' }} />, roles: ['super', 'admin'] },
  { title: 'الموظفين', to: '/super_admin/admins', icon: <FaUsers color="#47B04C" />, roles: ['super'] },
  { title: 'نشاطات الموظفين', to: '/super_admin/employees_activities', icon: <GrWorkshop color="#FF9900" />, roles: ['super'] },
  { title: 'الزبائن', to: '/super_admin/users', icon: <HiOutlineUsers color="#007BFF" />, roles: ['super', 'admin'] },
  { title: 'النموذج', to: '/super_admin/coding', icon: <GiResize color="#FCC300" />, roles: ['super', 'admin'] },
  { title: 'اللوحات الطرقية', to: '/super_admin/road_signs', icon: <FaMapSigns color="#F99A14" />, roles: ['super', 'admin'] },
  { title: 'إضافة حجز', to: '/super_admin/add_reservation', icon: <RiReservedLine color="#556DFB" />, roles: ['super', 'admin'] },
  { title: 'الحجوزات', to: '/super_admin/reservations', icon: <LuSquareParking color="#2A9080" />, roles: ['super', 'admin'] },
  { title: 'الطلبات', to: '/super_admin/orders', icon: <GoFileSymlinkFile color="#FF5516" />, roles: ['super', 'admin'] },
  { title: 'الدفعات', to: '/super_admin/payments', icon: <GrMoney color="#30FDFE" />, roles: ['super', 'admin'] },
  { title: 'العقود', to: '/super_admin/contracts', icon: <FaFileContract color="#9939B2" />, roles: ['super', 'admin'] },
  { title: 'تقرير أسبوعي', to: '/super_admin/report', icon: <TbReport color="#5E34B1" />, roles: ['super', 'admin'] },
  { title: 'الصندوق', to: '/super_admin/box', icon: <GiLockedChest color="#6A0572" />, roles: ['super'] },
  { title: 'تسجيل الخروج', to: '/super_admin/login', icon: <LogoutIcon style={{ color: '#DC3545' }} />, roles: ['super', 'admin'], logout: true },
];
