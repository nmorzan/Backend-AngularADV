const getMenuFrontEnd = (role = "USER_ROLE")=>{
  const menu =[
    {
      titulo: "Menu",
      icono: "mdi mdi-gauge",
      submenu:[
        {titulo: "Principal", url: "/"},
        {titulo: "ProgressBar", url: "progress"},
        {titulo: "Graficas", url: "grafica1"},
        {titulo: "Promesas", url: "promesas"},
        {titulo: "Rxjs", url:"rxjs"}
      ]
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu:[
        //{titulo: "Usuarios", url: "usuarios"},
        {titulo: "Medicos", url: "medicos"},
        {titulo: "Hospitales", url: "hospitales"},
      ]
    }
  ];

  if(role === 'ADMIN_ROLE'){
    menu[1].submenu.unshift({titulo: "Usuarios", url: "usuarios"}) // añado a la primer posicion del arreglo
  }

  return menu;
}

module.exports = getMenuFrontEnd;