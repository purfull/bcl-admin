

// let menu = []

// fetch('http://localhost:5173/login',{method: 'POST'})
// .then(res => res.json)
// .then(data => menu.push(data))
// .catch(err => console.log(err))

// console.log(menu);



// menu start frome here


// let data
// try {
//   const response = await fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//   });
//   data = await response.json();

  
// } catch (error) {
//   console.error('Error:', error);
// }

// console.log(data.submenu); 
// const menu = data.menu
// const subMenu = data.submenu

// const combinedMenu = menu.map(menuItem => {
//   const subMenuItems = subMenu
//     .filter(subMenu => subMenu.MenuId === menuItem.MenuId)
//     .map(subMenu => subMenu.SubMenuName);
  
//   return {
//     ...menuItem,
//     subMenu: subMenuItems
//   };
// });

const combinedMenu = [
  {
    MenuId: 1,
    MenuName: 'Masters',
    subMenu: [
      'Organisation',
      'Tax',
      'Bank',
      'Paymode',
      'Country'
    ]
  }
];

console.log(combinedMenu);



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
    // badgetxt: '12',
    // path: `${import.meta.env.BASE_URL}dashboards/ecommerce`,
    class: 'badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2',
    children: [
      { path: `${import.meta.env.BASE_URL}dashboards/ecommerce`, type: 'link', active: false, selected: false, dirchange: false, title: 'Main' },
      
    ]
  },
  
  {
    menutitle: 'MENU',
  },
  ...combinedMenu.map(menu => ({
    icon: (<i className="side-menu__icon bx bx-home"></i>),
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
      path: `${import.meta.env.BASE_URL}dashboards/${subMenuName.toLowerCase().replace(/ /g, '-')}`,
      type: 'link',
      active: false,
      selected: false,
      dirchange: false,
      title: subMenuName.charAt(0) + subMenuName.slice(1).toLowerCase()
    }))
  }))
];
