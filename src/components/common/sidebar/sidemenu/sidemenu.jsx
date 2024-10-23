const combinedMenu = [
  {
    MenuId: 1,
    MenuName: 'Home',
    subMenu: [
      'Featured Products',
      'Testimonials',
      'Blogs',
    ]
  },
  {
    MenuId: 2,
    MenuName: 'MarketPlace',
    subMenu: [
      'Products',
    ]
  },
  {
    MenuId: 3,
    MenuName: 'Customers',
    subMenu: [
      'Customers',
    ]
  },
  {
    MenuId: 4,
    MenuName: 'Orders',
    subMenu: [
      'Customers',
    ]
  },
  {
    MenuId: 5,
    MenuName: 'Reports',
    subMenu: [
      'Customers',
    ]
  },
  {
    MenuId: 6,
    MenuName: 'Contact Query',
    subMenu: [
      'Customers',
    ]
  },
  // {
  //   MenuId: 4,
  //   MenuName: 'Individuals',
  //   subMenu: [
  //     'Individuals',
  //   ]
  // },
  // {
  //   MenuId: 4,
  //   MenuName: 'Security',
  //   subMenu: [
  //     'User Role',
  //     'User Master',
  //     'User Permission',
  //   ]
  // }
];

// Icon mapping for different menus
const menuIcons = {
  'Masters': 'bx bx-planet',
  'Business': 'bx bx-briefcase',
  'Specialist': 'bx bx-user',
  'Individuals': 'bx bx-group',
  'Security': 'bx bx-lock'
};

export const MENUITEMS = [
  {
    icon: (<i className="side-menu__icon bx bx-home"></i>),
    type: 'sub',
    Name: '',
    active: false,
    selected: false,
    dirchange: false,
    title: 'Dashboards',
    badge: '',
    class: 'badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2',
    children: [
      { path: `${import.meta.env.BASE_URL}Dashboard`, type: 'link', active: false, selected: false, dirchange: false, title: 'Main' },
    ]
  },

  {
    menutitle: 'MENU',
  },

  ...combinedMenu.map(menu => ({
    icon: (<i className={`side-menu__icon ${menuIcons[menu.MenuName]}`}></i>), // Assign specific icon
    type: 'sub',
    Name: '',
    active: false,
    selected: false,
    dirchange: false,
    title: menu.MenuName.charAt(0) + menu.MenuName.slice(1).toLowerCase(),
    badge: '',
    badgetxt: menu.subMenu.length,
    class: 'badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2',
    children: menu.subMenu.map(subMenuName => ({
      path: `${import.meta.env.BASE_URL}${menu.MenuName}/${subMenuName.toLowerCase().replace(/ /g, '-')}`, // Construct path dynamically
      type: 'link',
      active: false,
      selected: false,
      dirchange: false,
      title: subMenuName.charAt(0) + subMenuName.slice(1).toLowerCase()
    }))
  }))
];
