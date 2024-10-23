const combinedMenu = [
  {
    MenuId: 2,
    MenuName: 'MarketPlace',
    subMenu: ['Products']
  },
  { 
    MenuId: 3,
    MenuName: 'Customers'
  },
  {
    MenuId: 4,
    MenuName: 'Orders',
  },
  {
    MenuId: 5,
    MenuName: 'Reports'
  },
  {
    MenuId: 6,
    MenuName: 'Contact Query'
  },
  {
    MenuId: 7,
    MenuName: 'Featured Products'
  },
  {
    MenuId: 8,
    MenuName: 'Testimonials'
  },
  {
    MenuId: 9,
    MenuName: 'Blogs'
  },
  {
    MenuId: 10,
    MenuName: 'Admin User'
  },
  {
    MenuId: 11,
    MenuName: 'Permission'
  }
];

// Icon mapping for different menus
const menuIcons = {
  'Home': 'bx bx-home',
  'MarketPlace': 'bx bx-store',
  'Customers': 'bx bx-user',
  'Orders': 'bx bx-cart',
  'Reports': 'bx bx-line-chart',
  'Contact Query': 'bx bx-phone',
  'Dashboard': 'bx bx-dashboard',
  'Featured Products': 'bx bx-star',
  'Testimonials': 'bx bx-comment',
  'Blogs': 'bx bx-book',
  'Admin User': 'bx bx-user-circle',  // Icon for Admin User
  'Permission': 'bx bx-shield'        // Icon for Permission
};

const directMenuItems = ['Dashboards', 'Customers', 'Orders', 'Reports', 'Contact Query', 'Featured Products', 'Testimonials', 'Blogs', 'Admin User', 'Permission'];

export const MENUITEMS = [
  {
    icon: (<i className="side-menu__icon bx bx-home"></i>),
    type: 'link',  // Direct navigation for Dashboard
    Name: '',
    active: false,
    selected: false,
    dirchange: false,
    title: 'Dashboards',
    badge: '',
    class: 'badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2',
    path: `${import.meta.env.BASE_URL}dashboard`, 
  },

  {
    menutitle: 'MENU',
  },

  ...combinedMenu?.length && combinedMenu.map(menu => {
    const isDirectMenu = directMenuItems.includes(menu.MenuName);
    
    return {
      icon: (<i className={`side-menu__icon ${menuIcons[menu.MenuName] || 'bx bx-folder'}`}></i>),  // Default icon if not found
      type: isDirectMenu ? 'link' : 'sub',  // Direct navigation for certain menu items
      Name: '',
      active: false,
      selected: false,
      dirchange: false,
      title: menu.MenuName.charAt(0) + menu.MenuName.slice(1).toLowerCase(),
      badge: '',
      badgetxt: menu.subMenu?.length || 0,  // Handle undefined subMenu
      class: 'badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2',
      path: isDirectMenu ? `${import.meta.env.BASE_URL}${menu.MenuName.toLowerCase().replace(/ /g, '-')}` : undefined,  // Set path for direct links
      children: !isDirectMenu && menu.subMenu ? menu.subMenu.map(subMenuName => ({
        path: `${import.meta.env.BASE_URL}${menu.MenuName}/${subMenuName.toLowerCase().replace(/ /g, '-')}`, // Construct path dynamically
        type: 'link',
        active: false,
        selected: false,
        dirchange: false,
        title: subMenuName.charAt(0) + subMenuName.slice(1).toLowerCase()
      })) : [],  // No children for direct menus
    };
  })
];
