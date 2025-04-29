export const combinedMenu = [
  {
    MenuId: 2,
    MenuName: 'Products'
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
    MenuName: 'Delivery'
  },
  {
    MenuId: 7,
    MenuName: 'Cargo'
  },
];

// Icon mapping for different menus
const menuIcons = {
  'Home': 'bx bx-home',
  'Products': 'bx bx-store',
  'Customers': 'bx bx-user',
  'Orders': 'bx bx-cart',
  'Delivery': 'bx bx-line-chart',
  'Contact Query': 'bx bx-phone',
  'Dashboard': 'bx bx-dashboard',
  'Featured Products': 'bx bx-star',
  'Testimonials': 'bx bx-comment',
  'Cargo': 'bx bx-book',
  'Admin User': 'bx bx-user-circle',  // Icon for Admin User
  'Permission': 'bx bx-shield'        // Icon for Permission
};

const directMenuItems = ['Dashboards', 'Products', 'Customers', 'Orders', 'Delivery', 'Cargo'];

export const MENUITEMS = [
  {
    icon: (<i className="side-menu__icon bx bx-home !text-[#F6FFFA]"></i>),
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
      icon: (<i className={`side-menu__icon ${menuIcons[menu.MenuName] || 'bx bx-folder'} !text-[#F6FFFA]`}></i>),  // Default icon if not found
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
